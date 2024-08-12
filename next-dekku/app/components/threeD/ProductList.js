// app/components/ProductList.js
// 상품들의 정보들을 넣은 리스트
// 목업 구현을 위해 더미 리스트 생성
const products = {
  '모니터': [
    { id: 1, name: '삼성 SyncMaster SA300', description: 'LCD 모니터', image: '/products_image/syncmaster_sa300.png', modelPath: 'threedmodels/sa300_1.glb', scale: [3, 3, 3], update: '2024-08-01' },
    { id: 2, name: '서브 모니터', description: '모니터 거치대 연결', image: '/products_image/monitorstandssafy.png', modelPath: 'threedmodels/monitorstandssafy.glb', scale: [0.4, 0.4, 0.4], update: '2024-08-02' },
  ],
  '노트북': [
    { id: 3, name: 'samsung Galaxy Book4', description: 'NT750XGK-KD51G', image: '/products_image/갤럭시북프로4.PNG', modelPath: 'threedmodels/ssatbook.glb', scale: [1, 1, 1], price: '1,460,000원', update: '2024-08-01'},
    { id: 4, name: 'samsung Galaxy Book4', description: 'with stand', image: '/products_image/ssatbookwithstand.png', modelPath: 'threedmodels/ssatbookwithstand.glb', scale: [1, 1, 1], price: '1,460,000원', update: '2024-08-01'},
    { id: 5, name: '삼성 오디세이', description: 'NT850XBX-GD7A', image: '/products_image/게이밍노트북.PNG', modelPath: 'threedmodels/gaming_laptop.glb', scale: [0.2, 0.2, 0.2], price: '2,250,000원', update: '2024-08-04' },
    { id: 6, name: '삼성 오디세이', description: 'with stand', image: '/products_image/gaminglaptopwithstand.PNG', modelPath: 'threedmodels/gaminglaptopwithstand.glb', scale: [0.2, 0.2, 0.2], price: '2,250,000원', update: '2024-08-04' },

  ],
  '데스크': [
    { id: 7, name: 'SSAFY DESK', description: '2학기 책상', image: '/products_image/ssafydesk.png', modelPath: 'threedmodels/ssafydesk.glb', scale: [1, 1, 1], update: '2024-08-03' },
  ],
  '마우스': [
    { id: 8, name: '삼성 무선 마우스', description: 'black color', image: '/products_image/삼성무선마우스.PNG', modelPath: 'threedmodels/simple_pc_mouse.glb', scale: [1.2, 1.2, 1.2], price: '10,000원', update: '2024-08-03' },
    { id: 9, name: '로지텍 G604', description: 'LIGHTSPEED WIRELESS', image: '/products_image/logitech_g604.PNG', modelPath: 'threedmodels/logitech-g604.glb', scale: [2.5, 2.5, 2.5], price: '117,190원', update: '2024-08-08' },
    { id: 10, name: '애플 매직 마우스', description: 'Magic Mouse 2', image: '/products_image/magicmouse.PNG', modelPath: 'threedmodels/apple_magic_mouse.glb', scale: [2, 2, 2], price: '99,000원', update: '2024-08-08' },
  ],
  '키보드': [    
    { id: 11, name: '로지텍 텐키리스 키보드', description: 'Logitech G913 Wireless TKL', image: '/products_image/logitech_g913.PNG', modelPath: 'threedmodels/logicool_g913_tkl_gaming_keyboard.glb', scale: [3, 3, 3], price: '199,000원', update: '2024-08-09' },
    { id: 12, name: '애플 매직 키보드', description: 'WITH NUMERIC KEYPAD', image: '/products_image/magickeyboard.PNG', modelPath: 'threedmodels/apple_magic_keyboard.glb', scale: [0.2, 0.4, 0.2], price: '149,000원', update: '2024-08-09' },
  ],
  '기타': [
    { id: 13, name: '미니 자동차', description: '고퀄 파란색 자동차', image: '/products_image/파란색자동차.png', modelPath: 'threedmodels/car_example.glb', scale: [0.03, 0.03, 0.03], price: '2,000d원', update: '2024-07-23' },    
    { id: 14, name: 'SSAFY 명패', description: '싸피인의 필수품', image: '/products_image/nametag.png', modelPath: 'threedmodels/nametag.glb', scale: [2, 2, 2], update: '2024-08-09' },
    { id: 15, name: '텀블러', description: 'black', image: '/products_image/tumbler_black.png', modelPath: 'threedmodels/tumbler_black.glb', scale: [0.8, 0.8, 0.8], update: '2024-08-12' },
    { id: 16, name: '텀블러', description: 'white', image: '/products_image/tumbler_white.png', modelPath: 'threedmodels/tumbler_white.glb', scale: [0.8, 0.8, 0.8], update: '2024-08-12' },
    { id: 17, name: '장패드', description: '근본 black-red', image: '/products_image/longpad.png', modelPath: 'threedmodels/longpad.glb', scale: [7, 1, 6], update: '2024-08-12' },
    { id: 18, name: '마우스패드', description: '무려 ssafy 로고가 박힌', image: '/products_image/mousepad_ssafy.png', modelPath: 'threedmodels/mousepad_ssafy.glb', scale: [3, 1, 3], update: '2024-08-12' },
    { id: 19, name: 'room', description: 'ssafy classroom', image: '/products_image/mousepad_ssafy.png', modelPath: 'threedmodels/ssafyroom.glb', scale: [3, 3, 3], update: '2024-08-12' },
    { id: 20, name: '게이밍 헤드셋', description: 'RAZER Kraken V3 X', image: '/products_image/headset.png', modelPath: 'threedmodels/headset.glb', scale: [0.05, 0.05, 0.05], price: '74,140원', update: '2024-08-12' },
    { id: 21, name: '볼펜꽂이', description: 'black, mesh', image: '/products_image/penholder.png', modelPath: 'threedmodels/penholder.glb', scale: [0.15, 0.15, 0.15], update: '2024-08-12' },
  ],
};

export default products;
