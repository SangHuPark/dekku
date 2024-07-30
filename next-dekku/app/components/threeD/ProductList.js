// app/components/ProductList.js
// 상품들의 정보들을 넣은 리스트
// 목업 구현을 위해 더미 리스트 생성
const products = {
  '모니터': [
    { name: '삼성 에센셜 커브드 모니터', description: '고해상도 모니터', image: '/products_image/삼성_에센셜_커브드_모니터.png', modelPath: 'path/to/monitor1.glb', scale: [1, 1, 1] },
    { name: '모니터2', description: '게이밍 모니터', image: 'https://via.placeholder.com/150', modelPath: 'path/to/monitor2.glb', scale: [1, 1, 1] },
  ],
  '노트북': [
    { name: '노트북1', description: '휴대용 노트북', image: 'https://via.placeholder.com/150', modelPath: 'path/to/laptop1.glb', scale: [1, 1, 1] },
    { name: '노트북2', description: '게이밍 노트북', image: 'https://via.placeholder.com/150', modelPath: 'path/to/laptop2.glb', scale: [1, 1, 1] },
  ],
  '데스크': [
    { name: 'SSAFY DESK', description: '2학기 책상', image: 'https://via.placeholder.com/150', modelPath: 'threedmodels/ssafydesk.glb', scale: [1, 1, 1] },
  ],
  '마우스': [
    { name: '마우스1', description: '무선 마우스', image: 'https://via.placeholder.com/150', modelPath: 'path/to/mouse1.glb', scale: [1, 1, 1] },
  ],
  '키보드': [
    { name: '키보드1', description: '기계식 키보드', image: 'https://via.placeholder.com/150', modelPath: 'path/to/keyboard1.glb', scale: [1, 1, 1] },
  ],
  '기타': [
    { name: '자동차', description: '파란색 자동차', image: '/products_image/파란색자동차.png', modelPath: 'threedmodels/800_follower_special_hudson_hornet_downloadable.glb', scale: [0.2, 0.2, 0.2] },
    { name: '마샬스피커', description: '마샬스피커', image: '/products_image/마샬스피커.png', modelPath: 'threedmodels/marshall.glb', scale: [0.04, 0.04, 0.04] }
  ],
};

export default products;
