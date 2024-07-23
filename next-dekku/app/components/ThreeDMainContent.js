'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Desk from './Desk'; // Desk 컴포넌트는 이제 여러 모델을 렌더링하도록 수정됩니다.

// TransformControls를 위한 래퍼 컴포넌트
const TransformableDesk = ({ modelPath }) => {
  const ref = useRef();
  const { camera, gl } = useThree();
  
  return (
    <>
      <TransformControls ref={ref} object={ref.current} mode="translate" />
      <Desk modelPath={modelPath} ref={ref} />
    </>
  );
};

// ThreeDMainContent 컴포넌트는 3D 모델을 렌더링합니다.
const ThreeDMainContent = ({ selectedProducts }) => {
  const canvasRef = useRef(); // 캔버스 레퍼런스
  
  return (
    <div className="flex-grow p-5 overflow-auto w-full h-full">
      <Canvas ref={canvasRef}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* 여러 모델을 렌더링 */}
        {selectedProducts.map((product, index) => (
          <TransformableDesk key={index} modelPath={product.modelPath} />
        ))}
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ThreeDMainContent;
