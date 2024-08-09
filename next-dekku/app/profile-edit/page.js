"use client";

import { useState, useEffect } from "react";
import { useLogin } from "../components/AuthContext";

export default function profileEdit() {
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const { isLoggedIn } = useLogin();

  // 서버에서 초기 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user");
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.profileImage || "");
          setNickname(data.nickname || "");
          setIntroduction(data.introduction || "");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("nickname", nickname);
    formData.append("introduction", introduction);

    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
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
