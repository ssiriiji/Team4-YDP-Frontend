// src/pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Lightbulb, MapPin, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function SearchResults() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const [activeTab, setActiveTab] = useState("search");
    const [searchQuery, setSearchQuery] = useState("");
    const [aiQuery, setAiQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        category: "",
        sort: "",
    });

    // ข้อมูล property
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

    // ฟังก์ชันค้นหาแบบปกติ
    const handleNormalSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError("กรุณากรอกคำค้นหา");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: searchQuery }),
            });

            if (!response.ok) {
                throw new Error("เกิดข้อผิดพลาดในการค้นหา");
            }

            const data = await response.json();
            
            // แปลงข้อมูลจาก API เป็นรูปแบบที่ใช้แสดงผล
            if (data.results && Array.isArray(data.results)) {
                const formattedProperties = data.results.map((item) => ({
                    id: item.id || item.asset_details?.id || Math.random().toString(),
                    title: item.asset_details?.name || item.title || item.name || "ไม่ระบุชื่อ",
                    location: item.asset_details?.location || item.location || item.address || "N/A",
                    bedrooms: item.asset_details?.bedroom || item.bedrooms || 0,
                    bathrooms: item.asset_details?.bathroom || item.bathrooms || 0,
                    parking: item.parking || 0,
                    area: item.area || "ไม่ระบุ",
                    price: item.asset_details?.price || item.price || null,
                    status: item.status || "พร้อมขาย",
                    image: item.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
                    isFavorite: false,
                    score: item.final_score || item.score || 0,
                    summary: item.summary || null,
                    reasons: item.reasons || [],
                }));
                setProperties(formattedProperties);
            }
        } catch (err) {
            setError(err.message);
            console.error("Search error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // ฟังก์ชันค้นหาด้วย AI
    const handleAiSearch = async (e) => {
        e.preventDefault();
        if (!aiQuery.trim()) {
            setError("กรุณากรอกคำอธิบายที่ต้องการค้นหา");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/search/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: aiQuery }),
            });

            if (!response.ok) {
                throw new Error("เกิดข้อผิดพลาดในการค้นหาด้วย AI");
            }

            const data = await response.json();
            console.log("AI Search Response:", data); // For debugging
            
            // แปลงข้อมูลจาก AI API เป็นรูปแบบที่ใช้แสดงผล
            if (data.results && Array.isArray(data.results)) {
                const formattedProperties = data.results.map((item) => ({
                    id: item.id || item.asset_details?.id || Math.random().toString(),
                    title: item.asset_details?.name || item.title || item.name || "ไม่ระบุชื่อ",
                    location: item.asset_details?.location || item.location || item.address || "N/A",
                    bedrooms: item.asset_details?.bedroom || item.bedrooms || 0,
                    bathrooms: item.asset_details?.bathroom || item.bathrooms || 0,
                    parking: item.parking || 0,
                    area: item.area || "ไม่ระบุ",
                    price: item.asset_details?.price || item.price || null,
                    status: item.status || "พร้อมขาย",
                    image: item.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
                    isFavorite: false,
                    aiScore: item.final_score || item.intent_score || item.score || 0,
                    summary: item.summary || null,
                    reasons: item.reasons || [],
                    penalties: item.penalties || [],
                }));
                setProperties(formattedProperties);
            }
        } catch (err) {
            setError(err.message);
            console.error("AI Search error:", err);
        } finally {
            setIsLoading(false);
        }
    };

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
                    className="relative bg-cover bg-center py-20"
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
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${activeTab === "search"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                    }`}
                            >
                                <Search className="w-5 h-5 mr-2" />
                                ค้นหาทรัพย์
                            </button>
                            <button
                                onClick={() => setActiveTab("ai")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${activeTab === "ai"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                    }`}
                            >
                                <Lightbulb className="w-5 h-5 mr-2" />
                                ค้นหาด้วย AI
                            </button>
                            <button
                                onClick={() => setActiveTab("map")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${activeTab === "map"
                                        ? "bg-white text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                    }`}
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                ค้นหาด้วยแผนที่
                            </button>
                        </div>

                        {/* Search Box */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            {activeTab === "search" && (
                                <form onSubmit={handleNormalSearch}>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="ค้นหาทรัพย์สินที่คุณต้องการ..."
                                            className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl transition duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    กำลังค้นหา...
                                                </>
                                            ) : (
                                                <>
                                                    <Search className="w-5 h-5" />
                                                    ค้นหา
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {error && (
                                        <p className="mt-3 text-red-500 text-sm">{error}</p>
                                    )}
                                </form>
                            )}

                            {activeTab === "ai" && (
                                <form onSubmit={handleAiSearch}>
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                                <div className="text-sm text-blue-800">
                                                    <p className="font-semibold mb-1">ค้นหาด้วย AI</p>
                                                    <p className="text-blue-600">
                                                        บอกความต้องการของคุณเป็นภาษาธรรมชาติ เช่น "ต้องการบ้านใกล้โรงเรียน 3 ห้องนอน งบไม่เกิน 5 ล้าน"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <textarea
                                                value={aiQuery}
                                                onChange={(e) => setAiQuery(e.target.value)}
                                                placeholder="อธิบายทรัพย์สินที่คุณต้องการ เช่น บ้านเดี่ยว 3 ห้องนอน ใกล้โรงเรียน มีสวน งบประมาณ 5-10 ล้าน..."
                                                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 min-h-[100px] resize-none"
                                                rows="3"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        AI กำลังค้นหา...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lightbulb className="w-5 h-5" />
                                                        ค้นหาด้วย AI
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {error && (
                                            <p className="text-red-500 text-sm text-center">{error}</p>
                                        )}
                                    </div>
                                </form>
                            )}

                            {activeTab === "map" && (
                                <div className="text-center py-8">
                                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">ฟีเจอร์ค้นหาด้วยแผนที่กำลังพัฒนา</p>
                                </div>
                            )}
                        </div>

                        {/* Filter Box */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    ผลการค้นหา – {properties.length} รายการ
                                    {(searchQuery || aiQuery) && (
                                        <span className="text-gray-500 font-normal ml-2">
                                            "{searchQuery || aiQuery}"
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