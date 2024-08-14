"use client";

import { useEffect, useState } from "react";
import FollowButton from "../../components/FollowButton";
import Link from "next/link";

export default function FollowerModal({
  showFollowerModal,
  setShowFollowerModal,
  memberId,
  followerCount,
}) {
  const [allFollowers, setAllFollowers] = useState();
  const [myId, setMyId] = useState();

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
  }, [followerCount]);

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

        setMyId(id);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    GetUserInfo();
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
            <div className="flex justify-center items-center text-2xl font-bold mb-4">
              팔로워
            </div>
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:text-left w-full">
                <div className="w-full">
                  <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="w-full space-y-4">
                      {!!allFollowers ? (
                        allFollowers.map((data) => (
                          <div
                            key={data.nickname}
                            className="flex justify-center items-center relative"
                          >
                            <Link href={`https://dekku.co.kr/users/${data.id}`}
                            className="flex items-center">
                              <img
                                src={data.imageUrl}
                                className="w-8 h-8 rounded-full absolute left-0"
                                alt="Follower Profile"
                              />
                            </Link>
                            <Link href={`https://dekku.co.kr/users/${data.id}`}>
                              {data.nickname}
                            </Link>
                            {myId !== data.id && (
                              <div className="absolute right-0">
                                <FollowButton toMemberId={data.id} />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div>팔로워가 없습니다</div>
                      )}
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
