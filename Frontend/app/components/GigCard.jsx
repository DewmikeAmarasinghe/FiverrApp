import { Heart, Eye, Star } from 'lucide-react';
import Flag from 'react-world-flags';
import { Link } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { getCountryCode } from '../data';

const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            newRequest.get(`/users/${item.userId}`).then((res) => {
                return res.data;
            }),
    });

    // star rating
    const starRating = !isNaN(item.totalStars / item.starNumber) 
        ? Math.round(item.totalStars / item.starNumber) 
        : 0;

    // Get country code for flag
    const countryCode = data?.country? getCountryCode(data.country) : null;

    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="w-full max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                    <img
                        src={item.cover}
                        alt={item.desc}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            type="button"
                            className="rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white"
                            title="Quick look"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className="rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
                            title="Add to favorites"
                        >
                            <Heart className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* User Info */}
                    <div className="mb-4 flex items-center gap-3">
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.cover}
                                    alt="User"
                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">Unknown User</h3>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < starRating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-gray-200 text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-1 text-sm text-gray-500">
                                            {starRating}.0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* User Avatar */}
                                <div className="relative">
                                    <img
                                        src={data.img}
                                        alt={data.username}
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                                    />
                                    {/* Country Flag Badge */}
                                    {countryCode && (
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center border border-gray-200 overflow-hidden">
                                            <Flag 
                                                code={countryCode} 
                                                className="h-4 w-4 object-cover rounded-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-gray-900">{data.username}</h3>
                                        {/* Country name display */}
                                        {data.country && (
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                {data.country}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < starRating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-gray-200 text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-1 text-sm text-gray-500">
                                            {starRating}.0
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Service Description */}
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {item.desc}
                    </p>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Starting at
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                                ${item.price}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Contact Now
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;