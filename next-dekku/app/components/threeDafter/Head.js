import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import products from '../threeD/ProductList'; // 각 모델의 스케일 값을 가져오기 위해 제품 리스트를 임포트

const Head = ({ onSave, onShare }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [desk, setDesk] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(27, mount.clientWidth / mount.clientHeight, 0.01, 1000);
    camera.position.set(0, 4, 5); // 카메라를 더 가깝게 조정
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const deskLoader = new GLTFLoader();
    deskLoader.load('threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;

      // 중심점 설정
      const box = new THREE.Box3().setFromObject(desk);
      const center = box.getCenter(new THREE.Vector3());
      desk.position.sub(center);

      // 위치 조정
      desk.position.set(0, -3, -1.5); // 모델을 더 아래로 이동
      desk.scale.set(3, 3, 3); // 모델 크기를 키움
      scene.add(desk);
      setDesk(desk);

      const storedSceneState = localStorage.getItem('sceneState');
      if (storedSceneState) {
        const parsedState = JSON.parse(storedSceneState);
        loadModels(parsedState, scene, desk);
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (camera) {
        const time = Date.now() * 0.0005; // 회전 속도를 줄이기 위해 0.0005로 설정
        camera.position.x = 5 * Math.cos(time); // 카메라 궤도를 더 좁게 조정
        camera.position.z = 5 * Math.sin(time) - 1.5; // 책상의 z 위치에 맞춤
        camera.lookAt(new THREE.Vector3(0, -1.5, -1.5)); // 책상의 위치로 바라봄
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
    return [1, 1, 1];
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
        model.scale.fromArray(modelData.scale);

        model.position.y = deskHeight + 0.02;
        model.position.z = -1.5; // 모델의 z 위치를 책상과 맞춤
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
    <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4" style={{ paddingBottom: '60px', height: '350px', padding: '24px 0 60px' }}>
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
