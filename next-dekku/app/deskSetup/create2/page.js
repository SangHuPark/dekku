"use client";

import { useState } from "react";

export default function Next14() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [styleInfo, setStyleInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("");
  const [textureInfo, setTextureInfo] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ image, title, content, styleInfo, colorInfo, textureInfo });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-3/4 space-y-5"
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
                  <button
                    type="button"
                    className="mt-2 bg-black text-white py-2 px-4 rounded"
                  >
                    PC에서 불러오기
                  </button>
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
                {/* Add options here */}
              </select>
            </div>
            <div className="w-full">
              <select
                value={colorInfo}
                onChange={(e) => setColorInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">컬러 정보 추가</option>
                {/* Add options here */}
              </select>
            </div>
            <div className="w-full">
              <select
                value={textureInfo}
                onChange={(e) => setTextureInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">직업 정보 추가</option>
                {/* Add options here */}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          제출
        </button>
      </form>
    </div>
  );
}
