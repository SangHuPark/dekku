"use client";

import { useEffect, useState } from "react";
import DeskSetupCard from "../../deskSetup/DeskSetupCard";
import { datas } from "../../deskSetup/data";
import FollowerModal from "./followerModal";
import { useLogin } from "../../components/AuthContext";
import Link from "next/link";

const Profile = () => {
  const [allPosts, setAllPosts] = useState(datas);
  const [activeTab, setActiveTab] = useState("uploads"); // 현재 선택된 탭을 저장
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useLogin();

  useEffect(() => {
    const getServerSideProps = async (context) => {
      const { memberId } = context.params;
      try {
        const response = await fetch(
          `http://dekku.co.kr:8080/api/mypage/${memberId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          console.log(response);
        } else {
          alert("접근할 수 없는 페이지입니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getServerSideProps();
  }, []);

  return (
    <main className="flex flex-col items-center bg-white min-h-screen">
      <div className="w-full max-w-6xl bg-white px-5">
        <div className="flex items-center space-x-12 my-5 h-40">
          <div className="">
            <img
              src={userData.image_url || "/default_profile.png"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl mr-4">{userData.nickname}</h2>
              {isLoggedIn && (
                <Link
                  href="/profile-edit"
                  className="bg-black text-white border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold"
                >
                  프로필 수정
                </Link>
              )}
              {!isLoggedIn && (
                <button className="bg-black text-white border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold">
                  팔로우
                </button>
              )}
            </div>
            <div className="flex flex-row space-x-2 mb-4">
              <div>
                <button
                  className="space-x-2"
                  onClick={() => setShowModal(true)}
                >
                  <span>팔로워</span>
                  <span className="font-bold">{userData.followerCount}</span>
                </button>
                <FollowerModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </div>
              <div className="text-gray-400">|</div>
              <span>팔로잉</span>
              <span className="font-bold">{userData.followingCount}</span>
            </div>
            <p>{userData.introduction || "소개글이 없습니다."}</p>
          </div>
        </div>
        <div className="flex justify-start">
          <button
            className={`bg-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent ${
              activeTab === "uploads"
                ? "font-bold border-black"
                : "hover:border-black focus:border-black"
            }`}
            onClick={() => setActiveTab("uploads")}
          >
            업로드 {userData.deskteriorPosts.length}
          </button>
          <button
            className={`bg-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent ${
              activeTab === "likes"
                ? "font-bold border-black"
                : "hover:border-black focus:border-black"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            좋아요 {userData.likedPosts.length}
          </button>
        </div>
        <hr className="border-b border-gray-100 mb-8"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeTab === "uploads" &&
            allPosts.map((data) => (
              <DeskSetupCard key={data.id} data={data} isNoProfilePost={true} />
            ))}
          {activeTab === "likes" && (
            <div>{/* 좋아요 탭의 내용을 여기에 추가 */}</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
