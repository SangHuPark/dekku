"use client";

import { useEffect, useState } from "react";
import DeskSetupCard from "../../components/deskSetup/DeskSetupCard";
import FollowerModal from "./followerModal";
import FollowingModal from "./followingModal";
import { useLogin } from "../../components/AuthContext";
import Link from "next/link";
import FollowButton from "../../components/FollowButton";

const Profile = (id) => {
  const [allPosts, setAllPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("uploads");
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const { isLoggedIn } = useLogin();
  const [userData, setUserData] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followChangeTrigger, setFollowChangeTrigger] = useState(false);

  useEffect(() => {
    console.log(id);
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://dekku.co.kr/api/mypage/${id.params.memberId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setAllPosts(data.deskteriorPosts);
          console.log(followerCount);
          setFollowerCount(data.data.followerCount); // 초기 팔로워 수 설정
          console.log(followerCount);
          setFollowingCount(data.data.followingCount); // 초기 팔로잉 수 설정
        } else {
          alert("접근할 수 없는 페이지입니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchUserData();
  }, [id.params.memberId, followChangeTrigger]);

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

        const id = data.id;
        console.log(id);

        setMemberId(id);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetUserInfo();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log(userData);
  console.log(memberId);
  console.log(id.params.memberId);
  const memberIdAsString = String(memberId);

  return (
    <main className="flex flex-col items-center bg-white min-h-[83vh]">
      <div className="w-full max-w-6xl bg-white px-4">
        <div className="flex items-center space-x-12 my-4 h-40">
          <div>
            <img
              src={userData.data.image_url || "/default_profile.png"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl mr-4">{userData.data.nickname}</h2>
              {memberIdAsString === id.params.memberId ? (
                <Link
                  href={`/users/${memberId}/edit`}
                  className="bg-[#77C3EB] text-white hover:bg-[#09addb] border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold"
                >
                  프로필 수정
                </Link>
              ) : (
                <FollowButton
                  toMemberId={id.params.memberId}
                  setFollowChangeTrigger={setFollowChangeTrigger}
                />
              )}
            </div>
            <div className="flex flex-row space-x-2 mb-4">
              <div>
                <button
                  className="space-x-2"
                  onClick={() => setShowFollowerModal(true)}
                >
                  <span>팔로워</span>
                  <span className="font-bold">{followerCount}</span>
                </button>
                <FollowerModal
                  showFollowerModal={showFollowerModal}
                  setShowFollowerModal={setShowFollowerModal}
                  memberId={id.params.memberId}
                  followerCount={followerCount}
                />
              </div>
              <div className="text-gray-400">|</div>
              <div>
                <button
                  className="space-x-2"
                  onClick={() => setShowFollowingModal(true)}
                >
                  <span>팔로잉</span>
                  <span className="font-bold">{followingCount}</span>
                </button>
                <FollowingModal
                  showFollowingModal={showFollowingModal}
                  setShowFollowingModal={setShowFollowingModal}
                  memberId={id.params.memberId}
                  setFollowingCount={setFollowingCount}
                />
              </div>
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
            업로드{" "}
            {userData && userData.deskteriorPosts
              ? userData.deskteriorPosts.length
              : 0}
          </button>
          <button
            className={`bg-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent ${
              activeTab === "likes"
                ? "font-bold border-black"
                : "hover:border-black focus:border-black"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            좋아요{" "}
            {userData && userData.likedPosts ? userData.likedPosts.length : 0}
          </button>
        </div>
        <hr className="border-b border-gray-100 mb-8"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeTab === "uploads" &&
            allPosts &&
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
