import React, { useState, useEffect } from 'react';
import care1 from '../assets/care.jpg';
import care2 from '../assets/care2.png';
import care3 from '../assets/care3.avif';
import care4 from '../assets/care4.avif';



const BookingComponent = () => {
    const [showCallOptions, setShowCallOptions] = useState(false);
    const [showBookingOptions, setShowBookingOptions] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // const images = [
    //     '../assets/care.jpg',
    //     '../assets/care2.png',
    //     '../assets/care3.avif',
    //     '../assets/care4.avif',
        
    // ];
    const images = [care1, care2, care3, care4];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
            {/* Background Image Slider */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-2000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        style={{ backgroundImage: `url(${image})` }}
                        aria-hidden={index !== currentIndex}
                    ></div>
                ))}
            </div>

            {/* Booking Container */}
            <div className="relative bg-white opacity-90 rounded-xl p-8 w-[90%] max-w-[900px] shadow-2xl z-20 backdrop-blur-lg">
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[#09243c] mb-2">مكالمة دكتور</h2>
                        <p className="text-gray-700 mb-4">المتابعة عبر مكالمة مع دكتور</p>
                        <button
                            onClick={() => { setShowCallOptions(true); setShowBookingOptions(false); }}
                            className="bg-[#09243c] hover:bg-[#065789] text-white py-3 px-8 rounded-xl w-full transition duration-300 transform hover:scale-105">
                            مكالمة دكتور
                        </button>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[#09243c] mb-2">احجز دكتور</h2>
                        <p className="text-gray-700 mb-4">الفحص أو الإجراء</p>
                        <button
                            onClick={() => { setShowBookingOptions(true); setShowCallOptions(false); }}
                            className="bg-[#09243c] hover:bg-[#065789] text-white py-3 px-8 rounded-xl w-full transition duration-300 transform hover:scale-105">
                            احجز دكتور
                        </button>
                    </div>
                </div>

                {/* Call Options */}
                {showCallOptions && (
                    <div className="mt-6">
                        <form className="flex flex-col md:flex-row items-center gap-4">
                            <select className="border p-3 rounded-lg flex-1 w-full focus:outline-none focus:ring-2 focus:ring-[#09243c] focus:border-transparent">
                                <option>اختر التخصص</option>
                            </select>
                            <button type="submit" className="bg-[#eca516] hover:bg-[#ffc107] text-white py-3 px-8 rounded-lg w-full md:w-auto transition duration-300 transform hover:scale-105">
                                ابحث
                            </button>
                        </form>
                    </div>
                )}

                {/* Booking Options */}
                {showBookingOptions && (
                    <div className="mt-6">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="اسم الدكتور أو المستشفى"
                                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09243c] focus:border-transparent"
                            />
                            <select className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09243c] focus:border-transparent">
                                <option>اختر المنطقة</option>
                            </select>
                            <select className="border p-3   rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09243c] focus:border-transparent">
                                <option>اختر المحافظة</option>
                            </select>
                            <select className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09243c] focus:border-transparent">
                                <option>اختر التخصص</option>
                            </select>
                            <button type="submit" className="bg-[#eca516] hover:bg-[#ffc107] text-white py-3 px-8 rounded-lg col-span-1 md:col-span-2 transition duration-300 transform hover:scale-105">
                                ابحث
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingComponent;