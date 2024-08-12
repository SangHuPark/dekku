"use client";

import { useEffect, useState } from "react";
import DeskSetupCard from "../../deskSetup/DeskSetupCard";
import FollowerModal from "./followerModal";
import { useLogin } from "../../components/AuthContext";
import Link from "next/link";

const Profile = (memberId) => {
  const [allPosts, setAllPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("uploads");
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useLogin();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(memberId);
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/mypage/${memberId.params.memberId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setAllPosts(data.deskteriorPosts); // 게시물 데이터를 상태에 저장
        } else {
          alert("접근할 수 없는 페이지입니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchUserData();
  }, [memberId]); // memberId가 변경될 때마다 이 효과가 실행됩니다.

  // 데이터가 로드되기 전에 로딩 상태를 처리하는 조건부 렌더링
  if (!userData) {
    return <div>Loading...</div>;
  }
  console.log(userData);

  return (
    <main className="flex flex-col items-center bg-white min-h-screen">
      <div className="w-full max-w-6xl bg-white px-4">
        <div className="flex items-center space-x-12 my-4 h-40">
          <div className="">
            <img
              src={userData.data.image_url || "/default_profile.png"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl mr-4">{userData.data.nickname}</h2>
              {isLoggedIn ? (
                <Link
                  href="/profile-edit"
                  className="bg-black text-white border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold"
                >
                  프로필 수정
                </Link>
              ) : (
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
                  <span className="font-bold">{userData.data.followerCount}</span>
                </button>
                <FollowerModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </div>
              <div className="text-gray-400">|</div>
              <span>팔로잉</span>
              <span className="font-bold">{userData.data.followingCount}</span>
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
            업로드 {userData && userData.deskteriorPosts ? userData.deskteriorPosts.length : 0}
          </button>
          <button
            className={`bg-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent ${
              activeTab === "likes"
                ? "font-bold border-black"
                : "hover:border-black focus:border-black"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            좋아요 {userData && userData.likedPosts ? userData.likedPosts.length : 0}
          </button>
        </div>
        <hr className="border-b border-gray-100 mb-8"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeTab === "uploads" && allPosts &&
            allPosts.length > 0 &&
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
