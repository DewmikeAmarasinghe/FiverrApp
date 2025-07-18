import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import newRequest from "../utils/newRequest";
import { countries } from "../data";
import Flag from "react-world-flags";

function BecomeSeller() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData || {};
    const [user, setUser] = useState({
        ...userData,
        isSeller: true,
        desc: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!userData || !userData.username) {
            navigate("/login");
        }
    }, [userData, navigate]);

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) setError("");
    };

    const handleCountrySelect = (countryName) => {
        setUser((prev) => ({
            ...prev,
            country: countryName,
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Update user to become a seller
            await newRequest.patch(`/user/${user._id}`, {
                isSeller: true,
                phone: user.phone,
                desc: user.desc
            });
            // Update localStorage
            localStorage.setItem("currentUser", JSON.stringify({ ...user, isSeller: true }));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const selectedCountry = countries.find((c) => c.name === user.country);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl flex flex-col w-full space-y-8 bg-white shadow-xl rounded-lg p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Become a Seller</h2>
                    <p className="text-gray-600">Upgrade your account to start selling services</p>
                </div>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input name="username" type="text" value={user.username || ""} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input name="email" type="email" value={user.email || ""} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <div className="relative">
                            <button type="button" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {selectedCountry && <Flag code={selectedCountry.code} className="w-6 h-4 object-cover rounded" />}
                                    <span className={user.country ? "text-gray-900" : "text-gray-500"}>{user.country || "Select your country"}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input name="phone" type="tel" value={user.phone || ""} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="desc"
                            value={user.desc || ""}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                            placeholder="Tell us about yourself and the services you offer..."
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        {loading ? "Updating..." : "Become a Seller"}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="mt-4 flex justify-center text-gray-500 hover:text-blue-600 underline text-sm"
                >
                    Continue to homepage
                </button>
            </div>
        </div>
    );
}

export default BecomeSeller;