import { Check, Clock, RotateCcw, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export default function PricingCard({ gigData, userData }) {
    if (!gigData) {
        return (
            <div className="w-full font-[Nunito] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-38 p-6">
                <div>Loading pricing information...</div>
            </div>
        );
    }

    return (
        <div className="w-full font-[Nunito] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-38">
            {/* Content */}
            <div className="p-6">
                {/* Title and Price */}
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{gigData.shortTitle}</h3>
                    <span className="text-xl font-bold text-gray-900">${gigData.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    {gigData.shortDesc}
                </p>

                {/* Delivery and Revisions */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="font-medium">{gigData.deliveryTime} Days Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <RotateCcw size={16} />
                        <span className="font-medium">{gigData.revisionNumber} Revisions</span>
                    </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                    {gigData.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Check size={16} className="text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <Link to={`/pay/${gigData._id}`}>
                    <button className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4">
                        Continue
                        <ArrowRight size={16} />
                    </button>
                </Link>

                {/* Contact Button */}
                <button className="w-full text-gray-600 py-2 px-4 font-medium hover:text-gray-800 transition-colors flex items-center justify-center gap-1">
                    Contact me
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Bottom Section - Seller Info */}
            {userData && (
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                        <img
                            src={userData.img}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium text-gray-900 mb-1">Need more information?</h4>
                            <button className="text-green-600 font-medium hover:text-green-700 transition-colors underline">
                                Contact {userData.username}
                            </button>
                            <p className="text-sm text-gray-600 mt-2">
                                Get in touch to discuss your specific requirements and get a custom quote.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}