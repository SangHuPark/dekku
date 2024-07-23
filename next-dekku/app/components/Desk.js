// 3D 모델 로드, three.js 장면(Scene) 내에서 렌더링하는 역할
'use client';

import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Desk = forwardRef(({ modelPath }, ref) => {
  const { scene } = useGLTF(modelPath); // GLTF 모델 로드
  return <primitive object={scene} ref={ref} />;
});

export default Desk;
