import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import products from '../threeD/ProductList'; // 각 모델의 스케일 값을 가져오기 위해 제품 리스트를 임포트
import SaveModal from './SaveModal'; // 모달 컴포넌트 임포트
import '../../styles/ThreeDafter.css'; // 글래스 모피즘 스타일

const Head = ({ onSave, onShare }) => {
  const mountRef = useRef(null);
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
    camera.position.set(0, 4, 5); // 카메라를 더 가깝게 조정
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

    // Presigned URL 생성 요청
    let presignedUrl;
    try {
      const presignedResponse = await fetch("http://localhost:8080/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "memberId", // 고유 식별자. 필요에 따라 변경하세요. 로그인 정보에서 유저아이디 가져와서 보내기
          fileCount: 1,  // 씬 상태와 썸네일, 두 개의 파일 업로드
          directory: "3d"
        })
      });

      if (!presignedResponse.ok) {
        const errorMessage = await presignedResponse.text();
        console.error("Error:", errorMessage);
        throw new Error(errorMessage);
      }

      const presignedData = await presignedResponse.json();
      presignedUrl = presignedData.data.preSignedUrl;

      console.log("Presigned URLs:", presignedUrl);
    } catch (error) {
      console.error("Failed to fetch presigned URL:", error);
      return;
    }

    // S3에 파일 업로드
    try {
      const sceneStateBlob = new Blob([storedSceneState], { type: 'application/json' });
      const thumbnailBlob = new Blob([storedThumbnail.split(',')[1]], { type: 'image/png' }); // 썸네일 데이터 처리

      const uploadSceneResponse = await fetch(presignedUrl[0], {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json'
        },
        body: sceneStateBlob
      });

      if (!uploadSceneResponse.ok) {
        const errorMessage = await uploadSceneResponse.text();
        console.error("Error uploading scene state:", errorMessage);
        throw new Error(errorMessage);
      }

      const uploadThumbnailResponse = await fetch(presignedUrl[1], {
        method: "PUT",
        headers: {
          "Content-Type": 'image/png'
        },
        body: thumbnailBlob
      });

      if (!uploadThumbnailResponse.ok) {
        const errorMessage = await uploadThumbnailResponse.text();
        console.error("Error uploading thumbnail:", errorMessage);
        throw new Error(errorMessage);
      }

      const uploadedFileUrls = presignedUrl.map(url => url.split("?")[0]);
      console.log("Uploaded file URLs:", uploadedFileUrls);

      // 업로드된 파일 URL 사용
      setImageUrl(uploadedFileUrls[1]); // 썸네일 URL을 설정

      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("Failed to upload files:", error);
      return;
    }
  };

  const handleShare = async () => {
    await handleSave();
    if (onShare) {
      onShare(imageUrl);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4" style={{ paddingBottom: '24px', height: '350px', marginBottom: '32px', marginTop: '12px' }}>
    <div className="glass-container flex justify-between items-center p-4" style={{ height: '350px' }}>
      <div className="flex flex-col justify-center items-start">
        <p className="text-xl font-bold mb-2">Good! 훌륭한 데스크 입니다!</p>
        <div className="flex items-center space-x-4 mt-6">
          <button onClick={handleSave} className="ml-10 mr-2 px-4 py-2 border border-pink-500">저장</button>
          <button onClick={handleShare} className="px-4 py-2 border border-blue-500">공유</button>
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
