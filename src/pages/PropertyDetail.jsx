// src/pages/PropertyDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail, Sparkles, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Get AI search state from navigation
    const aiSearchState = location.state || {};
    const fromAiSearch = aiSearchState.fromAiSearch || false;
    const aiScore = aiSearchState.aiScore || 0;
    const aiSummary = aiSearchState.summary || null;
    const aiReasons = aiSearchState.reasons || [];
    const aiPenalties = aiSearchState.penalties || [];

    useEffect(() => {
        // Check if property data was passed from search results
        if (aiSearchState.property) {
            // Use the property data from navigation state
            const passedProperty = aiSearchState.property;
            const formattedProperty = {
                id: passedProperty.id,
                title: passedProperty.title || `ทรัพย์สิน #${id}`,
                price: passedProperty.price ? passedProperty.price.toLocaleString('th-TH') : "N/A",
                location: passedProperty.location || "N/A",
                bedrooms: passedProperty.bedrooms || 0,
                bathrooms: passedProperty.bathrooms || 0,
                parking: passedProperty.parking || 0,
                area: passedProperty.area || "N/A",
                usableArea: passedProperty.usableArea || "N/A",
                status: passedProperty.status || "พร้อมขาย",
                type: passedProperty.type || "คอนโด",
                description: "คอนโดมิเนียมสุดหรู ทำเลดี ใกล้ศูนย์การค้า โรงเรียน โรงพยาบาล สภาพบ้านพร้อมอยู่ ตกแต่งครบพร้อมเฟอร์นิเจอร์ครบชุด",
                features: [
                    "ห้องนอนมาสเตอร์พร้อมห้องน้ำในตัว",
                    "ห้องครัวทันสมัยพร้อมเครื่องใช้ไฟฟ้า",
                    "สระว่ายน้ำส่วนกลาง",
                    "ฟิตเนส",
                    "ระบบรักษาความปลอดภัย 24 ชม.",
                    "ที่จอดรถ",
                ],
                images: [
                    passedProperty.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
                ],
                seller: {
                    name: "บริษัท อสังหาริมทรัพย์ จำกัด",
                    phone: "02-123-4567",
                    email: "contact@property.com",
                },
                postedDate: "2024-11-15",
            };
            
            setProperty(formattedProperty);
            setLoading(false);
        } else {
            // Fallback: Fetch from API or use mock data
            // const fetchProperty = async () => {
            //     const response = await fetch(`http://localhost:3000/api/properties/${id}`);
            //     const data = await response.json();
            //     setProperty(data);
            //     setLoading(false);
            // };
            // fetchProperty();

            // Mock data สำหรับตอนนี้
            const mockProperty = {
                id: id,
                title: `ทรัพย์สิน #${id}`,
                price: "5,211,000",
                location: "N/A",
                bedrooms: 2,
                bathrooms: 1,
                parking: 2,
                area: "N/A",
                usableArea: "N/A",
                status: "พร้อมขาย",
                type: "คอนโด",
                description: "คอนโดมิเนียมสุดหรู ทำเลดี ใกล้ศูนย์การค้า โรงเรียน โรงพยาบาล สภาพบ้านพร้อมอยู่ ตกแต่งครบพร้อมเฟอร์นิเจอร์ครบชุด",
                features: [
                    "ห้องนอนมาสเตอร์พร้อมห้องน้ำในตัว",
                    "ห้องครัวทันสมัยพร้อมเครื่องใช้ไฟฟ้า",
                    "สระว่ายน้ำส่วนกลาง",
                    "ฟิตเนส",
                    "ระบบรักษาความปลอดภัย 24 ชม.",
                    "ที่จอดรถ",
                ],
                images: [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
                ],
                seller: {
                    name: "บริษัท อสังหาริมทรัพย์ จำกัด",
                    phone: "02-123-4567",
                    email: "contact@property.com",
                },
                postedDate: "2024-11-15",
            };
            
            setProperty(mockProperty);
            setLoading(false);
        }
    }, [id, aiSearchState]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
                        <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!property) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-xl text-gray-600">ไม่พบข้อมูลทรัพย์สิน</p>
                        <button
                            onClick={() => navigate("/search-results")}
                            className="mt-4 px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800"
                        >
                            กลับไปหน้าค้นหา
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* AI Search Info Banner */}
                    {fromAiSearch && aiScore > 0 && (
                        <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">AI Match Score</h3>
                                        <span className="px-4 py-1 bg-purple-600 text-white text-lg font-bold rounded-full">
                                            {Math.round(aiScore * 100)}%
                                        </span>
                                    </div>
                                    
                                    {aiSummary && (
                                        <p className="text-gray-700 mb-4 leading-relaxed">{aiSummary}</p>
                                    )}
                                    
                                    {aiReasons && aiReasons.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-gray-700">ทำไมเราแนะนำทรัพย์สินนี้:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {aiReasons.map((reason, index) => (
                                                    <div key={index} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">{reason}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {aiPenalties && aiPenalties.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-purple-200">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">หมายเหตุ:</p>
                                            <div className="space-y-1">
                                                {aiPenalties.map((penalty, index) => (
                                                    <div key={index} className="flex items-start gap-2 text-sm">
                                                        <span className="text-orange-600">⚠️</span>
                                                        <span className="text-gray-600">{penalty}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-gray-600">
                        <button onClick={() => navigate("/")} className="hover:text-green-600">
                            หน้าแรก
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => navigate(-1)} className="hover:text-green-600">
                            ผลการค้นหา
                        </button>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800">{property.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Images & Details */}
                        <div className="lg:col-span-2">
                            {/* Main Image Gallery */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                                {/* Main Image */}
                                <div className="relative h-[500px]">
                                    <img
                                        src={property.images[selectedImage]}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-full">
                                            {property.status}
                                        </span>
                                    </div>
                                    {/* Action Buttons */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            className="p-3 bg-white rounded-full hover:bg-gray-100 transition shadow-lg"
                                        >
                                            <Heart
                                                className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                                                    }`}
                                            />
                                        </button>
                                        <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition shadow-lg">
                                            <Share2 className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Thumbnail Images */}
                                <div className="grid grid-cols-4 gap-2 p-4">
                                    {property.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative h-24 rounded-lg overflow-hidden ${selectedImage === index
                                                    ? "ring-4 ring-green-600"
                                                    : "ring-2 ring-gray-200"
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${property.title} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    {property.title}
                                </h1>

                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span>{property.location}</span>
                                </div>

                                {/* แก้ไขส่วนนี้ - ให้อยู่ตรงกลาง */}
                                <div className="flex items-center justify-center gap-8 py-4 border-t border-b border-gray-200 mb-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Bed className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-600">ห้องนอน</p>
                                        <p className="text-lg font-bold text-gray-800">{property.bedrooms}</p>
                                    </div>

                                    <div className="w-px h-12 bg-gray-200"></div>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Bath className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-600">ห้องน้ำ</p>
                                        <p className="text-lg font-bold text-gray-800">{property.bathrooms}</p>
                                    </div>

                                    <div className="w-px h-12 bg-gray-200"></div>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600">ที่จอดรถ</p>
                                        <p className="text-lg font-bold text-gray-800">{property.parking}</p>
                                    </div>

                                    <div className="w-px h-12 bg-gray-200"></div>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-1">
                                            <Maximize className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-600">พื้นที่ใช้สอย</p>
                                        <p className="text-lg font-bold text-gray-800">{property.usableArea}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">รายละเอียด</h2>
                                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">สิ่งอำนวยความสะดวก</h2>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {property.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0"
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
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact & Info */}
                        <div className="lg:col-span-1">
                            {/* Price Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-24">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-1">ราคา</p>
                                    <p className="text-4xl font-bold text-green-700">
                                        ฿{property.price}
                                    </p>
                                </div>

                                {/* Contact Seller */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">ติดต่อผู้ขาย</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">โทรศัพท์</p>
                                                <p className="font-medium">{property.seller.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">อีเมล</p>
                                                <p className="font-medium">{property.seller.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-xl transition duration-200 shadow-lg hover:shadow-xl mb-3">
                                    ติดต่อสอบถาม
                                </button>
                                <button className="w-full bg-white hover:bg-gray-50 text-green-700 font-medium py-3 rounded-xl border-2 border-green-700 transition duration-200">
                                    นัดชมทรัพย์
                                </button>

                                {/* Property Info */}
                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ประเภท</span>
                                        <span className="font-medium text-gray-800">{property.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">เนื้อที่</span>
                                        <span className="font-medium text-gray-800">{property.area}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">วันที่ประกาศ</span>
                                        <span className="font-medium text-gray-800">{property.postedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">รหัสทรัพย์</span>
                                        <span className="font-medium text-gray-800">#{property.id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PropertyDetail;
