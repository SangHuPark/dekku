import Link from "next/link";
import FollowButton from "../FollowButton";

export default function DeskSetupCard({ postId, data, isNoProfilePost = false }) {
  // postId와 data.postId 중 하나를 선택
  const finalPostId = postId ?? data.postId;

  return (
    <div className="rounded-lg w-auto hover:bg-gray-200">
      <Link href={`/deskSetup/${finalPostId}`}>
        <div className="relative flex justify-center mb-2">
          <img
            src={data.thumbnail}
            alt="desk"
            className="w-96 h-72 rounded-lg object-cover"
          />
          <div className="text-sm absolute bottom-1.5 right-1.5 text-white bg-black bg-opacity-50 rounded px-2 py-1">
            조회수 {data.viewCount}
          </div>
        </div>
      </Link>
      {!isNoProfilePost && (
        <div className="flex items-center justify-between">
          <Link href={`/users/${data.memberId}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={data.memberImage}
                  alt="profile"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="font-medium truncate">
                  {data.memberNickName}
                </div>
              </div>
            </div>
          </Link>
          <FollowButton toMemberId={data.memberId} />
        </div>
      )}
      <Link href={`/deskSetup/${finalPostId}`}>
        <div className="text-xl font-semibold px-1 mb-1 truncate">
          {data.title}
        </div>
        <ul className="flex space-x-4 font-bold text-[#777777] px-1">
          <li className="flex items-center space-x-1">
            <img src="/like_icon.png" alt="like" className="w-5 h-5" />
            <span className="font-light">{data.likeCount}</span>
          </li>
          <li className="flex items-center space-x-1">
            <img src="/comment_icon.png" alt="comment" className="w-5 h-5" />
            <span className="font-light">{data.commentCount}</span>
          </li>
        </ul>
      </Link>
    </div>
  );
}
