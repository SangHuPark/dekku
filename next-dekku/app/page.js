"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeskSetupCard from "./components/deskSetup/DeskSetupCard";
import { useRecentTopDeveloperPosts } from "./components/useRecentTopDeveloperPosts";
import { useRecentProducts } from "./components/useRecentProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./components/threeD/ProductCard";

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [recentTopDeveloperPosts, setRecentTopDeveloperPosts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const images = [
    { src: "/desk1.jpg", title: "3D Desk", link: "/threeD" },
    { src: "/desk2.jpg", title: "Desk Setup", link: "/deskSetup" },
    { src: "/desk3.jpg", title: "Share Your Desk", link: "/deskSetup/create" },
  ];

  useEffect(() => {
    const GetRTDP = async () => {
      const response = await fetch(
        "https://dekku.co.kr/api/deskterior-post/recommend-posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job: "ARCHITECT",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch RTDP");
      }
      const data = await response.json();
      console.log(data);
      setRecentTopDeveloperPosts(data);
    };
    GetRTDP();
  }, []);

  useEffect(() => {
    const GetRecentProducts = async () => {
      const response = await fetch("https://dekku.co.kr/api/products", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Recent Products");
      }
      const data = await response.json();
      console.log(data);
      setRecentProducts(data);
    };
    GetRecentProducts();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <section className="px-4 flex justify-center bg-white">
        <div className="max-w-6xl mx-auto my-20">
          <div className="flex">
            <div className="w-1/3">
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
                  className={`relative flex-grow rounded-2xl overflow-hidden transition-all duration-500 h-[28rem] ${
                    hoveredIndex === index ? "w-2/3 z-10" : "w-1/6 z-0"
                  }`}
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
                      hoveredIndex === index
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
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

      {/* 개발자 추천 데스크 */}
      <section className="px-4 flex justify-center bg-gray-100">
        <div className="max-w-6xl mx-auto my-20">
          <h2 className="text-[2rem] font-semibold mb-8 text-center">
            개발자 추천 데스크
          </h2>
          <Slider {...sliderSettings}>
            {recentTopDeveloperPosts.map((data) => (
              <div key={data.postId} className="p-2">
                <DeskSetupCard data={data} isNoProfilePost={true} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* 신규 업데이트 상품 */}
      <section className="px-4 flex justify-center bg-gray-200">
        <div className="max-w-6xl mx-auto my-20">
          <h2 className="text-[2rem] font-semibold mb-8">신규 업데이트 상품</h2>
          <Slider {...sliderSettings}>
            {recentProducts.slice(0, 6).map((data) => (
              <div
                key={data.id}
                className="p-2 flex flex-col justify-center items-center text-center border border-gray-200"
              >
                <div className="rounded-xl shadow-xl bg-white p-2">
                  <div className="flex justify-center items-center h-64">
                    {" "}
                    {/* Flex container to center the image */}
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="h-64 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-regular mb-2 text-gray-800">
                    {data.name}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
