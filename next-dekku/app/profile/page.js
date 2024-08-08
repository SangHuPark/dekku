// app/pages/profile.js

const Profile = () => {
  return (
    <div className="flex flex-col items-center bg-white min-h-screen px-5">
      <main className="w-full max-w-6xl bg-white">
        <div className="flex items-center space-x-12 mb-5 h-40">
          <div className="">
            <img
              src="/yuuka_tired.PNG"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold mr-4">yuuka314</h2>
              <button className="bg-black text-white border-none py-2 px-3 rounded-lg cursor-pointer text-sm font-bold">
                팔로우
              </button>
            </div>
            <p className="space-x-2">
              <span>팔로워</span>
              <span className="font-bold">1,950</span>
              <span className="text-gray-400">|</span>
              <span>팔로잉</span>
              <span className="font-bold">3</span>
            </p>
            <p>HayaseYuuka@Millenium</p>
          </div>
        </div>
        <div className="flex justify-start border-t border-gray-200 pt-2">
          <button className="bg-none border-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent hover:border-black focus:border-black">
            게시물 99
          </button>
          <button className="bg-none border-none text-base cursor-pointer py-2 mr-5 text-center border-b-2 border-transparent hover:border-black focus:border-black">
            태그 상품 50
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          <div className="bg-white rounded-md overflow-hidden shadow-md h-auto p-4 flex flex-col justify-center">
            <img
              src="/shiroko_ddabong.png"
              alt="Post 1"
              className="w-full h-100 object-cover"
            />
            <div className="flex justify-between items-center mt-auto p-2">
              <p className="text-2xl">블루 아카이브</p>
              <span className="text-lg text-gray-600">5</span>
            </div>
          </div>
          <div className="bg-white rounded-md overflow-hidden shadow-md h-auto p-4 flex flex-col justify-center">
            <img
              src="/shiroko_ddabong.png"
              alt="Post 2"
              className="w-full h-100 object-cover"
            />
            <div className="flex justify-between items-center mt-auto p-2">
              <p className="text-2xl">정 말 로</p>
              <span className="text-lg text-gray-600">50</span>
            </div>
          </div>
          <div className="bg-white rounded-md overflow-hidden shadow-md h-auto p-4 flex flex-col justify-center">
            <img
              src="/loa_gunsldream.png"
              alt="Post 3"
              className="w-full h-100 object-cover"
            />
            <div className="flex justify-between items-center mt-auto p-2">
              <p className="text-2xl">갓 겜</p>
              <span className="text-lg text-gray-600">68</span>
            </div>
          </div>
          <div className="bg-white rounded-md overflow-hidden shadow-md h-auto p-4 flex flex-col justify-center">
            <img
              src="/shiroko_ddabong.png"
              alt="Post 4"
              className="w-full h-100 object-cover"
            />
            <div className="flex justify-between items-center mt-auto p-2">
              <p className="text-2xl">입니다</p>
              <span className="text-lg text-gray-600">46</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
