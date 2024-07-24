'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// Room 컴포넌트
const Room = () => {
  const { scene } = useGLTF('/threedmodels/room.glb');
  scene.position.set(0, 1, 0); // Room의 위치를 위로 올림
  return <primitive object={scene} />;
};

// Desk 컴포넌트
const Desk = ({ scale = [1, 1, 1] }) => {
  const { scene } = useGLTF('/threedmodels/TABLE.glb');
  return <primitive object={scene} scale={scale} />;
};

// TransformableObject 컴포넌트
const TransformableObject = ({ modelPath, scale, position, enableOrbit }) => {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  const { camera, gl } = useThree();
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    const controls = new DragControls([group.current], camera, gl.domElement);
    controls.addEventListener('dragstart', () => {
      enableOrbit(false);  // OrbitControls 비활성화
    });
    controls.addEventListener('drag', (event) => {
      setCurrentPosition([event.object.position.x, event.object.position.y, event.object.position.z]);
    });
    controls.addEventListener('dragend', () => {
      enableOrbit(true);  // OrbitControls 활성화
    });

    return () => {
      controls.dispose();
    };
  }, [camera, gl.domElement, enableOrbit]);

  useEffect(() => {
    if (group.current) {
      group.current.position.set(currentPosition[0], currentPosition[1], currentPosition[2]);
    }
  }, [currentPosition]);

  return (
    <group ref={group} scale={scale} position={position}>
      <primitive object={scene} />
    </group>
  );
};

// ThreeDMainContent 컴포넌트
const ThreeDMainContent = ({ selectedProducts }) => {
  const canvasRef = useRef();
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  return (
    <div className="p-5 w-full h-full">
      <Canvas ref={canvasRef} camera={{ position: [0, 1, 5], fov: 50 }}> {/* 초기 카메라 위치 설정 */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Room />
          <Desk scale={[2, 2, 2]} /> {/* Desk 컴포넌트 추가 */}
          {selectedProducts.map((product, index) => (
            <TransformableObject 
              key={index} 
              modelPath={product.modelPath} 
              scale={product.scale || [1, 1, 1]}
              position={product.position || [0, 0, 0]}
              enableOrbit={setOrbitEnabled}
            />
          ))}
        </Suspense>
        <OrbitControls 
          enabled={orbitEnabled} 
          minDistance={3}  // 배경이 더 멀어지지 않도록 설정
          maxDistance={10} // 배경이 너무 가까워지지 않도록 설정
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ThreeDMainContent;
