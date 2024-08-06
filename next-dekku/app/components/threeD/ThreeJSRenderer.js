import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';
import TransformControls from './TransformControls';
import { v4 as uuidv4 } from 'uuid';

const ThreeJSRenderer = ({ selectedProducts, onComplete }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [deskHeight, setDeskHeight] = useState(0);
  const [deskSize, setDeskSize] = useState({ x: 0, z: 0 });
  const [models, setModels] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [modelData, setModelData] = useState({});
  const [activeModel, setActiveModel] = useState(null);

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
    console.log(data);
  };

  // 썸네일 캡처 및 로컬 스토리지에 저장
  const captureThumbnail = () => {
    renderer.render(scene, camera);
    const thumbnail = renderer.domElement.toDataURL('image/png');
    localStorage.setItem('thumbnail', thumbnail);
    return thumbnail;
  };

  const fetchModelData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch file from S3");
      }
      const data = await response.json();
      console.log("Fetched JSON data:", data); // JSON 데이터를 확인하는 로그 추가
      return data;
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  };

  // 저장된 모델 로드
  const loadModelsFromData = (data, scene, loader) => {
    data.forEach(modelData => {
      loader.load(modelData.modelPath, (gltf) => {
        const model = gltf.scene;
        model.position.fromArray(modelData.position);
        model.scale.fromArray(modelData.scale);
        model.rotation.fromArray(modelData.rotation);
        model.userData = {
          id: modelData.id,
          uniqueId: modelData.uniqueId,
          product: { modelPath: modelData.modelPath }
        };
        setModels(prevModels => [...prevModels, model]);
        scene.add(model);
        console.log("Model loaded and added to scene:", modelData); // 모델 로드 및 씬 추가 확인
      }, undefined, (error) => {
        console.error(`An error happened while loading the model: ${modelData.modelPath}`, error);
      });
    });
  };

  // 씬 초기화
  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(20, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, -10);
    camera.lookAt(0, 10, 0);
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, -1.5);
      desk.scale.set(3, 3, 3);

      const box = new THREE.Box3().setFromObject(desk);
      const deskHeight = box.max.y - box.min.y;
      const deskSize = { x: box.max.x - box.min.x, z: box.max.z - box.min.z };
      setDeskHeight(deskHeight);
      setDeskSize(deskSize);

      scene.add(desk);
      console.log("Desk model loaded and added to scene."); // 데스크 모델 로드 확인

      // JSON URL로부터 모델 데이터 로드
      const jsonUrl = 'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/1/2dae89d1-2d02-4497-b468-8e977af962b9';
      fetchModelData(jsonUrl).then(data => {
        loadModelsFromData(data, scene, loader);
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
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
            console.log("Selected product model loaded and added to scene:", product); // 선택된 제품 모델 로드 확인
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
          console.log("Removed model from scene:", model.userData.id); // 모델 제거 확인
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
    saveModelData();
    const thumbnail = captureThumbnail();
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    onComplete();
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
