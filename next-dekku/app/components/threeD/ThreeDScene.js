'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Desk from './Desk';

// Extend OrbitControls to use in the react-three-fiber canvas
extend({ OrbitControls });

const Model = ({ modelPath, position, scale, yOffset }) => {
  const ref = useRef();
  const { scene } = useThree();
  const defaultPosition = position || [0, 0, 0];
  const defaultScale = scale || [1, 1, 1]; // 기본 스케일 설정

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      ref.current = gltf.scene;
      ref.current.position.set(...defaultPosition);

      // 모델의 경계 계산
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      // 모델의 크기를 표준화 (예: 최대 크기를 1로 설정)
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 1 / maxDim;

      // 모델의 중앙을 y 축에 맞춤
      const center = new THREE.Vector3();
      box.getCenter(center);

      // 모델의 y 축 위치 조정
      ref.current.position.set(
        defaultPosition[0],
        defaultPosition[1] - center.y * scaleFactor + (yOffset || 0), // yOffset을 사용하여 y 축 조정
        defaultPosition[2]
      );

      ref.current.scale.set(scaleFactor * defaultScale[0], scaleFactor * defaultScale[1], scaleFactor * defaultScale[2]); // 표준화된 스케일 적용
      scene.add(ref.current);
    });

    return () => {
      if (ref.current) {
        scene.remove(ref.current);
      }
    };
  }, [modelPath, defaultPosition, defaultScale, scene, yOffset]);

  return null;
};

const Controls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  
  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    controls.current.update();

    return () => {
      controls.current.dispose();
    };
  }, [camera, gl]);

  useFrame(() => controls.current?.update());

  return null;
};

const SceneContent = ({ selectedProducts, modelPositions, setModelPositions, isMoving, setIsMoving, deskBoundingBox }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const plane = useRef(new THREE.Mesh(
    new THREE.PlaneGeometry(deskBoundingBox.size.x, deskBoundingBox.size.z),
    new THREE.MeshBasicMaterial({ visible: false })
  ));
  const gridHelper = useRef(new THREE.GridHelper(deskBoundingBox.size.x, Math.floor(deskBoundingBox.size.x)));

  useEffect(() => {
    plane.current.position.y = deskBoundingBox.max.y + 0.01; // 책상 표면 위에 평면 배치
    gridHelper.current.position.y = deskBoundingBox.max.y + 0.01; // 격자도 같은 높이에 배치
    scene.add(plane.current);
    scene.add(gridHelper.current);

    return () => {
      scene.remove(plane.current);
      scene.remove(gridHelper.current);
    };
  }, [scene, deskBoundingBox]);

  useEffect(() => {
    gridHelper.current.visible = isMoving;
  }, [isMoving]);

  const handlePointerMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.current.setFromCamera(mouse.current, camera);
    
    const intersects = raycaster.current.intersectObject(plane.current);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const newPosition = [
        THREE.MathUtils.clamp(Math.round(intersect.point.x), deskBoundingBox.min.x, deskBoundingBox.max.x),
        deskBoundingBox.max.y + 0.01, // y 위치는 항상 책상 위로 고정
        THREE.MathUtils.clamp(Math.round(intersect.point.z), deskBoundingBox.min.z, deskBoundingBox.max.z)
      ];
      setModelPositions((prevPositions) =>
        prevPositions.map((position, index) => {
          if (selectedProducts[index].selected) {
            gridHelper.current.position.set(newPosition[0], newPosition[1], newPosition[2]);
            return newPosition;
          }
          return position;
        })
      );
      setIsMoving(true);
    }
  };

  const handlePointerDown = () => {
    setIsMoving(true);
  };

  const handlePointerUp = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [selectedProducts, deskBoundingBox]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      {selectedProducts.map((product, index) => (
        <Model
          key={index}
          modelPath={product.modelPath}
          position={modelPositions[index]}
          scale={product.scale} // 스케일 전달
          yOffset={product.yOffset} // yOffset 전달
          setPosition={(pos) => {
            const newPositions = [...modelPositions];
            newPositions[index] = pos;
            setModelPositions(newPositions);
          }}
        />
      ))}
      <Controls />
    </>
  );
};

const ThreeDScene = ({ selectedProducts }) => {
  const [modelPositions, setModelPositions] = useState(selectedProducts.map(product => product.position || [0, 0, 0]));
  const [isMoving, setIsMoving] = useState(false);
  const [deskBoundingBox, setDeskBoundingBox] = useState(null);
  const deskRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      setDeskBoundingBox({
        min: box.min,
        max: box.max,
        size: size
      });
    });
  }, []);

  if (!deskBoundingBox) {
    return <div>Loading...</div>;
  }

  return (
    <Canvas camera={{ position: [0, deskBoundingBox.size.y * 2.5, deskBoundingBox.size.z * 1.5], fov: 50 }}>
      <Desk
        modelPath="/threedmodels/ssafydesk.glb"
        // position={[0, deskBoundingBox.max.y, 0]} // 책상 표면 위로 위치 조정
        scale={[1, 1, 1]} // 스케일 조정 필요 시 설정
        ref={deskRef}
      />
      <SceneContent
        selectedProducts={selectedProducts}
        modelPositions={modelPositions}
        setModelPositions={setModelPositions}
        isMoving={isMoving}
        setIsMoving={setIsMoving}
        deskBoundingBox={deskBoundingBox}
      />
    </Canvas>
  );
};

export default ThreeDScene;
