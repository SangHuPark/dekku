"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/HomeContent.css";

const images = [
  { src: "/notice1.jpg", alt: "Notice" },
  { src: "/event1.png", alt: "Event" },
];

export default function MainContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inProp, setInProp] = useState(true);

  const handleNext = () => {
    setInProp(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setInProp(true);
    }, 500);
  };

  const handlePrev = () => {
    setInProp(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setInProp(true);
    }, 500);
  };

  const handleDotClick = (index) => {
    setInProp(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setInProp(true);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-4 h-auto justify-between mb-8">
          <Link href="/" className="flex-grow bg-[#EFEAEA] rounded-xl p-6 text-2xl font-extrabold">
            나만의 3D 데스크를 디자인하세요.
          </Link>
          <div className="flex-grow flex flex-col justify-between space-y-4">
            <Link href="/" className="h-64 flex-grow bg-[#EFEAEA] rounded-xl p-6 text-4xl font-extrabold text-white bg-[url('/home_image_1.png')] bg-cover">
              데스크 셋업
            </Link>
            <Link href="/" className="h-64 flex-grow bg-[#EFEAEA] rounded-xl p-6 text-2xl font-extrabold">
              사람들에게 데스크 셋업을 물어보세요.
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Notice & Event</h1>
        <div className="relative bg-gray-100 h-64 overflow-visible">
          <div className="relative h-full overflow-hidden">
            <TransitionGroup className="relative h-full">
              <CSSTransition
                key={currentIndex}
                timeout={500}
                classNames="slide"
              >
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-full object-cover absolute"
                />
              </CSSTransition>
            </TransitionGroup>
          </div>
          <button
            onClick={handlePrev}
            className="absolute -left-5 top-1/2 z-10 transform -translate-y-1/2 bg-white text-black shadow w-10 h-10 rounded-full focus:outline-none flex items-center justify-center"
          >
            <img src="/chevron-left.png" className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-5 top-1/2 z-10 transform -translate-y-1/2 bg-white text-black shadow w-10 h-10 rounded-full focus:outline-none flex items-center justify-center"
          >
            <img src="/chevron-right.png" className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
