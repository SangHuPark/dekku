import React, { useState } from 'react';

export const useUploadToS3 = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToS3 = async (sceneState, thumbnailUrl, memberId) => {
    setUploading(true);
    setError(null);

    try { 
      // Presigned URL 생성 요청
      const presignedResponse = await fetch("http://dekku.co.kr:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: memberId,
          fileCount: 2,  // JSON 파일과 이미지 파일 두 개
          directory: "3d"
        })
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      const presignedUrls = presignedData.data.preSignedUrl;

      // S3에 JSON 파일 업로드
      const sceneStateBlob = new Blob([sceneState], { type: 'application/json' });
      const uploadSceneResponse = await fetch(presignedUrls[0], {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json'
        },
        body: sceneStateBlob
      });

      if (!uploadSceneResponse.ok) {
        throw new Error("Failed to upload JSON file");
      }

      // S3에 이미지 파일 업로드
      const imageBlob = await fetch(thumbnailUrl).then(res => res.blob());
      const uploadImageResponse = await fetch(presignedUrls[1], {
        method: "PUT",
        headers: {
          "Content-Type": imageBlob.type
        },
        body: imageBlob
      });

      if (!uploadImageResponse.ok) {
        throw new Error("Failed to upload image file");
      }

      // 업로드된 파일의 URL 반환
      const jsonUrl = presignedUrls[0].split("?")[0];
      const imageUrl = presignedUrls[1].split("?")[0];
      console.log(jsonUrl)
      console.log(imageUrl)

      return { jsonUrl, imageUrl };

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadToS3, uploading, error };
};
