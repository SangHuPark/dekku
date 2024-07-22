import { cards } from './data'; // 데이터 파일을 가져옵니다

export default function DeskSetupPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-8">최근 인기 데스크 셋업 순위</h1>
      <div className="">조회, 관심 급상승(최근 3일)</div>
      <div className="flex justify-center space-x-4">
        {cards.map(card => (
          <div key={card.id} className="border rounded-lg p-6 shadow-lg w-72 bg-white">
            <img src={card.imgSrc} alt="desk" className="w-72 h-48 object-cover mb-6 rounded-md"/>
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-base">
                <div className="flex items-center justify-center w-8 h-8 bg-black text-white text-xl rounded-xl">
                  {card.id}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <img src="/view_icon.png" alt="view" className="w-4 h-4 mr-2"/>
                    <span>{card.views}</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/like_icon.png" alt="like" className="w-4 h-4 mr-2"/>
                    <span>{card.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/comment_icon.png" alt="comment" className="w-4 h-4 mr-2"/>
                    <span>{card.comments}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12">
                  <img src={card.profileImg} alt="profile" className="w-full h-full object-cover rounded-full"/>
                </div>
                <div className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="font-semibold truncate w-28">{card.username}</div>
                      <button className="text-blue-500 flex-shrink-0">Follow</button>
                    </li>
                    <li className="text-gray-600 truncate w-44">{card.description}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
