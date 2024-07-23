import DeskSetupCard from './DeskSetupCard'; // DeskSetupCard 컴포넌트를 가져옵니다
import ClientComponent from './ClientComponent'; // ClientComponent를 가져옵니다
import { datas } from './data'; // 데이터 파일을 가져옵니다

function getTopThreePosts(data) {
  return data
    .map(item => ({
      ...item,
      score: parseInt(item.views.replace(/,/g, '')) * parseInt(item.likes.replace(/,/g, ''))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function DeskSetupPage() {
  const topThreePosts = getTopThreePosts(datas);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 최근 인기 데스크 셋업 순위 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">최근 인기 데스크 셋업 순위</h1>
        <h3 className="text-gray-400 mb-4">조회, 관심 급상승(최근 3일)</h3>
        <div className="flex justify-center gap-4 mb-8">
          {topThreePosts.map(data => (
            <DeskSetupCard key={data.id} data={data} />
          ))}
        </div>
      </div>
      
      <hr className="border-t-2 border-gray-500 mb-8" />
      
      {/* 모든 데스크 셋업 게시글 */}
      <div>
        <h1 className="text-2xl font-bold mb-2">모든 데스크 셋업 게시글</h1>
        {/* 클라이언트 컴포넌트 렌더링 */}
        <ClientComponent datas={datas} />
      </div>
    </div>
  );
}
