'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import ThreeJSRenderer from "../../components/threeD/ThreeJSRenderer"; // ThreeJSRenderer 임포트
import DeskSetupCard from "../../components/deskSetup/DeskSetupCard";
import { useRouter } from 'next/navigation';

export default function Details({ params }) {
  const postId = parseInt(params.id, 10); // 문자열을 정수로 변환
  const [data, setData] = useState(null); // 게시글 데이터를 저장할 상태
  const [jsonUrl, setJsonUrl] = useState(null); // 모델 JSON URL 상태
  const [showThreeJSRenderer, setShowThreeJSRenderer] = useState(false); // 3D 렌더러 표시 여부 상태
  const [prevPostData, setPrevPostData] = useState(null); // 이전 게시물 데이터 상태
  const [nextPostData, setNextPostData] = useState(null); // 다음 게시물 데이터 상태
  const [isAuthor, setIsAuthor] = useState(false); // 현재 사용자가 작성자인지 여부
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [editedData, setEditedData] = useState({}); // 수정된 데이터 상태
  const router = useRouter();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://dekku.co.kr/api/deskterior-post/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access': localStorage.getItem('access'), // 로컬스토리지에서 access 토큰 가져오기
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const postData = await response.json();
        setData(postData);
        setEditedData(postData); // 수정 모드가 활성화되었을 때 편집할 수 있도록 초기 데이터 설정

        if (postData.jsonUrl) {
          setJsonUrl(postData.jsonUrl); // jsonUrl 설정
        }

        // 현재 사용자와 게시글 작성자를 비교하여 isAuthor 상태 설정
        const userId = await fetchUserId(); // 사용자의 userId를 가져오는 함수
        if (userId === postData.memberId) {
          setIsAuthor(true); // 사용자가 작성자일 경우 isAuthor를 true로 설정
        }

        // 이전 및 다음 게시물 데이터를 가져오기 위한 추가 요청
        if (postId > 1) {
          const prevResponse = await fetch(`https://dekku.co.kr/api/deskterior-post/${postId - 1}`);
          if (prevResponse.ok) {
            setPrevPostData(await prevResponse.json());
          }
        }

        const nextResponse = await fetch(`https://dekku.co.kr/api/deskterior-post/${postId + 1}`);
        if (nextResponse.ok) {
          setNextPostData(await nextResponse.json());
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const fetchUserId = async () => {
    // access 토큰을 사용하여 서버에서 userId를 가져오는 로직
    const response = await fetch('https://dekku.co.kr/api/user-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access': localStorage.getItem('access'), // 로컬스토리지에서 access 토큰 가져오기
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.userId; // 서버에서 반환된 사용자 ID
    } else {
      throw new Error('Failed to fetch user info');
    }
  };

  const handleLoadModelClick = () => {
    if (jsonUrl) {
      router.push(`/threeD?jsonUrl=${encodeURIComponent(jsonUrl)}`);
    } else {
      console.error("No JSON URL found for this post.");
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true); // 수정 모드 활성화
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`https://dekku.co.kr/api/deskterior-post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access': localStorage.getItem('access'), // 로컬스토리지에서 access 토큰 가져오기
        },
        body: JSON.stringify(editedData), // 수정된 데이터를 PUT 요청으로 전송
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(updatedData);
        setIsEditMode(false); // 수정 모드 비활성화
      } else {
        console.error("Failed to save post.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  if (!data) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          {isEditMode ? (
            <input
              type="text"
              name="title"
              value={editedData.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          ) : (
            data.title
          )}
        </h1>
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

        <div className="text mb-10">
          {isEditMode ? (
            <textarea
              name="content"
              value={editedData.content}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 h-32"
            />
          ) : (
            data.content
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">제품 내용</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {data.deskteriorPostProductInfos.map((product, index) => (
            <div key={index} className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
              {product.name}
            </div>
          ))}
        </div>

        {isAuthor && (
          <div className="flex justify-end space-x-4 mb-6">
            {isEditMode ? (
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSaveClick}
              >
                저장하기
              </button>
            ) : (
              <>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleEditClick}
                >
                  수정하기
                </button>
                <button 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  onClick={handleLoadModelClick}
                >
                  3D 모델 수정
                </button>
              </>
            )}
          </div>
        )}

        {jsonUrl && !isAuthor && (
          <div className="text-center mb-6">
            <button
              onClick={handleLoadModelClick}
              className="bg-green-500 text-white px-6 py-2 rounded-md"
            >
              불러오기
            </button>
          </div>
        )}

        <hr className="border-t-2 border-gray-300 mb-4" />

        <div className="mb-4">댓글 : {data.comments.length}개</div>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          댓글이 들어갈 공간
        </div>

        <h2 className="text-xl font-bold mb-4">다른 게시물</h2>
        <div className="flex justify-evenly">
          {prevPostData && (
            <div className="">
              <DeskSetupCard key={prevPostData.id} data={prevPostData} />
              <p className="text-center mt-2 font-bold text-gray-600">이전 게시물</p>
            </div>
          )}
          {nextPostData && (
            <div className="">
              <DeskSetupCard key={nextPostData.id} data={nextPostData} />
              <p className="text-center mt-2 font-bold text-gray-600">다음 게시물</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
