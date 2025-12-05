// src/pages/PropertyDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail } from "lucide-react";
import Navbar from "../components/Navbar";

function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock data
    const property = {
        id: id,
        title: "หมู่บ้านอมิเทียฟรีด้า เกียนกะล่อ 28",
        price: "12,500,000",
        location: "ตำบลเทพารักษ์ เกียนกะล่อ ขางคุนโยง เชียงราย 57000",
        bedrooms: 3,
        bathrooms: 5,
        parking: 4,
        area: "402.51 ตร.ว.",
        usableArea: "350 ตร.ม.",
        status: "ซื้อรอง",
        type: "บ้านเดี่ยว",
        description: "บ้านเดี่ยวหรู 2 ชั้น ในหมู่บ้านจัดสรร ทำเลดี ใกล้ศูนย์การค้า โรงเรียน โรงพยาบาล สภาพบ้านพร้อมอยู่ ตกแต่งครบพร้อมเฟอร์นิเจอร์ครบชุด มีสระว่ายน้ำส่วนตัว สวนหน้าบ้านสวยงาม ที่จอดรถกว้างขวาง",
        features: [
            "ห้องนอนมาสเตอร์พร้อมห้องน้ำในตัว",
            "ห้องครัวทันสมัยพร้อมเครื่องใช้ไฟฟ้า",
            "สระว่ายน้ำส่วนตัว",
            "สวนหน้าบ้าน",
            "ระบบรักษาความปลอดภัย 24 ชม.",
            "ฟิตเนส คลับเฮาส์",
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

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-gray-600">
                        <button onClick={() => navigate("/")} className="hover:text-green-600">
                            หน้าแรก
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => navigate("/search-results")} className="hover:text-green-600">
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
                                                className={`w-6 h-6 ${
                                                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
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
                                            className={`relative h-24 rounded-lg overflow-hidden ${
                                                selectedImage === index
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
                                                    className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
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
