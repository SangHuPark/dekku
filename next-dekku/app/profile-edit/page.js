"use client";

import { useState, useEffect } from "react";

export default function profileEdit() {
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

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

  return (
    <div className="max-w-3xl mx-auto p-6 flex items-start space-x-8 border shadow-xl bg-white flex items-center mt-4">
      <div className="p-4 border shadow">
        <div className="relative w-48 h-48 mb-8">
          <img
            src={profileImage || "/profile_icon1.png"}
            alt="Profile Preview"
            className="w-48 h-48 object-cover rounded-full shadow-xl"
          />
        </div>
        <label
          htmlFor="profileImage"
          className="block text-center bg-[#77C3EB] text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600"
        >
          프로필 이미지 변경
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">개인정보 수정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="nickname" className="text-lg font-medium mb-2">
              닉네임:
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

          <div className="flex flex-col mb-4">
            <label htmlFor="introduction" className="text-lg font-medium mb-2">
              한 줄 소개:
            </label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              rows="4"
              required
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className=" bg-[#77C3EB] text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
