"use client";

import { useState } from "react";
import DeskSetupCard from "../deskSetup/DeskSetupCard";
import { datas } from "../deskSetup/data";

const Profile = () => {
  const [allPosts, setAllPosts] = useState(datas);

  return (
    <main className="flex flex-col items-center bg-white min-h-screen px-5">
      <div className="w-full max-w-6xl bg-white">
        <div className="flex items-center space-x-12 my-5 h-40">
          <div className="">
            <img
              src="/yuuka_tired.PNG"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl mr-4">yuuka314</h2>
              <button className="bg-black text-white border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold">
                팔로우
              </button>
            </div>
            <p className="space-x-2 mb-4">
              <span>팔로워</span>
              <span className="font-bold">1,950</span>
              <span className="text-gray-400">|</span>
              <span>팔로잉</span>
              <span className="font-bold">3</span>
            </p>
            <p>HayaseYuuka@Millenium</p>
          </div>
        </div>
        <div className="flex justify-start border-b border-gray-100 mb-8">
          <button className="bg-none border-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent hover:border-black focus:border-black">
            업로드 99
          </button>
          <button className="bg-none border-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent hover:border-black focus:border-black">
            좋아요 50
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {allPosts.map((data) => (
            <DeskSetupCard key={data.id} data={data} isNoProfilePost={true} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Profile;
