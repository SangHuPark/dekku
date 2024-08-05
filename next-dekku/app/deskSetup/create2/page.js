"use client";

import { useState } from "react";

const styles = [
  "NON_SELECT",
  "MODERN",
  "MINIMAL",
  "RETRO",
  "LOVELY",
  "GAMER",
  "LIBRARY",
  "NATURE",
  "ETC"
];

const colors = [
  "NON_SELECT",
  "BLACK_AND_WHITE",
  "BLACK",
  "WHITE",
  "GRAY",
  "MINT",
  "BLUE",
  "PINK",
  "GREEN",
  "RED",
  "YELLOW",
  "BROWN",
  "ETC"
];

const jobs = [
  "NON_SELECT",
  "OFFICE_WORKER",
  "DEVELOPER",
  "ARCHITECT",
  "DESIGNER",
  "EDITOR",
  "WRITER",
  "FREELANCER",
  "HOMEMAKER",
  "STUDENT",
  "ETC"
];

const openStatuses = ["PUBLIC", "PRIVATE"];

export default function Next14() {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("NON_SELECT");
  const [color, setColor] = useState("NON_SELECT");
  const [job, setJob] = useState("NON_SELECT");
  const [productIds, setProductIds] = useState([]);
  const [openStatus, setOpenStatus] = useState("PUBLIC");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // 로컬 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = null;
    if (image) {
      const presignedResponse = await fetch("http://localhost:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "post", // 고유 식별자. 필요에 따라 변경하세요.
          fileCount: 1,
          directory: "3d"
        })
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      const presignedUrl = presignedData.data.preSignedUrl[0];

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": image.type
        },
        body: image
      });

      if (!uploadResponse.ok) {
        const errorMessage = await uploadResponse.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      uploadedImageUrl = presignedUrl.split("?")[0];
    }

    const formData = {
      title: title,
      content: content,
      style: style,
      color: color,
      job: job,
      deskteriorPostImages: uploadedImageUrl ? [uploadedImageUrl] : [],
      productIds: productIds.map(id => parseInt(id, 10)),
      openStatus: openStatus,
    };

    console.log("Sending formData:", formData); // 디버그용 로그 출력

    try {
      const response = await fetch("http://localhost:8080/api/deskterior-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    }
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
              <div>
                <label htmlFor="image" className="block font-medium text-gray-700">
                  이미지 업로드
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
              {imageUrl && !isSubmitted && (
                <div>
                  <img src={imageUrl} alt="Uploaded Image" className="mt-4" />
                </div>
              )}
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
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {styles.map(styleOption => (
                  <option key={styleOption} value={styleOption}>{styleOption}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {colors.map(colorOption => (
                  <option key={colorOption} value={colorOption}>{colorOption}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <select
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {jobs.map(jobOption => (
                  <option key={jobOption} value={jobOption}>{jobOption}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="상품 ID를 쉼표로 구분하여 입력해주세요"
                value={productIds.join(',')}
                onChange={(e) => setProductIds(e.target.value.split(',').map(id => id.trim()))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <select
                value={openStatus}
                onChange={(e) => setOpenStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {openStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
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
