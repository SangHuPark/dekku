'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useEffect(() => {
    ref.current.position.set(...position);
  }, [position]);

  return <primitive ref={ref} object={scene} />;
};

const ThreeDScene = ({ selectedProducts }) => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      {selectedProducts.map((product, index) => (
        <Model key={index} modelPath={product.modelPath} position={product.position || [0, 0, 0]} />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;
