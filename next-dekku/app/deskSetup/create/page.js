"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from 'next/navigation'; // useRouter를 next/navigation에서 임포트
import PostModal from '../../components/deskSetup/PostModal'; // 모달 컴포넌트 임포트

const CreatePage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [styleInfo, setStyleInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const router = useRouter();


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  // 이미지 파일을 S3에 업로드
  let presignedUrl;
  try {
    const presignedResponse = await fetch("http://dekku.co.kr:8080/api/s3/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "memberId", // 로그인 정보에서 유저아이디 가져와서 보내기
        fileCount: 1, // 이미지만 전송
        directory: "post"
      })
    });

    if (!presignedResponse.ok) {
      const errorMessage = await presignedResponse.text();
      console.error("Error:", errorMessage);
      throw new Error(errorMessage);
    }

    const presignedData = await presignedResponse.json();
    presignedUrl = presignedData.data.preSignedUrl[0];

    // S3에 파일 업로드
    const imageBlob = await fetch(image).then(res => res.blob());

    const uploadImageResponse = await fetch(presignedUrl, {
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

    const imageUrl = presignedUrl.split("?")[0]; // 업로드된 이미지의 URL

    console.log("Uploaded image URL:", imageUrl);

    // 백엔드 서버로 포스트 생성 요청 보내기
    const response = await fetch('http://localhost:8080/api/deskterior-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        style: styleInfo,
        color: colorInfo,
        job: jobInfo,
        deskteriorPostImages: [imageUrl], // 이미지 URL 전달
        productIds: [], // 관련된 제품 ID가 있다면 추가
        OPENED: 'PUBLIC', // 공개 상태 설정
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    console.log("Post successfully created!");

    // 모달 띄우기
    setIsModalOpen(true);
  } catch (err) {
    console.error("Failed to upload files:", err);
    setIsSubmitting(false);
    return;
  }

  setIsSubmitting(false);
  };

  const handleModalClose = () => {
  setIsModalOpen(false);
  router.push('/deskSetup/1'); // 게시글 디테일 페이지 경로로 변경
  };


  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 space-y-5"
      >
        <div className="flex flex-row w-full space-x-5">
          <div className="flex-1 flex justify-center items-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
              ) : (
                <div className="text-center">
                  <p>이곳을 클릭해 사진을 올려주세요</p>
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
                <option value="NON_SELECT">스타일 정보 추가</option>
                <option value="MODERN">모던</option>
                <option value="MINIMAL">미니멀</option>
                <option value="RETRO">레트로</option>
                <option value="LOVELY">러블리</option>
                <option value="GAMER">게이머</option>
                <option value="LIBRARY">서재</option>
                <option value="NATURE">자연</option>
                <option value="ETC">기타</option>
              </select>
            </div>
            <div className="w-full">
              <select
                value={colorInfo}
                onChange={(e) => setColorInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="NON_SELECT">컬러 정보 추가</option>
                <option value="BLACK_AND_WHITE">블랙&화이트</option>
                <option value="BLACK">블랙</option>
                <option value="WHITE">화이트</option>
                <option value="GRAY">그레이</option>
                <option value="MINT">민트</option>
                <option value="BLUE">블루</option>
                <option value="PINK">핑크</option>
                <option value="GREEN">그린</option>
                <option value="RED">레드</option>
                <option value="YELLOW">옐로우</option>
                <option value="BROWN">브라운</option>
                <option value="ETC">기타</option>
              </select>
            </div>
            <div className="w-full">
              <select
                value={jobInfo}
                onChange={(e) => setJobInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="NON_SELECT">직업 정보 추가</option>
                <option value="OFFICE_WORKER">회사원</option>
                <option value="DEVELOPER">개발자</option>
                <option value="ARCHITECT">건축</option>
                <option value="DESIGNER">디자이너</option>
                <option value="EDITOR">편집자</option>
                <option value="WRITER">작가</option>
                <option value="FREELANCER">프리랜서</option>
                <option value="HOMEMAKER">주부</option>
                <option value="STUDENT">학생</option>
                <option value="ETC">기타</option>
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
      <Suspense>
        <PostModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
        />
      </Suspense>
    </div>
  );
}

export default CreatePage;