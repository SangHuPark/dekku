"use client";

import Link from "next/link";
import React, { useState } from "react";

const images = [
  { src: "/event1.png", alt: "Event" },
  { src: "/notice1.jpg", alt: "Notice" },
];

export default function MainContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex h-96 justify-between mb-8">
          <Link
            href={"/threeD"}
            className="flex-1 relative p-4 rounded-xl shadow-md text-lg font-bold mr-4 overflow-hidden flex items-start justify-center"
            style={{
              background: "linear-gradient(to bottom, #D9D9D9, #737373)",
            }}
          >
            <h1 className="absolute top-0 left-0 p-4 font-bold w-full">
              나만의 3D 데스크를 디자인하세요
            </h1>
            <img
              src="/mainImg1.png"
              className="h-60 w-auto mt-16"
              alt="3D Desk"
            />
          </Link>
          <div className="w-1/2 flex flex-col">
            <Link
              href={"/deskSetup"}
              className="flex-grow relative p-4 rounded-xl shadow-md text-lg font-bold mb-4 flex items-center justify-center"
              style={{
                background: "linear-gradient(to bottom, #D9D9D9, #737373)",
              }}
            >
              <h1 className="absolute top-0 left-0 p-4 font-bold">
                데스크 셋업
              </h1>
              <img
                src="/mainImg2.png"
                className="h-40 w-auto object-cover rounded-xl mt-6"
                alt="Desk Setup"
              />
            </Link>
            <Link
              href={"/deskSetup/create"}
              className="flex-grow-0 relative p-4 rounded-xl shadow-md text-lg font-bold h-1/4 flex items-center justify-center"
              style={{
                background: "linear-gradient(to bottom, #D9D9D9, #737373)",
              }}
            >
              <h1 className="absolute top-0 left-0 p-4 font-bold">
                글쓰기
              </h1>
              <img
                src="/mainImg3.png"
                className="h-24 w-auto object-cover rounded-xl mt-2"
                alt="Writing"
              />
            </Link>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4">Notice & Event</h1>
        <div className="relative bg-gray-100 p-4 rounded-xl h-60 overflow-hidden">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500"
          />
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full focus:outline-none"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
