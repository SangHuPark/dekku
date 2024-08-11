import React, { useState } from 'react';

export const useUploadToS3 = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToS3 = async (sceneState, thumbnailUrl, memberId) => {
    setUploading(true);
    setError(null);

    try { 
      // Presigned URL 생성 요청
      const presignedResponse = await fetch("http://localhost:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: memberId,
          fileCount: 2,  // JSON과 이미지를 위한 두 개의 Presigned URL 요청
          directory: "3d"
        })
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      const [jsonPresignedUrl, imagePresignedUrl] = presignedData.data.preSignedUrl;

      // S3에 JSON 파일 업로드
      const jsonBlob = new Blob([sceneState], { type: 'application/json' });
      await fetch(jsonPresignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonBlob
      });

      // S3에 이미지 파일 업로드
      const imageBlob = await fetch(thumbnailUrl).then(res => res.blob());
      await fetch(imagePresignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/png" // 이미지의 Content-Type을 설정
        },
        body: imageBlob
      });

      return {
        jsonUrl: jsonPresignedUrl.split("?")[0],
        imageUrl: imagePresignedUrl.split("?")[0]
      };

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadToS3, uploading, error };
};
