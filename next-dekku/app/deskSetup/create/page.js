"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // next/navigation 모듈 사용
import products from "../../components/threeD/ProductList";

const CreateDeskSetupPage = () => {
  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [title, setTitle] = useState(""); // 게시글 제목 상태
  const [content, setContent] = useState(""); // 게시글 내용 상태
  const [styleInfo, setStyleInfo] = useState(""); // 스타일 정보 상태
  const [colorInfo, setColorInfo] = useState(""); // 색상 정보 상태
  const [jobInfo, setJobInfo] = useState(""); // 직업 정보 상태
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const router = useRouter(); // next/navigation의 useRouter 사용
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 이미지 파일 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

useEffect(()=>{
    // localStorage에서 access 토큰 확인
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
},[])

  // 상품 추가 핸들러
  const handleProductSelect = (e, category) => {
    const productId = parseInt(e.target.value);
    const product = products[category].find((p) => p.id === productId);
    setSelectedProducts([...selectedProducts, product]);
  };

  // 상품 제거 핸들러
  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((item) => item.id !== productId);
    setSelectedProducts(updatedProducts);
  };

  // 게시글 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 선택되지 않은 경우 기본값 "NON_SELECT" 설정
    const style = styleInfo || "NON_SELECT";
    const color = colorInfo || "NON_SELECT";
    const job = jobInfo || "NON_SELECT";

    let presignedUrl;
    try {
      // 이미지 업로드를 위한 presigned URL 요청
      const presignedResponse = await fetch("https://dekku.co.kr/api/s3/presigned-url", {
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
      presignedUrl = presignedData.data.preSignedUrl[0];

      // 이미지 파일을 S3에 업로드
      const imageBlob = await fetch(image).then((res) => res.blob());

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

      const imageUrl = presignedUrl.split("?")[0]; // 업로드된 이미지의 URL

      console.log("Uploaded image URL:", imageUrl);

      // 선택된 상품 ID들을 추출
      const productIds = selectedProducts.map((product) => product.id);

      // 백엔드 서버로 게시글 생성 요청 보내기
      const response = await fetch("https://dekku.co.kr/api/deskterior-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access": accessToken,
        },
        body: JSON.stringify({
          title,
          content,
          style: styleInfo,
          color: colorInfo,
          job: jobInfo,
          deskteriorPostImages: [imageUrl], // 이미지 URL 전달
          productIds, // 선택된 상품 ID들 전달
          OPENED: "PUBLIC", // 공개 상태 설정
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      console.log("Post successfully created!");
      router.push("/deskSetup/1"); // 게시글 디테일 페이지 경로로 변경
    } catch (err) {
      console.error("Failed to upload files:", err);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 space-y-5">
        <div className="flex flex-row w-full space-x-5">
          <div className="flex-1 flex justify-center items-center">
            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
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
          </div>
        </div>

        {/* 카테고리별 상품 선택 */}
        <div className="w-full">
          <h3 className="font-bold text-xl">상품 선택</h3>
          {Object.keys(products).map((category) => (
            <div key={category} className="mb-4">
              <label className="font-semibold">{category}</label>
              <select
                onChange={(e) => handleProductSelect(e, category)}
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue="DEFAULT"
              >
                <option value="DEFAULT" disabled>제품을 선택하세요</option>
                {products[category].map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* 선택된 상품 표시 */}
        <div className="w-full">
          <h3 className="font-bold text-xl">선택된 상품</h3>
          <div className="space-y-4">
            {selectedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="border p-2 rounded relative hover:bg-gray-200 flex justify-between items-center"
              >
                <p>{product.name}</p>
                <button
                  className="bg-red-500 text-white rounded-full p-1 text-xs"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-black text-white py-2 px-4 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "제출"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeskSetupPage;
