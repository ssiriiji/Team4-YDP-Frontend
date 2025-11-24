// src/pages/SearchResults.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Lightbulb, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function SearchResults() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    
    const [activeTab, setActiveTab] = useState("search");
    const [filters, setFilters] = useState({
        category: "",
        sort: "",
    });

    // ข้อมูล property แบบ mock
    const [properties, setProperties] = useState([
        {
            id: 1,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 3,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
        {
            id: 2,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 3,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
        {
            id: 3,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 3,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
        {
            id: 4,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 5,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
        {
            id: 5,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 3,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
        {
            id: 6,
            title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
            location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย...",
            bedrooms: 3,
            bathrooms: 5,
            parking: 4,
            area: "402.51 ตร.ว.",
            status: "ซื้อรอง",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            isFavorite: false,
        },
    ]);

    const handleFavoriteToggle = (propertyId) => {
        setProperties(
            properties.map((prop) =>
                prop.id === propertyId
                    ? { ...prop, isFavorite: !prop.isFavorite }
                    : prop
            )
        );
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-16">
                {/* Search Header with Background */}
                <div
                    className="relative bg-cover bg-center py-[5rem]"
                    style={{
                        backgroundImage:
                            "url('https://www.prachachat.net/wp-content/uploads/2024/05/set-728x485.jpg')",
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4">
                        {/* Search Tabs */}
                        <div className="flex justify-center space-x-2 mb-6">
                            <button
                                onClick={() => setActiveTab("search")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${
                                    activeTab === "search"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                }`}
                            >
                                <Search className="w-5 h-5 mr-2" />
                                ค้นหาทรัพย์
                            </button>
                            <button
                                onClick={() => setActiveTab("ai")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${
                                    activeTab === "ai"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                }`}
                            >
                                <Lightbulb className="w-5 h-5 mr-2" />
                                ค้นหาด้วย AI
                            </button>
                            <button
                                onClick={() => setActiveTab("map")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${
                                    activeTab === "map"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                }`}
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                ค้นหาด้วยแผนที่
                            </button>
                        </div>

                        {/* Filter Box */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    ผลการค้นหา – รายการ
                                    {keyword && (
                                        <span className="text-gray-500 font-normal ml-2">
                                            "{keyword}"
                                        </span>
                                    )}
                                </h2>
                                <div className="flex items-center gap-3">
                                    {/* Filter 1 - ราคา */}
                                    <div className="relative">
                                        <select
                                            value={filters.category}
                                            onChange={(e) =>
                                                setFilters({ ...filters, category: e.target.value })
                                            }
                                            className="appearance-none px-5 py-2.5 pr-10 bg-white border-2 border-gray-200 rounded-xl hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 shadow-sm"
                                        >
                                            <option value="">ราคาสูง-ต่ำ</option>
                                            <option value="price-low">ราคาต่ำ-สูง</option>
                                            <option value="price-high">ราคาสูง-ต่ำ</option>
                                            <option value="popular">ยอดนิยม</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Filter 2 - จัดเรียง */}
                                    <div className="relative">
                                        <select
                                            value={filters.sort}
                                            onChange={(e) =>
                                                setFilters({ ...filters, sort: e.target.value })
                                            }
                                            className="appearance-none px-5 py-2.5 pr-10 bg-white border-2 border-gray-200 rounded-xl hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 shadow-sm"
                                        >
                                            <option value="">ยอดนิยม</option>
                                            <option value="newest">ใหม่ล่าสุด</option>
                                            <option value="oldest">เก่าที่สุด</option>
                                            <option value="featured">แนะนำ</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Grid */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchResults;