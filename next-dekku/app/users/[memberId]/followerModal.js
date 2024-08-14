"use client";

import { useEffect, useState } from "react";

export default function FollowerModal({ showFollowerModal, setShowFollowerModal, memberId }) {
  const [allFollowers, setAllFollowers] = useState();

  useEffect(() => {
    const GetFollowers = async () => {
      try {
        const accessToken = window.localStorage.getItem("access");
        if (!accessToken) {
          console.log("No access token found");
          return;
        }
        const response = await fetch(
          `https://dekku.co.kr/api/follows/followers/${memberId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch followers");
        }
        const data = await response.json();
        console.log(data);
        setAllFollowers(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetFollowers();
  }, []);

  return (
    showFollowerModal && (
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block align-bottom bg-white rounded-2xl p-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
              onClick={() => setShowFollowerModal(false)}
            >
              &#x2715;
            </button>
            <div className="flex justify-center items-center text-2xl font-bold ">
              팔로워
            </div>
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:text-left w-full">
                <div className="w-full">
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <div className="w-full">
                      {allFollowers.map((data) => (
                        <div key={data.nickname} className="flex justify-between items-end space-y-4">
                          <img src={data.imageUrl} className="w-6 h-6" />
                          <div className="">{data.nickname}</div>
                          <button className="">팔로우</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
