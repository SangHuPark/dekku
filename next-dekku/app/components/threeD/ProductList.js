// app/components/ProductList.js
// 상품들의 정보들을 넣은 리스트
// 목업 구현을 위해 더미 리스트 생성
const products = {
  '모니터': [
    { name: '삼성 SyncMaster SA300', description: 'LCD 모니터', image: '/products_image/syncmaster_sa300.png', modelPath: 'threedmodels/sa300_1.glb', scale: [2, 2, 2] },
    { name: '서브 모니터', description: '모니터 거치대 연결', image: '/products_image/monitorstandssafy.png', modelPath: 'threedmodels/monitorstandssafy.glb', scale: [0.5, 0.5, 0.5] },
  ],
  '노트북': [
    { name: 'samsung Galaxy Book4', description: 'NT750XGK-KD51G', image: '/products_image/갤럭시북프로4.png', modelPath: 'threedmodels/ssatbook.glb', scale: [1, 1, 1], price: '1,460,000원', },
    { name: '게이밍 노트북', description: '게이밍용', image: '/products_image/게이밍노트북.png', modelPath: 'threedmodels/gaming_laptop.glb', scale: [0.2, 0.2, 0.2], price: '2,250,000원' },
  ],
  '데스크': [
    { name: 'SSAFY DESK', description: '2학기 책상', image: '/products_image/ssafydesk.png', modelPath: 'threedmodels/ssafydesk.glb', scale: [1, 1, 1] },
  ],
  '마우스': [
    { name: '삼성 무선 마우스', description: 'black color', image: '/products_image/삼성무선마우스.png', modelPath: 'threedmodels/simple_pc_mouse.glb', scale: [1.2, 1.2, 1.2], price: '10,000원' },
    { name: '로지텍 G604', description: 'LIGHTSPEED WIRELESS', image: '/products_image/logitech_g604.PNG', modelPath: 'threedmodels/logitech-g604.glb', scale: [2.5, 2.5, 2.5], price: '117,190원' },
    { name: '애플 매직 마우스', description: 'Magic Mouse 2', image: '/products_image/magicmouse.PNG', modelPath: 'threedmodels/apple_magic_mouse.glb', scale: [2, 2, 2], price: '99,000원' },
  ],
  '키보드': [    
    { name: '로지텍 텐키리스 키보드', description: 'Logitech G913 Wireless TKL', image: '/products_image/logitech_g913.PNG', modelPath: 'threedmodels/logicool_g913_tkl_gaming_keyboard.glb', scale: [3, 3, 3], price: '199,000원' },
    { name: '애플 매직 키보드', description: 'WITH NUMERIC KEYPAD', image: '/products_image/magickeyboard.PNG', modelPath: 'threedmodels/apple_magic_keyboard.glb', scale: [0.2, 0.4, 0.2], price: '149,000원' },
  ],
  '기타': [
    { name: '미니 자동차', description: '고퀄 파란색 자동차', image: '/products_image/파란색자동차.png', modelPath: 'threedmodels/car_example.glb', scale: [0.03, 0.03, 0.03], price: '2,000d원' },    
    { name: 'SSAFY 명패', description: '싸피인의 필수품', image: '/products_image/nametag.png', modelPath: 'threedmodels/nametag.glb', scale: [2, 2, 2] },
  ],
};

export default products;
