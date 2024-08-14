"use client";

import { useState, useEffect } from "react";
import { useLogin } from "../../../components/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfileEdit(id) {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const {isLoggedIn} = useLogin();
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch("https://dekku.co.kr/api/users/info", {
          method: "GET",
          headers: {
            access: accessToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        console.log(data);

        const memberId = data.id;
        const profileImage = data.imageUrl;
        const nickname = data.nickname;
        const introduction = data.Introduction;

        setMemberId(memberId);
        setProfileImage(profileImage);
        setNickname(nickname);
        setIntroduction(introduction);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetUserInfo();
  }, [id]);

  const handleProfileImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = profileImageUrl; // To store the URL obtained after upload

    try {
      // Step 1: Get presigned URL for image upload
      const response = await fetch("https://dekku.co.kr/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: memberId,
          fileCount: 1,
          directory: "profile",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch presigned URL");
      }

      const presignedData = await response.json();
      const presignedUrls = presignedData.data.preSignedUrl;

      // Step 2: Upload the image to the presigned URL
      const imageBlob = await fetch(profileImage).then((res) => res.blob());
      const uploadImageResponse = await fetch(presignedUrls[0], {
        method: "PUT",
        headers: {
          "Content-Type": imageBlob.type,
        },
        body: imageBlob,
      });

      if (!uploadImageResponse.ok) {
        throw new Error("Failed to upload image file");
      }

      // Extract the image URL
      imageUrl = presignedUrls[0].split("?")[0]; // Assuming URL without query parameters
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("Error during image upload:", error);
      return; // Exit the function if image upload fails
    }

    // Step 3: Update user profile with the new image URL
    try {
      const accessToken = window.localStorage.getItem("access");
      const response = await fetch("https://dekku.co.kr/api/users/update", {
        method: "PUT",
        headers: {
          access: accessToken,
          "Content-Type": "application/json", // Ensure this is set for JSON payload
        },
        body: JSON.stringify({
          nickname: nickname,
          ageRange: 20, // Replace with actual data if available
          introduction: introduction,
          gender: "", // Replace with actual data if available
          imageUrl: imageUrl,
        }),
      });
      if (response.ok) {
        console.log("Profile updated successfully");
        console.log(id.params.memberId);
        router.push(`/users/${id.params.memberId}`, { replace: true });
      } else {
        console.error("Failed to update profile", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };

  if (!isLoggedIn) {
    return <div>권한이 없습니다.</div>;
  } else {
    return (
      <div className="max-w-sm mx-auto p-6 mt-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border">
                <img
                  src={profileImage || "/profile_icon1.png"}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full cursor-pointer"
                  onClick={() =>
                    document.getElementById("profileImage").click()
                  }
                />
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="nickname"
                className="text-sm font-medium text-[#828c94]"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="introduction"
                className="text-sm font-medium text-[#828c94]"
              >
                1줄 소개
              </label>
              <textarea
                id="introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                rows="1"
                required
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#35C5F0] text-white text-sm font-bold py-3 px-4 rounded hover:bg-[#009FCE]"
            >
              완료
            </button>
          </form>
        </div>
      </div>
    );
  }
}
