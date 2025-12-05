// src/components/PropertyCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, Bed, Bath, Maximize, Sparkles } from "lucide-react";

function PropertyCard({ property, onFavoriteToggle }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Pass property data including AI search state to detail page
        navigate(`/property/${property.id}`, {
            state: {
                property: property,
                fromAiSearch: property.aiScore > 0,
                aiScore: property.aiScore,
                summary: property.summary,
                reasons: property.reasons,
                penalties: property.penalties
            }
        });
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // ป้องกันไม่ให้คลิกหัวใจแล้วเปิดหน้า detail
        if (onFavoriteToggle) {
            onFavoriteToggle(property.id);
        }
    };

    // Format price
    const formatPrice = (price) => {
        if (!price) return null;
        return new Intl.NumberFormat('th-TH').format(price);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
        >
            {/* AI Score Badge */}
            {property.aiScore > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    {Math.round(property.aiScore * 100)}% Match
                </div>
            )}

            {/* Image */}
            <div className="relative h-64">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                {!property.aiScore && (
                    <div className="absolute top-4 left-4">
                        <span className="px-4 py-1 bg-green-700 text-white text-sm rounded-full">
                            {property.status}
                        </span>
                    </div>
                )}
                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition z-10"
                >
                    <Heart
                        className={`w-6 h-6 ${property.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Price */}
                {property.price && (
                    <div className="mb-2">
                        <span className="text-2xl font-bold text-green-700">
                            ฿{formatPrice(property.price)}
                        </span>
                    </div>
                )}

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {property.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                </p>

                {/* AI Summary */}
                {property.summary && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-800 line-clamp-2">
                            {property.summary}
                        </p>
                    </div>
                )}

                {/* AI Reasons */}
                {property.reasons && property.reasons.length > 0 && (
                    <div className="mb-3">
                        {property.reasons.slice(0, 2).map((reason, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs text-green-700 mb-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{reason}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Property Details */}
                <div className="flex items-center justify-between text-gray-600 text-sm pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{property.bathrooms}</span>
                        </div>
                        {property.parking > 0 && (
                            <div className="flex items-center">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{property.parking}</span>
                            </div>
                        )}
                    </div>
                    {property.area !== "ไม่ระบุ" && (
                        <div className="flex items-center">
                            <Maximize className="w-4 h-4 mr-1" />
                            <span className="text-xs">{property.area}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;