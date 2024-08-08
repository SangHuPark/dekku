"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // useRouter를 next/navigation에서 임포트
import PostModal from '../../components/deskSetup/PostModal'; // 모달 컴포넌트 임포트
import DeskSetupPage from "../page";

const createpage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [styleInfo, setStyleInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const router = useRouter();

  useEffect(() => {
    const storedThumbnail = localStorage.getItem('thumbnail');
    if (storedThumbnail) {
      setImage(storedThumbnail);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 로컬 스토리지에서 씬 상태 가져오기
    const storedSceneState = localStorage.getItem('sceneState');
    if (!storedSceneState) {
      console.error("No scene state found in localStorage.");
      setIsSubmitting(false);
      return;
    }

    // Presigned URL 생성 요청
    let presignedUrl;
    try {
      const presignedResponse = await fetch("http://localhost:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "memberId", // 고유 식별자. 필요에 따라 변경하세요. 로그인 정보에서 유저아이디 가져와서 보내기
          fileCount: 2,
          directory: "3d"
        })
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      presignedUrl = presignedData.data.preSignedUrl;

      console.log("Presigned URLs:", presignedUrl);
    } catch (error) {
      console.error("Failed to fetch presigned URL:", error);
      setIsSubmitting(false);
      return;
    }

    // S3에 파일 업로드
    try {
      const sceneStateBlob = new Blob([storedSceneState], { type: 'application/json' });
      const imageBlob = await fetch(image).then(res => res.blob());

      const uploadSceneResponse = await fetch(presignedUrl[0], {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json'
        },
        body: sceneStateBlob
      });

      if (!uploadSceneResponse.ok) {
        const errorMessage = await uploadSceneResponse.text();
        console.error("Error uploading scene state:", errorMessage);
        throw new Error(errorMessage);
      }

      const uploadImageResponse = await fetch(presignedUrl[1], {
        method: "PUT",
        headers: {
          "Content-Type": imageBlob.type
        },
        body: imageBlob
      });

      if (!uploadImageResponse.ok) {
        const errorMessage = await uploadImageResponse.text();
        console.error("Error uploading image:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log("Uploaded file URLs:", presignedUrl.map(url => url.split("?")[0]));

      // 모달 띄우기
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to upload files:", error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push('/deskSetup/2'); // 게시글 디테일 페이지 경로로 변경
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 space-y-5"
      >
        <div className="flex flex-row w-full space-x-5">
          <div className="flex-1 flex justify-center items-center border border-gray-300 bg-gray-200 p-8">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-auto" />
              ) : (
                <div className="text-center">
                  <p>이곳에 사진을 올려주세요</p>
                  <div
                    type="button"
                    className="mt-2 bg-black text-white py-2 px-4 rounded"
                  >
                    PC에서 불러오기
                  </div>
                </div>
              )}
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col space-y-5">
            <div className="w-full">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <textarea
                placeholder="내용을 입력해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-28"
              />
            </div>
            <div className="w-full">
              <select
                value={styleInfo}
                onChange={(e) => setStyleInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">스타일 정보 추가</option>
                <option value="minimalist">미니멀리스트</option>
                <option value="industrial">인더스트리얼</option>
                <option value="modern">모던</option>
                <option value="rustic">러스틱</option>
                <option value="traditional">전통적인</option>
              </select>
            </div>
            <div className="w-full">
              <select
                value={colorInfo}
                onChange={(e) => setColorInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">컬러 정보 추가</option>
                <option value="white">화이트</option>
                <option value="black">블랙</option>
                <option value="gray">그레이</option>
                <option value="blue">블루</option>
                <option value="green">그린</option>
              </select>
            </div>
            <div className="w-full">
              <select
                value={jobInfo}
                onChange={(e) => setJobInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">직업 정보 추가</option>
                <option value="developer">개발자</option>
                <option value="designer">디자이너</option>
                <option value="writer">작가</option>
                <option value="artist">예술가</option>
                <option value="student">학생</option>
               
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-black text-white py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '제출 중...' : '제출'}
          </button>
        </div>
      </form>
      <PostModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
      />
    </div>
  );
}

export default createpage;