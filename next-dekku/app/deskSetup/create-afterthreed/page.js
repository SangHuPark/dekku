"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // useRouter를 next/navigation에서 임포트
import PostModal from '../../components/deskSetup/PostModal'; // 모달 컴포넌트 임포트
import { useUploadToS3 } from '../../components/threeDafter/ThreedUpload'; // ThreedUpload 훅을 임포트
import ToggleBtn from '../../components/deskSetup/ToggleBtn';

const CreateAfterThreedPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [styleInfo, setStyleInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const [isPublic, setIsPublic] = useState(true); // 공개 상태
  const router = useRouter();
  const { uploadToS3, uploading, error } = useUploadToS3(); // S3 업로드 훅 사용
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedThumbnail = localStorage.getItem('thumbnail');
    if (storedThumbnail) {
      setImage(storedThumbnail);
    }
  }, []);

 useEffect(()=>{
   // localStorage에서 access 토큰 확인
   const accessToken = localStorage.getItem('access');
   if (accessToken) {
     setIsLoggedIn(true);
   } else {
     setIsLoggedIn(false);
   }
 },[])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const style = styleInfo || "NON_SELECT";
    const color = colorInfo || "NON_SELECT";
    const job = jobInfo || "NON_SELECT";
  
    // 로컬 스토리지에서 씬 상태와 썸네일 가져오기
    const storedSceneState = localStorage.getItem('sceneState');
    const storedThumbnail = localStorage.getItem('thumbnail');
    const accessToken = localStorage.getItem('access');
    const selectedProducts = localStorage.getItem('selectedProducts')
  
    // 선택한 상품 ID 추출
    let productIds = [];
    if (selectedProducts) {
      try {
        const productsArray = JSON.parse(selectedProducts);
        productIds = productsArray.map(product => product.id);
      } catch (error) {
        console.error("Error parsing selectedProducts:", error);
      }
    }
  
    if (!storedSceneState || !storedThumbnail) {
      console.error("No scene state or thumbnail found in localStorage.");
      setIsSubmitting(false);
      return;
    }
  
    const memberId = "yourMemberId"; // 실제 구현 시 수정
  
    try {
      // JSON과 썸네일을 S3로 업로드
      const { jsonUrl, imageUrl } = await uploadToS3(storedSceneState, storedThumbnail, memberId);
  
      // 업로드된 URL을 백엔드 서버에 전달
      const response = await fetch('https://dekku.co.kr/api/deskterior-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access': accessToken,
        },
        body: JSON.stringify({
          title,
          content,
          style: style,
          color: color,
          job: job,
          deskteriorPostImages: [imageUrl, jsonUrl], // 이미지, 모델json URL 전달
          productIds: productIds.length > 0 ? productIds : [], // 제품 ID가 없는 경우 빈 배열로 설정
          openStatus: isPublic ? "OPENED" : "CLOSED",
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create post: ${errorMessage}`);
      }
  
      const result = await response.json();
      console.log(result)
      const postId = result.data.postId;
  
      if (!postId) {
        throw new Error('Post ID not found in the server response');
      }
  
      // 모달 띄우기
      setIsModalOpen(true);
  
      // 생성된 게시글 ID 저장
      localStorage.setItem('createdPostId', postId);
  
    } catch (err) {
      console.error("Failed to upload files:", err);
      setIsSubmitting(false);
      return;
    }
  
    setIsSubmitting(false);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    const postId = localStorage.getItem('createdPostId') // 생성된 게시글 ID 가져오기
    router.push(`/deskSetup/${postId}`); // 게시글 디테일 페이지 경로로 변경
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
            <div className="w-full flex items-center justify-between mt-4">
              <span>게시글 공개 여부</span>
              <ToggleBtn isEnabled={isPublic} setIsEnabled={setIsPublic} />
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

export default CreateAfterThreedPage;
