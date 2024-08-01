"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../styles/HomeContent.css';

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
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex h-96 justify-between mb-8">
          <Link
            href={"/threeD"}
            className="flex-1 relative p-4 rounded-xl shadow-md text-lg font-bold mr-4 overflow-hidden flex items-start justify-center"
            style={{
              background: "linear-gradient(to bottom, #D9D9D9, #737373)",
            }}
          >
            <h1 className="absolute top-0 left-0 p-4 font-bold text-xl w-full">
              나만의 3D 데스크를 디자인하세요
            </h1>
            <img
              src="/mainImg1.png"
              className="h-72 w-auto mt-12"
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
              <h1 className="absolute top-0 left-0 p-4 font-bold text-xl ">
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
              <h1 className="absolute top-0 left-0 p-4 font-bold text-xl ">
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
        <h1 className="text-2xl font-bold mb-4">Notice & Event</h1>
        <div className="relative bg-gray-100 h-60 overflow-visible">
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
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white text-black shadow w-10 h-10 rounded-full focus:outline-none flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            <img src="/chevron-left.png" className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white text-black shadow w-10 h-10 rounded-full focus:outline-none flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            <img src="/chevron-right.png" className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
