import { useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import Flag from 'react-world-flags';
import upload from '../utils/upload.js';
import newRequest from "../utils/newRequest.js";
import { Link, useNavigate } from 'react-router';
import { countries } from '../data';

function Register() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate(null);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    if (error) setError("");
  };

  const handleCountrySelect = (countryName) => {
    setUser((prev) => ({
      ...prev,
      country: countryName
    }));
    setCountryDropdownOpen(false);
    if (error) setError("");
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked
    }));
  };

  const validateForm = () => {
    if (!user.username.trim()) return "Username is required";
    if (!user.email.trim()) return "Email is required";
    if (!user.password) return "Password is required";
    if (user.password.length < 6) return "Password must be at least 6 characters";
    if (!user.country.trim()) return "Country is required";
    if (user.isSeller && !user.phone.trim()) return "Phone number is required for sellers";
    if (user.isSeller && !user.desc.trim()) return "Description is required for sellers";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // store the image in cloudinary if a file is given
      let imageUrl = "";
      if (file) {
        imageUrl = await upload(file);
      }

      // store rest of the data along with the image url in the database
      await newRequest.post("/auth/register", {
        ...user,
        img: imageUrl,
      });

      setLoading(false);
      setSuccess(true);
      console.log("Registration successful:", { ...user, img: imageUrl });

      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      console.log("Registration error:", err);
    }
  };

  // Get selected country for flag display
  const selectedCountry = countries.find(c => c.name === user.country);

  if (success) {
    return (
      <div className="register c-width bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w- mx-auto w-full bg-white shadow-xl rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">Welcome to our platform! You can now start using your account.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - basic info */}
            <div className="left space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="mt-2 flex items-center space-x-4">
                  {file && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="flex-1 px-4 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 file:mr-3 file:py-2 file:px-3 file:border-0 file:bg-blue-50 file:text-blue-600 file:rounded-md hover:file:bg-blue-100 file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {selectedCountry && (
                        <Flag 
                          code={selectedCountry.code} 
                          className="w-6 h-4 object-cover rounded"
                        />
                      )}
                      <span className={user.country ? "text-gray-900" : "text-gray-500"}>
                        {user.country || "Select your country"}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {countryDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country.name)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <Flag 
                            code={country.code} 
                            className="w-6 h-4 object-cover rounded"
                          />
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* right col - seller info */}
            <div className="right space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Seller Account</h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="toggle flex items-start justify-between mb-6">
                  <div className="flex-1 mr-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Become a seller
                    </label>
                    <p className="text-xs text-gray-600">
                      Start selling your services and earn money on our platform
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.isSeller}
                      onChange={handleSeller}
                      className="sr-only peer"
                    />
                    <div className="slider round w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                  </label>
                </div>

                {user.isSeller && (
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Seller account activated</span>
                    </div>
                    <p className="text-xs text-blue-600">Please complete the required fields below</p>
                  </div>
                )}
              </div>

              <div className={`transition-all duration-300 space-y-6 ${user.isSeller ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number {user.isSeller && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={user.phone}
                    onChange={handleChange}
                    disabled={!user.isSeller}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description {user.isSeller && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    name="desc"
                    placeholder="Tell us about yourself and the services you offer..."
                    value={user.desc}
                    onChange={handleChange}
                    disabled={!user.isSeller}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      Describe your skills and services {user.isSeller && "(required for sellers)"}
                    </p>
                    <span className="text-xs text-gray-400">
                      {user.desc.length}/500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to='/login'
                type="button"
                className="text-blue-600 hover:text-blue-500 font-medium hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-4 text-gray-500 hover:text-blue-600 underline text-sm"
            >
              Continue to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;