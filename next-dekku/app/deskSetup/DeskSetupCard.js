import Link from "next/link";

export default function DeskSetupCard({ data }) {
  return (
    <Link href={`/deskSetup/${data.id}`}>
      <div className="rounded-lg py-2 w-96">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={data.profileImg}
              alt="profile"
              className="w-14 h-14 object-cover rounded-full shadow-md"
            />
            <div className="text-lg font-medium truncate w-28">
              {data.username}
            </div>
          </div>
          <button className="rounded px-3 p-1 h-8 bg-[#77C3EB] font-extrabold text-sm text-white flex-shrink-0">
            팔로우
          </button>
        </div>
        <div className="relative flex justify-center mb-3">
          <img
            src={data.imgSrc}
            alt="desk"
            className="w-96 h-72 rounded-lg object-cover"
          />
          <div className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 rounded px-2 py-1">
            조회수 {data.views}
          </div>
        </div>
        <div className="text-lg font-bold px-1 mb-1">{data.title}</div>
        <ul className="flex space-x-4 font-bold text-gray-400 px-2">
          <li className="flex items-center space-x-1">
            <img src="/like_icon.png" alt="like" className="w-4 h-4" />
            <span>{data.likes}</span>
          </li>
          <li className="flex items-center space-x-1">
            <img src="/comment_icon.png" alt="comment" className="w-4 h-4" />
            <span>{data.comments}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
}
