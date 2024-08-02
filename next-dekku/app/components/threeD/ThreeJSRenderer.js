import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';
import TransformControls from './TransformControls';
import { v4 as uuidv4 } from 'uuid';

const ThreeJSRenderer = ({ selectedProducts }) => {
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

  // 모델의 위치와 스케일 저장
  const saveModelData = (models) => {
    const data = {};
    models.forEach(model => {
      data[model.userData.uniqueId] = {
        position: model.position.clone(),
        scale: model.scale.clone(),
        rotation: model.rotation.clone(),
      };
    });
    setModelData(data);
  };

  // 모델의 위치와 스케일 복원
  // const restoreModelData = (models) => {
  //   models.forEach(model => {
  //     const data = modelData[model.userData.uniqueId];
  //     if (data) {
  //       model.position.copy(data.position);
  //       model.scale.copy(data.scale);
  //       model.rotation.copy(data.rotation);
  //     }
  //   });
  // };

  // 씬 초기화
  useEffect(() => {
    const mount = mountRef.current;

    // 씬 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    setScene(scene);

    // 카메라 생성
    const camera = new THREE.PerspectiveCamera(20, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, -10);
    camera.lookAt(0, 0, 0);
    setCamera(camera);

    // 렌더러 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // 책상 모델 로드
    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, 0);
      desk.scale.set(3, 3, 3);

      // 책상 높이 계산 및 크기 저장
      const box = new THREE.Box3().setFromObject(desk);
      const deskHeight = box.max.y - box.min.y;
      const deskSize = { x: box.max.x - box.min.x, z: box.max.z - box.min.z };
      setDeskHeight(deskHeight);
      setDeskSize(deskSize);

      scene.add(desk);
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

  // 모델 로드
  useEffect(() => {
    if (scene) {
      const loader = new GLTFLoader();

      // 현재 모델의 고유 ID 목록
      const existingModelIds = models.map(model => model.userData.id);

      // 선택된 제품의 ID 목록
      const selectedProductIds = selectedProducts.map(product => product.id);

      // 새로운 모델 추가
      selectedProducts.forEach((product) => {
        if (!existingModelIds.includes(product.id)) {
          const uniqueId = uuidv4(); // 새로운 고유 ID 생성
          loader.load(product.modelPath, (gltf) => {
            const model = gltf.scene;
            const scale = product.scale || [1, 1, 1]; // 기본 스케일
            console.log(`Loading model: ${product.modelPath} with scale: ${scale.join(',')}`);
            console.log(`Assigned unique ID: ${uniqueId}`);

            // 모델을 특정 위치에 고정하여 생성 (예: 화면의 중심)
            const fixedPosition = { x: 0, y: deskHeight + 0.02, z: 0 };
            model.userData = { id: product.id, uniqueId, product }; // 고유 ID와 제품 정보 저장

            // 저장된 위치와 스케일 복원
            const data = modelData[uniqueId];
            if (data) {
              model.position.copy(data.position);
              model.scale.copy(data.scale);
              model.rotation.copy(data.rotation);
            } else {
              model.position.set(fixedPosition.x, fixedPosition.y, fixedPosition.z); // 특정 위치 설정
              model.scale.set(...scale);
            }

            setModels(prevModels => {
              const allModels = [...prevModels, model];
              saveModelData(allModels); // 모델 상태 저장
              return allModels;
            });

            scene.add(model);
          }, undefined, (error) => {
            console.error(`An error happened while loading the model: ${product.modelPath}`, error);
          });
        }
      });

      console.log(models);
      console.log(existingModelIds);
      console.log(selectedProducts);
      console.log(selectedProductIds);

      // 제거된 모델 처리
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

  const handleRotationChange = (rotationY) => {
    if (activeModel) {
      activeModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
    }
  };

  const handleHeightChange = (height) => {
    if (activeModel) {
      activeModel.position.y = parseFloat(height);
    }
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {scene && camera && (
        <>
          <MouseControls
            camera={camera}
            models={models}
            setActiveModel={(model) => {
              if (model && model.userData) {
                setModels(prevModels => {
                  const updatedModels = prevModels.map(m =>
                    m.userData.uniqueId === model.userData.uniqueId ? model : m
                  );
                  saveModelData(updatedModels); // 모델 상태 저장
                  return updatedModels;
                });
                setActiveModel(model);
              }
            }}
            controls={controlsRef.current}
            scene={scene}
            deskSize={deskSize} // 책상 크기를 전달
            deskHeight={deskHeight} // 책상 높이 전달
          />
          {activeModel && (
            <TransformControls
              activeModel={activeModel}
              onRotateChange={handleRotationChange}
              onHeightChange={handleHeightChange}
              minHeight={deskHeight + 0.01} // 최소 높이 설정
              step={1} // 높이 조절 단계 설정
            />
          )}
        </>
      )}
    </div>
  );
};

export default ThreeJSRenderer;
