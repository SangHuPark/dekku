'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';
import TransformControls from './TransformControls';
import SelectedProducts from './SelectedProducts';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const ThreeJSRenderer = ({ selectedProducts, setSelectedProducts, onComplete, jsonUrl }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const router = useRouter();
  const [deskHeight, setDeskHeight] = useState(0);
  const [deskSize, setDeskSize] = useState({ x: 0, z: 0 });
  const [models, setModels] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [deskCenter, setDeskCenter] = useState(new THREE.Vector3());

  const saveModelData = () => {
    const data = models.map(model => ({
      id: model.userData.id,
      uniqueId: model.userData.uniqueId,
      name: model.userData.product.name,
      description: model.userData.product.description,
      image: model.userData.product.image,
      modelPath: model.userData.product.modelPath,
      position: model.position.toArray(),
      scale: model.scale.toArray(),
      rotation: model.rotation.toArray(),
      price: model.userData.product.price,
      isFetched: model.userData.isFetched,
    }));
    localStorage.setItem('sceneState', JSON.stringify(data));
    console.log(data);
  };

  const captureThumbnail = () => {
    renderer.render(scene, camera);
    const thumbnail = renderer.domElement.toDataURL('image/png');
    localStorage.setItem('thumbnail', thumbnail);
    return thumbnail;
  };

  const loadModelsFromData = (data, scene, loader, setSelectedProducts) => {
    data.forEach(modelData => {
      loader.load(modelData.modelPath, (gltf) => {
        const model = gltf.scene;
        if (modelData.position && modelData.scale && modelData.rotation) {
          model.position.fromArray(modelData.position);
          model.scale.fromArray(modelData.scale);
          model.rotation.fromArray(modelData.rotation);
        } else {
          model.position.set(deskCenter.x, deskHeight, deskCenter.z);  // 모델을 책상 중앙에 배치
          model.scale.set(1, 1, 1);
        }
        model.userData = {
          id: modelData.id,
          uniqueId: modelData.uniqueId || uuidv4(),
          product: modelData,
          isFetched: true,
        };
        
        // 그림자 설정
        model.castShadow = true;
        model.receiveShadow = true;

        setModels(prevModels => [...prevModels, model]);
        setSelectedProducts(prevProducts => [...prevProducts, {
          id: modelData.id,
          name: modelData.name,
          description: modelData.description,
          image: modelData.image,
          modelPath: modelData.modelPath,
          scale: modelData.scale,
          uniqueId: modelData.uniqueId || uuidv4(),
          position: modelData.position,
          rotation: modelData.rotation,
          price: modelData.price,
          isFetched: true,
        }]);
        scene.add(model);
        console.log("Model loaded and added to scene:", modelData);
      }, undefined, (error) => {
        console.error(`An error happened while loading the model: ${modelData.modelPath}`, error);
      });
    });
  };

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
    renderer.shadowMap.enabled = true;  // 그림자 활성화
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // Ambient Light: 장면 전체를 부드럽게 밝히는 기본 조명
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    // Directional Light: 방과 책상 전체를 비추는 방향성 있는 빛
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
    directionalLight.position.set(30, 30, -30);  // 왼쪽 대각선에서 오른쪽 대각선으로 빛을 비추도록 위치 조정
    directionalLight.target.position.set(0, 0, -1.5); // 책상 중심을 향하게 설정
    directionalLight.castShadow = true; // 그림자 생성 활성화
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    // 조명의 위치를 나타내는 구체 추가
    const lightSphereGeometry = new THREE.SphereGeometry(5, 10, 8); // 구체의 크기 조정 가능
    const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // 노란색 구체로 조명 표시
    const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
    lightSphere.position.copy(directionalLight.position); // 조명의 위치와 동일하게 설정
    scene.add(lightSphere);


    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, -1.5);
      desk.scale.set(3, 3, 3);
      desk.castShadow = true;  // 그림자를 드리움
      desk.receiveShadow = true;  // 그림자를 받음

      const deskBox = new THREE.Box3().setFromObject(desk);
      setDeskHeight(deskBox.max.y);
      setDeskCenter(deskBox.getCenter(new THREE.Vector3()));

      scene.add(desk);

      // Load the room model and position it
      loader.load('/threedmodels/ssafyroom.glb', (roomGltf) => {
        const room = roomGltf.scene;
        room.scale.set(3, 3, 3);
        room.position.set(0, 0, -1.5);
        room.receiveShadow = true;  // 방이 그림자를 받도록 설정
        scene.add(room);

        // 로그인 후 복원 시 사용될 로컬스토리지의 sceneState 데이터 로드
        const savedSceneState = localStorage.getItem('sceneState');
        if (savedSceneState) {
          const savedData = JSON.parse(savedSceneState);
          loadModelsFromData(savedData, scene, loader, setSelectedProducts);
        } else if (jsonUrl) {
          fetchModelData(jsonUrl).then(data => {
            if (data) {
              loadModelsFromData(data, scene, loader, setSelectedProducts);
            }
          });
        }
      });
    });

    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = 0;  // 바닥의 높이를 맞추기
    plane.receiveShadow = true;  // 바닥이 그림자를 받도록 설정
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [jsonUrl]);

    useEffect(() => {
      // 씬 초기화 로직 추가
      const clearScene = () => {
      models.forEach((model) => scene.remove(model));
      setModels([]); // 기존 모델 상태 초기화
    };

    if (scene) {
      const loader = new GLTFLoader();
      const existingModelUniqueIds = models.map(model => model.userData.uniqueId);
      const selectedProductUniqueIds = selectedProducts.map(product => product.uniqueId);

      selectedProducts.forEach((product) => {
        if (!existingModelUniqueIds.includes(product.uniqueId)) {
          loader.load(product.modelPath, (gltf) => {
            const model = gltf.scene;
            const scale = product.scale || [1, 1, 1];
            model.userData = { id: product.id, uniqueId: product.uniqueId, product, isFetched: product.isFetched || false };

            if (product.position && product.scale && product.rotation) {
              model.position.fromArray(product.position);
              model.scale.fromArray(product.scale);
              model.rotation.fromArray(product.rotation);
            } else {
              model.position.set(deskCenter.x, deskHeight, deskCenter.z); // 책상 중앙에 배치
              model.scale.set(...scale);
            }

            // 그림자 설정
            model.castShadow = true;
            model.receiveShadow = true;

            setModels(prevModels => [...prevModels, model]);
            scene.add(model);
            console.log("Selected product model loaded and added to scene:", product);
          }, undefined, (error) => {
            console.error(`An error happened while loading the model: ${product.modelPath}`, error);
          });
        }
      });

      models.forEach((model) => {
        if (!selectedProductUniqueIds.includes(model.userData.uniqueId)) {
          scene.remove(model);
          setModels(prevModels => prevModels.filter(m => m.userData.uniqueId !== model.userData.uniqueId));
          console.log("Removed model from scene:", model.userData.uniqueId);
        }
      });
    }
  }, [selectedProducts, scene, deskHeight]);

  const handleRotationChange = (rotationY) => {
    if (activeModel) {
      activeModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
      setSelectedProducts(prevProducts => prevProducts.map(product =>
        product.uniqueId === activeModel.userData.uniqueId
          ? { ...product, rotation: activeModel.rotation.toArray() }
          : product
      ));
    }
  };

  const handleHeightChange = (height) => {
    if (activeModel) {
      activeModel.position.y = parseFloat(height);
      setSelectedProducts(prevProducts => prevProducts.map(product =>
        product.uniqueId === activeModel.userData.uniqueId
          ? { ...product, position: activeModel.position.toArray() }
          : product
      ));
    }
  };

  const handleCloseTransformControls = () => {
    setActiveModel(null);
  };

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
          <SelectedProducts 
            selectedProducts={selectedProducts} 
            removeProduct={(uniqueId) => {
              console.log('removeProduct called in ThreeJSRenderer with uniqueId:', uniqueId);
              setSelectedProducts(prevProducts => prevProducts.filter(product => product.uniqueId !== uniqueId));
            }} 
          />
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
