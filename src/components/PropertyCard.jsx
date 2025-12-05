// src/components/PropertyCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, Bed, Bath, Maximize } from "lucide-react";

function PropertyCard({ property, onFavoriteToggle }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${property.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // ป้องกันไม่ให้คลิกหัวใจแล้วเปิดหน้า detail
        if (onFavoriteToggle) {
            onFavoriteToggle(property.id);
        }
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-64">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-green-700 text-white text-sm rounded-full">
                        {property.status}
                    </span>
                </div>
                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition z-10"
                >
                    <Heart
                        className={`w-6 h-6 ${
                            property.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {property.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    {property.location}
                </p>

                {/* Property Details */}
                <div className="flex items-center justify-between text-gray-600 text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{property.bathrooms}</span>
                        </div>
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
                    </div>
                    <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        <span>{property.area}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;