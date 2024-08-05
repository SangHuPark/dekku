'use client';

import Head from '../components/threeDafter/Head';
import UsedProducts from '../components/threeDafter/UsedProducts';
import RecommendSetup from '../components/threeDafter/RecommendSetup';
import { useRouter } from 'next/navigation';

const ThreeDAfter = () => {
  const recommendedPosts = [
    {
      id: 1,
      imgSrc: '/images/desk1.jpg',
      profileImg: '/images/profile1.jpg',
      username: 'John Doe',
      title: 'My Awesome Desk Setup',
      views: 1234,
      likes: 56,
      comments: 18,
    },
    {
      id: 2,
      imgSrc: '/images/desk2.jpg',
      profileImg: '/images/profile2.jpg',
      username: 'Jane Doe',
      title: 'Minimalist Desk Setup',
      views: 2345,
      likes: 67,
      comments: 23,
    },
    {
      id: 3,
      imgSrc: '/images/desk3.jpg',
      profileImg: '/images/profile3.jpg',
      username: 'Bob Smith',
      title: 'Productive Workspace',
      views: 3456,
      likes: 78,
      comments: 34,
    },
  ];

  const router = useRouter();

  const handleSave = () => {
    router.push('/mypage'); // 마이페이지로 이동
  };

  const handleShare = () => {
    router.push('/deskSetup/create'); // 게시글 작성 페이지로 이동
  };

  return (
    <div>
      <div>
        <Head onSave={handleSave} onShare={handleShare} />
      </div>
      <div>
        <UsedProducts />
      </div>
      <div>
        <RecommendSetup posts={recommendedPosts}/>
      </div>
    </div>
  );
};

export default ThreeDAfter;
