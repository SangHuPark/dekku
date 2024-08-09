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
            fileCount: 1,  // 멀티파트 폼데이터로 하나의 요청으로 전송
            directory: "3d"
          })
        });
  
        if (!presignedResponse.ok) {
          const errorMessage = await presignedResponse.text();
          throw new Error(errorMessage);
        }
  
        const presignedData = await presignedResponse.json();
        const presignedUrl = presignedData.data.preSignedUrl[0]; // 한 개의 URL만 필요
  
        // S3에 파일 업로드
        const formData = new FormData();
        formData.append("sceneState", new Blob([sceneState], { type: 'application/json' }));
        formData.append("thumbnail", await fetch(thumbnailUrl).then(res => res.blob()));
  
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: formData
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload files");
        }
  
        return presignedUrl.split("?")[0]; // 업로드된 파일의 URL 반환
  
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setUploading(false);
      }
    };
  
    return { uploadToS3, uploading, error };
  };
  