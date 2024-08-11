'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import ThreeJSRenderer from "../../components/threeD/ThreeJSRenderer"; // ThreeJSRenderer 임포트

export default function Details({ params }) {
  const postId = parseInt(params.id, 10); // 문자열을 정수로 변환
  const [data, setData] = useState(null);
  const [jsonUrl, setJsonUrl] = useState(null);
  const [showThreeJSRenderer, setShowThreeJSRenderer] = useState(false);

  useEffect(() => {
    // 게시글 상세 정보와 JSON URL을 가져오는 API 호출
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/deskterior-post/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const postData = await response.json();
        setData(postData);

        // JSON URL이 있는 경우 설정
        if (postData.jsonUrl) {
          setJsonUrl(postData.jsonUrl);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleLoadModelClick = () => {
    if (jsonUrl) {
      setShowThreeJSRenderer(true);
    } else {
      console.error("No JSON URL found for this post.");
    }
  };

  if (!data) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  // 이전과 다음 게시물의 ID를 계산합니다.
  const prevPostId = postId > 1 ? postId - 1 : null;
  const nextPostId = postId < data.length ? postId + 1 : null;

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <h3 className="text-gray-500 mb-4">
          {new Date(data.createdAt).toLocaleDateString()}
        </h3>

        <div className="flex justify-center mb-6">
          <img
            src={data.imgSrc}
            alt={data.title}
            className="w-1/2 h-auto rounded-md object-cover"
          />
        </div>

        <div className="text-lg mb-10 text-center">{data.content}</div>

        <h2 className="text-xl font-bold mb-4">제품 내용</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
            빈 박스
          </div>
          <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
            빈 박스
          </div>
          <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
            빈 박스
          </div>
          <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
            빈 박스
          </div>
        </div>

        <div className="flex justify-end mb-6 text-gray-600 space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/view_icon.png" alt="views" className="w-5 h-5" />
            <span>{data.views}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/like_icon.png" alt="likes" className="w-5 h-5" />
            <span>{data.likes}</span>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex ">
            <img
              src={data.profileImg}
              alt={data.username}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <div className="font-semibold text-lg">{data.username}</div>
              <div className="text-gray-500">{data.introduce}</div>
            </div>
          </div>
          <div className="ml-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Follow
            </button>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-4" />

        <div className="mb-4">댓글 : {data.comments}개</div>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          댓글이 들어갈 공간
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        {/* 불러오기 버튼 */}
        {jsonUrl && (
          <div className="mb-6 text-center">
            <button
              onClick={handleLoadModelClick}
              className="bg-green-500 text-white px-6 py-2 rounded-md"
            >
              불러오기
            </button>
          </div>
        )}

        {showThreeJSRenderer && (
          <ThreeJSRenderer
            selectedProducts={[]} 
            setSelectedProducts={() => {}} 
            onComplete={() => {}} 
            jsonUrl={jsonUrl}
          />
        )}

        <h2 className="text-xl font-bold mb-4">다른 게시물</h2>
        <div className="flex space-x-4">
          {prevPostId && (
            <div className="w-1/2">
              <a href={`/deskSetup/${prevPostId}`}>
                <img
                  src={datas.find((item) => item.id === prevPostId)?.imgSrc}
                  alt="Previous post"
                  className="w-full h-auto rounded-md"
                />
                <p className="text-center mt-2 font-bold text-gray-600">이전 게시물</p>
              </a>
            </div>
          )}
          {nextPostId && (
            <div className="w-1/2">
              <a href={`/deskSetup/${nextPostId}`}>
                <img
                  src={datas.find((item) => item.id === nextPostId)?.imgSrc}
                  alt="Next post"
                  className="w-full h-auto rounded-md"
                />
                <p className="text-center mt-2 font-bold text-gray-600">다음 게시물</p>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
