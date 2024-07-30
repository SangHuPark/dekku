'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import ThreeDScene from './ThreeDScene';

// ThreeDMainContent 컴포넌트
const ThreeDMainContent = ({ selectedProducts }) => {
  const canvasRef = useRef();
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [positions, setPositions] = useState(
    selectedProducts.map((product) => product.position || [0, 0, 0])
  );
  const [gridVisible, setGridVisible] = useState(false);

  const handleKeyDown = useCallback((event) => {
    setGridVisible(true);
    setPositions((prevPositions) => {
      return prevPositions.map((position, index) => {
        let newPosition = [...position];
        switch (event.key) {
          case 'ArrowUp':
            newPosition[2] -= 1;
            break;
          case 'ArrowDown':
            newPosition[2] += 1;
            break;
          case 'ArrowLeft':
            newPosition[0] -= 1;
            break;
          case 'ArrowRight':
            newPosition[0] += 1;
            break;
          case ' ':
            newPosition[1] += 1;
            break;
          default:
            return position;
        }
        return newPosition;
      });
    });
  }, []);

  useEffect(() => {
    const handleKeyUp = () => setGridVisible(false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown]);

  return (
    <div className="p-5 w-full h-full">
      <Canvas ref={canvasRef} camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <ThreeDScene />
        </Suspense>
        <OrbitControls 
          enabled={orbitEnabled} 
          minDistance={3}
          maxDistance={10}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ThreeDMainContent;
