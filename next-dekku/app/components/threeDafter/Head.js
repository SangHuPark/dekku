import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import products from '../threeD/ProductList'; // 각 모델의 스케일 값을 가져오기 위해 제품 리스트를 임포트
import SaveModal from './SaveModal'; // 모달 컴포넌트 임포트
import { useRouter } from 'next/navigation'; // useRouter를 import
import { useUploadToS3 } from './ThreedUpload'; // 파일 업로드 훅을 import
// import '../../styles/ThreeDAfter.css'; // 글래스 모피즘 스타일
import '../../styles/ThreeDafter.css'

const Head = ({ onSave }) => {
  const mountRef = useRef(null);
  const router = useRouter(); // useRouter 사용
  const { uploadToS3 } = useUploadToS3(); // S3 업로드 훅 사용
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [desk, setDesk] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = null; // 배경을 투명하게 설정
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(27, mount.clientWidth / mount.clientHeight, 0.01, 1000);
    camera.position.set(0, 5, 0); // 카메라를 더 가깝게 조정
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 30, 0);
    scene.add(directionalLight);

    const deskLoader = new GLTFLoader();
    deskLoader.load('threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;

      // 중심점 설정
      const box = new THREE.Box3().setFromObject(desk);
      const center = box.getCenter(new THREE.Vector3());
      desk.position.sub(center);

      // 위치 조정
      desk.position.set(0, -2.2, -1.5); // 모델을 더 아래로 이동
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
        camera.position.x = 6 * Math.cos(time); // 카메라 궤도를 더 좁게 조정
        camera.position.z = 6 * Math.sin(time) - 1.5; // 책상의 z 위치에 맞춤
        camera.lookAt(new THREE.Vector3(0, -1, -1.5)); // 책상의 위치로 바라봄
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

    sceneState.forEach((modelData) => {
      loader.load(modelData.modelPath, (gltf) => {
        const model = gltf.scene;
        model.position.fromArray(modelData.position);
        model.rotation.fromArray(modelData.rotation);
        model.scale.fromArray(modelData.scale);

        // 모델의 y 위치를 deskHeight를 기준으로 조정
        model.position.y = deskBox.min.y + modelData.position[1]; // 책상의 y 위치를 기준으로 모델의 y 위치를 조정
        model.position.z = modelData.position[2]; // 모델의 z 위치를 설정
        model.userData = { modelPath: modelData.modelPath };

        scene.add(model);
      });
    });
  };

  const handleSave = async () => {
    // 로컬 스토리지에서 씬 상태와 썸네일 가져오기
    const storedSceneState = localStorage.getItem('sceneState');
    const storedThumbnail = localStorage.getItem('thumbnail');

    if (!storedSceneState || !storedThumbnail) {
      console.error("No scene state or thumbnail found in localStorage.");
      return;
    }

    // 멤버 ID는 로그인 정보를 사용해 가져와야 합니다.
    const memberId = "MemberId"; // 실제 구현 시 수정

    try {
      const thumbnailUrl = await uploadToS3(storedSceneState, storedThumbnail, memberId);
      setImageUrl(thumbnailUrl);
      setIsModalOpen(true); // 모달 열기
    } catch (err) {
      console.error("Error during upload:", err);
    }
  };

  const handleShare = () => {
    router.push('/deskSetup/create');
  };
  

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4" style={{ paddingBottom: '24px', height: '350px', marginBottom: '32px', marginTop: '12px' }}>
      <div className="glass-container flex justify-between items-center p-4" style={{ height: '350px' }}>
        <div className="flex flex-col justify-center items-start">
          <p className="text-xl font-bold mb-2 ml-4">Good! 훌륭한 재능입니다!</p>
          <div className="flex items-center space-x-4 mt-6">
            <button onClick={handleSave} className="ml-10  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">저장</button>
            <button onClick={handleShare} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">공유</button>
          </div>
        </div>
        <img src="/손박수.png" alt="손박수" style={{ width: '270px', height: '270px' }} />
      </div>
      <div ref={mountRef} className="glass-container w-full" style={{ height: '100%', overflow: 'hidden' }}></div>

      <SaveModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          if (onSave) {
            onSave();
          }
        }} 
      />
    </div>
  );
};

export default Head;
