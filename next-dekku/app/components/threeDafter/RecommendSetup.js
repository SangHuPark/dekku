"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRecommendedPosts } from "./RecommendApi"; // API 함수 임포트

const RecommendSetup = ({ selectedProductIds }) => { // selectedProductIds를 prop으로 받습니다.
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedProductIds.length > 0) {
      (async () => {
        const fetchedPosts = await fetchRecommendedPosts(selectedProductIds);
        setPosts(fetchedPosts);
      })();
    }
  }, [selectedProductIds]);

  return (
    <div className="max-w-6xl mx-auto pb-40">
      <h2 className="text-3xl mb-4">유사한 게시글</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">추천할 게시글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link key={post.postId} href={`/deskSetup/${post.postId}`}>
              <div className="border p-4 rounded shadow-lg">
                <div className="relative flex justify-center mb-2">
                  <img
                    src={post.thumbnail}
                    alt="desk"
                    className="w-96 h-72 rounded-lg object-cover"
                  />
                  <div className="absolute bottom-1.5 right-1.5 text-white bg-black bg-opacity-50 rounded px-2 py-1">
                    조회수 {post.viewCount}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.memberImage}
                      alt="profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="text-lg font-bold truncate">{post.memberNickName}</div>
                  </div>

                </div>
                <div className="text-lg font-semibold px-1 mb-1 truncate">
                  {post.title}
                </div>
                <ul className="flex space-x-4 font-bold text-[#777777] px-1">
                  <li className="flex items-center space-x-1">
                    <img src="/like_icon.png" alt="like" className="w-5 h-5" />
                    <span className="font-light">{post.likeCount}</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <img src="/comment_icon.png" alt="comment" className="w-5 h-5" />
                    <span className="font-light">{post.commentCount}</span>
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendSetup;
