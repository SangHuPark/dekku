import Link from "next/link";

export default function DeskSetupCard({ data, isNoProfilePost = false }) {
  return (
    <Link href={`/deskSetup/${data.id}`}>
      <div className="rounded-lg py-2 w-auto">
        <div className="relative flex justify-center mb-2">
          <img
            src={data.imgSrc}
            alt="desk"
            className="w-96 h-72 rounded-lg object-cover"
          />
          <div className="absolute bottom-1.5 right-1.5 text-white bg-black bg-opacity-50 rounded px-2 py-1">
            조회수 {data.views}
          </div>
        </div>
        {!isNoProfilePost && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <img
                src={data.profileImg}
                alt="profile"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="text-lg font-bold truncate">
                {data.username}
              </div>
            </div>
            <button className="rounded px-3 p-1 h-8 bg-[#77C3EB] text-white flex-shrink-0">
              팔로우
            </button>
          </div>
        )}
        <div className="text-lg font-semibold px-1 mb-1 truncate">
          {data.title}
        </div>
        <ul className="flex space-x-4 font-bold text-[#777777] px-1">
          <li className="flex items-center space-x-1">
            <img src="/like_icon.png" alt="like" className="w-5 h-5" />
            <span className="font-light">{data.likes}</span>
          </li>
          <li className="flex items-center space-x-1">
            <img src="/comment_icon.png" alt="comment" className="w-5 h-5" />
            <span className="font-light">{data.comments}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
}
