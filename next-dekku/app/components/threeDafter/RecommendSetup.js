import Link from "next/link";

const RecommendSetup = ({ posts = [] }) => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl mb-4">유사한 게시글</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/deskSetup/${post.id}`}>
            <div className="border p-4 rounded shadow-lg">
              <div className="relative flex justify-center mb-2">
                <img
                  src={post.imgSrc}
                  alt="desk"
                  className="w-96 h-72 rounded-lg object-cover"
                />
                <div className="absolute bottom-1.5 right-1.5 text-white bg-black bg-opacity-50 rounded px-2 py-1">
                  조회수 {post.views}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.profileImg}
                    alt="profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="text-lg font-bold truncate">{post.username}</div>
                </div>
                <button className="rounded px-3 p-1 h-8 bg-[#77C3EB] text-white flex-shrink-0">
                  팔로우
                </button>
              </div>
              <div className="text-lg font-semibold px-1 mb-1 truncate">
                {post.title}
              </div>
              <ul className="flex space-x-4 font-bold text-[#777777] px-1">
                <li className="flex items-center space-x-1">
                  <img src="/like_icon.png" alt="like" className="w-5 h-5" />
                  <span className="font-light">{post.likes}</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/comment_icon.png" alt="comment" className="w-5 h-5" />
                  <span className="font-light">{post.comments}</span>
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendSetup;
