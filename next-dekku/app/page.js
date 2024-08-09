'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const images = [
    { src: '/desk1.jpg', title: '3D Desk', topics: '', link: '/threeD' },
    { src: '/desk2.jpg', title: 'Desk Setup', topics: '', link: '/deskSetup' },
    { src: '/desk3.jpg', title: 'Share Your Desk', topics: '', link: '/deskSetup/create' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-scroll snap-y snap-mandatory">
      <section className="h-[calc(100vh-20rem)] snap-start flex justify-center bg-white">
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="flex">
            <div className="w-1/3 py-12">
              <div className="text-6xl font-bold tracking-wider leading-tight pt-12 pb-36 pr-12">
                나만의.
                <br />
                데스크를.
                <br />
                꾸미다.
              </div>
            </div>
            <div className="w-2/3 flex gap-4">
              {images.map((image, index) => (
                <Link
                  key={index}
                  href={image.link}
                  className={`relative flex-grow rounded-2xl overflow-hidden transition-all duration-500 h-[32rem] ${hoveredIndex === index ? 'w-2/3 z-10' : 'w-1/6 z-0'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(index)}
                >
                  <img
                    src={image.src}
                    className="w-full h-full object-cover rounded-2xl"
                    alt={image.title}
                  />
                  <div
                    className={`absolute bottom-16 left-8 text-white transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  >
                    <h3 className="text-3xl">{image.title}</h3>
                    {image.topics && <p>{image.topics}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="h-[calc(100vh-20rem)] snap-start flex justify-center items-center bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <h2 className="text-3xl font-bold">이번주의 데스크</h2>
          {/* 여기에 컨텐츠 추가 */}
        </div>
      </section>
      <section className="h-[calc(100vh-20rem)] snap-start flex justify-center items-center bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <h2 className="text-3xl font-bold">추가 섹션</h2>
          {/* 여기에 컨텐츠 추가 */}
        </div>
      </section>
    </div>
  );
}
