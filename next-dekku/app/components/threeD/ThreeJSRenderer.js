import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';
import TransformControls from './TransformControls';
import { v4 as uuidv4 } from 'uuid';

const ThreeJSRenderer = ({ selectedProducts, onComplete }) => {
  const mountRef = useRef(null); // 3D 씬을 마운트할 DOM 요소 참조
  const controlsRef = useRef(null); // OrbitControls 참조
  const [deskHeight, setDeskHeight] = useState(0); // 책상 높이 상태
  const [deskSize, setDeskSize] = useState({ x: 0, z: 0 }); // 책상 크기 상태
  const [models, setModels] = useState([]); // 현재 씬에 있는 모델들 상태
  const [scene, setScene] = useState(null); // 3D 씬 상태
  const [camera, setCamera] = useState(null); // 카메라 상태
  const [renderer, setRenderer] = useState(null); // 렌더러 상태
  const [modelData, setModelData] = useState({}); // 모델 데이터 상태
  const [activeModel, setActiveModel] = useState(null); // 현재 활성화된 모델 상태

  // 로컬 스토리지에서 모델 데이터 복원
  const restoreModelData = (scene) => {
    const storedData = localStorage.getItem('sceneState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (!Array.isArray(parsedData)) {
        console.error('Invalid sceneState data:', parsedData);
        return;
      }

      const loader = new GLTFLoader();
      parsedData.forEach(data => {
        if (!data.modelPath) {
          console.error('Missing modelPath in data:', data);
          return;
        }
        loader.load(data.modelPath, (gltf) => {
          const model = gltf.scene;
          model.position.fromArray(data.position || [0, 0, 0]);
          model.scale.fromArray(data.scale || [1, 1, 1]);
          model.rotation.fromArray(data.rotation || [0, 0, 0]);
          model.userData = { id: data.id, uniqueId: data.uniqueId, product: { modelPath: data.modelPath } };

          setModels(prevModels => [...prevModels, model]);
          scene.add(model);
        }, undefined, (error) => {
          console.error('Error loading model:', data.modelPath, error);
        });
      });
    }
  };

  // 모델의 위치와 스케일을 로컬 스토리지에 저장
  const saveModelData = () => {
    const data = models.map(model => ({
      id: model.userData.id,
      uniqueId: model.userData.uniqueId,
      position: model.position.toArray(),
      scale: model.scale.toArray(),
      rotation: model.rotation.toArray(),
      modelPath: model.userData.product.modelPath,
    }));
    localStorage.setItem('sceneState', JSON.stringify(data));
  };

  // 썸네일 캡처 및 로컬 스토리지에 저장
  const captureThumbnail = () => {
    renderer.render(scene, camera); // 씬을 렌더링
    const thumbnail = renderer.domElement.toDataURL('image/png'); // 썸네일을 데이터 URL로 변환
    localStorage.setItem('thumbnail', thumbnail); // 로컬 스토리지에 썸네일 저장
    return thumbnail;
  };

  // 씬 초기화
  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd); // 배경색 설정
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(20, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, -10); // 카메라 위치 설정
    camera.lookAt(0, 10, 0); // 카메라가 바라볼 위치 설정
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight); // 렌더러 크기 설정
    mount.appendChild(renderer.domElement); // 렌더러 DOM 요소 추가
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 10); // 주변광 설정
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 방향성 조명 설정
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, -1.5); // 책상 위치 설정
      desk.scale.set(3, 3, 3); // 책상 크기 설정

      const box = new THREE.Box3().setFromObject(desk);
      const deskHeight = box.max.y - box.min.y; // 책상 높이 계산
      const deskSize = { x: box.max.x - box.min.x, z: box.max.z - box.min.z }; // 책상 크기 계산
      setDeskHeight(deskHeight);
      setDeskSize(deskSize);

      scene.add(desk); // 씬에 책상 추가
    });

    restoreModelData(scene); // 로컬 스토리지에서 모델 데이터 복원

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // 컨트롤 업데이트
      renderer.render(scene, camera); // 씬 렌더링
    };

    animate(); // 애니메이션 시작

    return () => {
      mount.removeChild(renderer.domElement); // 컴포넌트 언마운트 시 렌더러 DOM 요소 제거
    };
  }, []);

  // 선택된 제품 목록이 변경될 때마다 모델 로드
  useEffect(() => {
    if (scene) {
      const loader = new GLTFLoader();
      const existingModelIds = models.map(model => model.userData.id);
      const selectedProductIds = selectedProducts.map(product => product.id);

      // 새로운 모델 추가
      selectedProducts.forEach((product) => {
        if (!existingModelIds.includes(product.id)) {
          const uniqueId = uuidv4();
          loader.load(product.modelPath, (gltf) => {
            const model = gltf.scene;
            const scale = product.scale || [1, 1, 1];
            const fixedPosition = { x: 0, y: deskHeight + 0.02, z: -1.5 };
            model.userData = { id: product.id, uniqueId, product };

            const data = modelData[uniqueId];
            if (data) {
              model.position.copy(data.position);
              model.scale.copy(data.scale);
              model.rotation.copy(data.rotation);
            } else {
              model.position.set(fixedPosition.x, fixedPosition.y, fixedPosition.z);
              model.scale.set(...scale);
            }

            setModels(prevModels => [...prevModels, model]);
            scene.add(model);
          }, undefined, (error) => {
            console.error(`An error happened while loading the model: ${product.modelPath}`, error);
          });
        }
      });

      // 제거된 모델 삭제
      models.forEach((model) => {
        if (!selectedProductIds.includes(model.userData.id)) {
          scene.remove(model);
          setModels(prevModels => prevModels.filter(m => m.userData.id !== model.userData.id));
        }
      });
    }
  }, [selectedProducts, scene, deskHeight]);

  // 윈도우 리사이즈 핸들러
  useEffect(() => {
    const handleWindowResize = () => {
      if (camera && renderer) {
        const { clientWidth, clientHeight } = mountRef.current;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [camera, renderer]);

  // 모델 회전 변경 핸들러
  const handleRotationChange = (rotationY) => {
    if (activeModel) {
      activeModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
    }
  };

  // 모델 높이 변경 핸들러
  const handleHeightChange = (height) => {
    if (activeModel) {
      activeModel.position.y = parseFloat(height);
    }
  };

  // TransformControls 닫기 핸들러
  const handleCloseTransformControls = () => {
    setActiveModel(null);
  };

  // 완성 버튼 클릭 핸들러
  const handleComplete = () => {
    saveModelData(); // 모델 데이터 저장
    const thumbnail = captureThumbnail(); // 썸네일 캡처
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts)); // 선택한 제품 목록 저장
    onComplete(); // 부모 컴포넌트로 알림
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {scene && camera && (
        <>
          <MouseControls
            camera={camera}
            models={models}
            setActiveModel={(model) => {
              if (model && model.userData) {
                setModels(prevModels => prevModels.map(m =>
                  m.userData.uniqueId === model.userData.uniqueId ? model : m
                ));
                setActiveModel(model);
              }
            }}
            controls={controlsRef.current}
            scene={scene}
            deskSize={deskSize}
            deskHeight={deskHeight}
          />
          {activeModel && (
            <TransformControls
              activeModel={activeModel}
              onRotateChange={handleRotationChange}
              onHeightChange={handleHeightChange}
              onClose={handleCloseTransformControls}
            />
          )}
          <button
            className="bg-cyan-800 text-white px-10 py-4 rounded mt-2 fixed bottom-10 right-10 text-lg"
            onClick={handleComplete}
            style={{ zIndex: 10 }}
          >
            완성하기
          </button>
        </>
      )}
    </div>
  );
};

export default ThreeJSRenderer;
