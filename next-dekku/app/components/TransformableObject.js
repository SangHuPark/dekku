'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

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
    <group ref={group} scale={scale}>
      {scene.children.map((child, index) => (
        <primitive key={index} object={child} />
      ))}
    </group>
  );
};

export default TransformableObject;
