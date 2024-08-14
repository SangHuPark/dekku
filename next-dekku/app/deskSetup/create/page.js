"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToggleBtn from '../../components/deskSetup/ToggleBtn';
import PostModal from '../../components/deskSetup/PostModal';

const CreateDeskSetupPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [styleInfo, setStyleInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 키워드 검색과 관련된 상태
  const [keyword, setKeyword] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 여부

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 키워드 변경 시 자동으로 검색 실행
  useEffect(() => {
    if (keyword !== "") {
      handleSearch();
    } else {
      setShowDropdown(false);
    }
  }, [keyword]);

  // 이미지 파일 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // 키워드로 검색하기 위한 함수
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://dekku.co.kr:8080/api/products/search/names?keyword=${keyword}`);
      const data = await response.json();

      // API 응답이 배열일 경우 처리
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        setShowDropdown(true); // 드롭다운 표시
      } else {
        setSearchResults([]);
        setShowDropdown(true); // 빈 드롭다운 표시 (메시지 표시)
      }
    } catch (error) {
      console.error("Failed to search products:", error);
      setSearchResults([]);
      setShowDropdown(true); // 오류 시 빈 드롭다운 표시 (메시지 표시)
    }
  };

  // 상품을 선택된 상품 리스트에 추가하는 함수
  const handleProductClick = (product) => {
    if (!selectedProductIds.includes(product.productId)) {
      setSelectedProductIds([...selectedProductIds, product.productId]);
    }
    setShowDropdown(false); // 드롭다운 숨김
    setKeyword(""); // 검색어 초기화
  };

  // 상품 제거 함수
  const handleRemoveProduct = (productId) => {
    const updatedProductIds = selectedProductIds.filter((id) => id !== productId);
    setSelectedProductIds(updatedProductIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const style = styleInfo || "NON_SELECT";
    const color = colorInfo || "NON_SELECT";
    const job = jobInfo || "NON_SELECT";

    const accessToken = localStorage.getItem('access');

    try {
      // Presigned URL 요청
      const presignedResponse = await fetch("http://dekku.co.kr:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "memberId", // 실제 유저 아이디로 교체 필요
          fileCount: 1,
          directory: "post",
        }),
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      const presignedUrl = presignedData.data.preSignedUrl[0];
      const imageUrl = presignedUrl.split("?")[0]; // 업로드된 이미지의 URL

      // S3에 이미지 업로드
      const imageBlob = await fetch(URL.createObjectURL(image)).then((res) => res.blob());
      const uploadImageResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": imageBlob.type,
        },
        body: imageBlob,
      });

      if (!uploadImageResponse.ok) {
        const errorMessage = await uploadImageResponse.text();
        console.error("Error uploading image:", errorMessage);
        throw new Error(errorMessage);
      }

      // 서버에 최종 데이터 전송
      const response = await fetch("http://dekku.co.kr:8080/api/deskterior-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access": accessToken,
        },
        body: JSON.stringify({
          title,
          content,
          style,
          color,
          job,
          deskteriorPostImages: [imageUrl], // 이미지 URL 전달
          productIds: selectedProductIds,
          openStatus: isPublic ? "OPENED" : "CLOSED",  // 공개 상태 설정
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      console.log(result)
      const postId = result.data.postId;

      if (!postId) {
        console.error('Post id 응답에 없음');
        throw new Error('Post id 응답에 없음');
      }

      console.log("Post successfully created!");

      // 제출이 성공적으로 완료되면 모달을 열기
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
    router.push(`/deskSetup/${postId}`); // 게시글 디테일 페이지 경로로 이동
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center mt-20 space-y-8">
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 space-y-5">
        <div className="flex flex-row w-full space-x-5">
          <div className="flex-1 flex justify-center items-center">
            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-auto rounded-lg" />
              ) : (
                <div className="text-center">
                  <p>이곳을 클릭해 사진을 올려주세요</p>
                  <div className="mt-2 bg-black text-white py-2 px-4 rounded">PC에서 불러오기</div>
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

        {/* 상품 검색 및 선택 */}
        <div className="w-full relative flex flex-col mt-8">
          <h3 className="font-bold text-xl">상품 검색 및 선택</h3>
          <div className="flex space-x-3 mt-4">
            <input 
              type="text" 
              placeholder="상품 검색" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-full" // 둥근 검색창
            />
            <button type="button" onClick={handleSearch} className="bg-black text-white py-2 px-4 rounded-full">
              검색
            </button>
          </div>

          {/* 검색 결과 드롭다운 */}
          {showDropdown && (
            <div className="relative mt-2">
              <ul className="relative z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product, index) => (
                    <li 
                      key={index} 
                      className="p-2 cursor-pointer hover:bg-gray-100 text-black" // 글씨 색상을 명시적으로 설정
                      onClick={() => handleProductClick(product)}
                    >
                      {product.productName}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-center text-gray-500">
                    해당 키워드에 맞는 상품이 없습니다 😢
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* 선택된 상품 표시 */}
        <div className="w-full mt-10 flex flex-wrap gap-4">
          <h3 className="font-bold text-xl w-full">선택된 상품</h3>
          {selectedProductIds.map((productId, index) => {
            const product = searchResults.find(p => p.productId === productId);
            return (
              <div
                key={`${productId}-${index}`}
                className="relative inline-block border border-gray-300 rounded-full shadow-sm bg-white"
                style={{ padding: '12px 20px', maxWidth: 'fit-content', wordBreak: 'break-word' }} // 알약 모양 및 상자 크기 조정
              >
                <p className="text-lg font-semibold">{product ? product.productName : ""}</p>
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full"
                  style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} // 동그란 버튼 설정
                  onClick={() => handleRemoveProduct(productId)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className={`bg-black text-white py-2 px-4 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "제출"}
          </button>
        </div>
      </form>
      <PostModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default CreateDeskSetupPage;
