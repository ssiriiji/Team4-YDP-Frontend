// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // เพิ่มบรรทัดนี้
import { Search, Lightbulb, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();  // เพิ่มบรรทัดนี้
    const [activeTab, setActiveTab] = useState("search");
    const [searchData, setSearchData] = useState({
        keyword: "",
    });

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search:", searchData);
        // เปลี่ยนหน้าไปที่ผลการค้นหา
        navigate(`/search-results?keyword=${searchData.keyword}`);  // เพิ่มบรรทัดนี้
    };

    return (
        <>
            <Navbar />

            <div
                className="min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://www.prachachat.net/wp-content/uploads/2024/05/set-728x485.jpg')",
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                    {/* Hero Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            แพลตฟอร์มประมูลและจำหน่ายทรัพย์สิน
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90">
                            ค้นหาทรัพย์สินที่ต้องการด้วยเทคโนโลยี AI และระบบค้นหาชั้นสูง
                        </p>
                    </div>

                    {/* Search Tabs */}
                    <div className="w-full max-w-4xl mb-6">
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={() => setActiveTab("search")}
                                className={`flex items-center px-8 py-3 rounded-t-xl transition-all duration-200 ${
                                    activeTab === "search"
                                        ? "bg-white/95 text-gray-800 font-bold shadow-lg"
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
                                        ? "bg-white/95 text-gray-800 font-bold shadow-lg"
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
                                        ? "bg-white/95 text-gray-800 font-bold shadow-lg"
                                        : "bg-white/60 text-gray-500 hover:bg-white/75"
                                }`}
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                ค้นหาด้วยแผนที่
                            </button>
                        </div>
                    </div>

                    {/* Search Box */}
                    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                        <form onSubmit={handleSearch} className="space-y-6">
                            {/* Main Search Input */}
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    name="keyword"
                                    placeholder="ค้นหาทรัพย์"
                                    value={searchData.keyword}
                                    onChange={handleChange}
                                    className="flex-1 px-6 py-4 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition text-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-[#577753] hover:bg-green-800 text-white font-medium rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
                                >
                                    ค้นหา
                                </button>
                            </div>

                            {/* Advanced Search Options */}
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-4">
                                    คำค้นหายอดนิยม
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
                                    >
                                        บ้านเดี่ยว
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
                                    >
                                        คอนโด
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
                                    >
                                        ที่ดิน
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
                                    >
                                        ทาวน์เฮาส์
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
                                    >
                                        อาคารพาณิชย์
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
