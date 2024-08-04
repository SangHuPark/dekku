import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import products from '../threeD/ProductList'; // 각 모델의 스케일 값을 가져오기 위해 제품 리스트를 임포트

const Head = ({ onSave, onShare }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [desk, setDesk] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    // 씬 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // 배경 색상을 흰색으로 설정
    setScene(scene);

    // 카메라 생성
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 4); // 카메라 위치 조정 (X, Y, Z)
    camera.lookAt(0, 1, 0); // 카메라가 씬의 중심을 바라보도록 설정
    setCamera(camera);

    // 렌더러 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // 주변 광 조명
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 방향성 광 조명
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);

    // 책상 모델 로드
    const deskLoader = new GLTFLoader();
    deskLoader.load('threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, 0); // 책상을 씬의 중앙에 배치
      desk.scale.set(3, 3, 3); // 책상의 크기를 조정
      scene.add(desk);
      setDesk(desk);

      // 로컬 스토리지에서 상태 불러오기
      const storedSceneState = localStorage.getItem('sceneState');
      if (storedSceneState) {
        const parsedState = JSON.parse(storedSceneState);
        loadModels(parsedState, scene, desk); // 모델을 배치
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (scene.children.length > 0) {
        scene.rotation.y += 0.01; // 모든 모델이 함께 회전
      }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const getScaleForModel = (modelPath) => {
    for (const category in products) {
      const product = products[category].find(product => product.modelPath === modelPath);
      if (product) {
        return product.scale;
      }
    }
    return [1, 1, 1]; // 기본 스케일 값
  };

  const loadModels = (sceneState, scene, desk) => {
    const loader = new GLTFLoader();
    const deskBox = new THREE.Box3().setFromObject(desk);
    const deskHeight = deskBox.max.y;

    sceneState.forEach((modelData) => {
      loader.load(modelData.modelPath, (gltf) => {
        const model = gltf.scene;
        model.position.fromArray(modelData.position);
        model.rotation.fromArray(modelData.rotation);

        // 각 모델의 지정된 스케일을 적용
        model.scale.fromArray(modelData.scale);

        // 모델의 위치를 책상 위로 설정
        model.position.y = deskHeight + 0.02; // 책상 위에 모델을 배치
        model.userData = { modelPath: modelData.modelPath };

        scene.add(model);
      });
    });
  };

  const handleSave = () => {
    const currentSceneState = scene.children.map(child => ({
      modelPath: child.userData.modelPath,
      position: child.position.toArray(),
      rotation: child.rotation.toArray(),
      scale: child.scale.toArray()
    }));
    localStorage.setItem('sceneState', JSON.stringify(currentSceneState));
    if (onSave) {
      onSave();
    }
  };

  const handleShare = () => {
    const currentSceneState = scene.children.map(child => ({
      modelPath: child.userData.modelPath,
      position: child.position.toArray(),
      rotation: child.rotation.toArray(),
      scale: child.scale.toArray()
    }));
    localStorage.setItem('sceneState', JSON.stringify(currentSceneState));
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4" style={{ paddingBottom: '5px', height: '350px', padding: '32px 0 5px' }}>
      <div className="flex flex-col justify-center items-start">
        <p className="text-xl font-bold mb-2">Good! 훌륭한 데스크 입니다!</p>
        <div className="flex">
          <button onClick={handleSave} className="mr-2 px-4 py-2 border border-pink-500">저장</button>
          <button onClick={handleShare} className="px-4 py-2 border border-blue-500">공유</button>
        </div>
      </div>
      <div ref={mountRef} className="w-full" style={{ height: '100%' }}></div>
    </div>
  );
};

export default Head;
