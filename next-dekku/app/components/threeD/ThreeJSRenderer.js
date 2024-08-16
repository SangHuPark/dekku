"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MouseControls from "./MouseControls";
import TransformControls from "./TransformControls";
import selectedProducts from "./SelectedProducts";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const ThreeJSRenderer = ({
  selectedProducts,
  setSelectedProducts,
  onComplete,
  jsonUrl,
}) => {
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
  const [relatedPosts, setRelatedPosts] = useState([]);

  const saveModelData = () => {
    const data = models.map((model) => ({
      id: model.userData.id,
      uniqueId: model.userData.uniqueId,
      name: model.userData.product.name,
      description: model.userData.product.description,
      imageUrl: model.userData.product.imageUrl,
      modelPath: model.userData.product.modelPath,
      position: model.position.toArray(),
      scale: model.scale.toArray(),
      rotation: model.rotation.toArray(),
      price: model.userData.product.price,
      isFetched: model.userData.isFetched,
    }));
    localStorage.setItem("sceneState", JSON.stringify(data));
    console.log('tlqkf', models);
  };
  
  const captureThumbnail = () => {
    renderer.render(scene, camera);
    const canvas = renderer.domElement;
  
    // Create a smaller canvas for thumbnail
    const thumbnailCanvas = document.createElement('canvas');
    const ctx = thumbnailCanvas.getContext('2d');
    thumbnailCanvas.width = 200; // or any smaller size
    thumbnailCanvas.height = (200 / canvas.width) * canvas.height;
    ctx.drawImage(canvas, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
  
    const thumbnail = thumbnailCanvas.toDataURL('image/jpeg', 0.7); // Reduce quality
    localStorage.setItem("thumbnail", thumbnail);
    return thumbnail;
  };

  const loadModelsFromData = (data, scene, loader, setSelectedProducts) => {
    data.forEach((modelData) => {
      loader.load(
        modelData.modelPath,
        (gltf) => {
          const model = gltf.scene;
          if (modelData.position && modelData.scale && modelData.rotation) {
            model.position.fromArray(modelData.position);
            model.scale.fromArray(modelData.scale);
            model.rotation.fromArray(modelData.rotation);
          } else {
            model.position.set(deskCenter.x, deskHeight, deskCenter.z); // 모델을 책상 중앙에 배치
            model.scale.set(1, 1, 1);
          }

          model.userData = {
            id: modelData.id,
            uniqueId: modelData.uniqueId || uuidv4(),
            product: {
              ...modelData,
              imageUrl: modelData.imageUrl
            },
            isFetched: true,
          };
          console.log(modelData)
          // 그림자 설정
          model.castShadow = true;
          model.receiveShadow = true;
          
          setModels((prevModels) => [...prevModels, model]);
          setSelectedProducts((prevProducts) => [
            ...prevProducts,
            {
              id: modelData.id,
              name: modelData.name,
              description: modelData.description,
              imageUrl: modelData.imageUrl,
              modelPath: modelData.modelPath,
              scale: modelData.scale,
              uniqueId: modelData.uniqueId || uuidv4(),
              position: modelData.position,
              rotation: modelData.rotation,
              price: modelData.price,
              isFetched: true,
            },
          ]);
          scene.add(model);
          console.log("Model loaded and added to scene:", modelData);
        },
        undefined,
        (error) => {
          console.error(
            `An error happened while loading the model: ${modelData.modelPath}`,
            error
          );
        }
      );
    });
  };

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(
      20,
      (window.innerWidth - 543.5) / window.innerHeight,
      0.1,
      1000
    );
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 543.5, window.innerHeight);
    renderer.shadowMap.enabled = true; // 그림자 활성화
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // Ambient Light: 장면 전체를 부드럽게 밝히는 기본 조명
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    // Directional Light: 방과 책상 전체를 비추는 방향성 있는 빛
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
    directionalLight.position.set(30, 30, -30); // 왼쪽 대각선에서 오른쪽 대각선으로 빛을 비추도록 위치 조정
    directionalLight.target.position.set(0, 0, -1.5); // 책상 중심을 향하게 설정
    directionalLight.castShadow = true; // 그림자 생성 활성화
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    const loader = new GLTFLoader();
    loader.load("/threedmodels/ssafydesk.glb", (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, -1.5);
      desk.scale.set(3, 3, 3);
      desk.castShadow = true; // 그림자를 드리움
      desk.receiveShadow = true; // 그림자를 받음

      const deskBox = new THREE.Box3().setFromObject(desk);
      setDeskHeight(deskBox.max.y);
      setDeskCenter(deskBox.getCenter(new THREE.Vector3()));

      scene.add(desk);

      // 카메라 위치를 책상의 중심으로 설정
      camera.position.set(deskCenter.x, deskCenter.y + 15, deskCenter.z - 10);
      camera.lookAt(deskCenter.x, deskCenter.y, deskCenter.z);

      // Load the room model and position it
      loader.load("/threedmodels/ssafyroom.glb", (roomGltf) => {
        const room = roomGltf.scene;
        room.scale.set(3, 3, 3);
        room.position.set(0, 0, -1.5);
        room.receiveShadow = true; // 방이 그림자를 받도록 설정
        scene.add(room);

        // 로그인 후 복원 시 사용될 로컬스토리지의 sceneState 데이터 로드
        const savedSceneState = localStorage.getItem("sceneState");
        if (savedSceneState) {
          const savedData = JSON.parse(savedSceneState);
          loadModelsFromData(savedData, scene, loader, setSelectedProducts);
        } else if (jsonUrl) {
          fetchModelData(jsonUrl).then((data) => {
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
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0; // 바닥의 높이를 맞추기
    plane.receiveShadow = true; // 바닥이 그림자를 받도록 설정
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(deskCenter.x, deskCenter.y, deskCenter.z); // OrbitControls의 타겟을 책상의 중심으로 설정
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 화면 크기 변경 시, 너비를 다시 계산하여 renderer 크기 업데이트
    const handleResize = () => {
      const width = window.innerWidth - 543.5;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
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
      const existingModelUniqueIds = models.map(
        (model) => model.userData.uniqueId
      );
      const selectedProductUniqueIds = selectedProducts.map(
        (product) => product.uniqueId
      );

      selectedProducts.forEach((product) => {
        if (!existingModelUniqueIds.includes(product.uniqueId)) {
          if (product.modelPath) {
            loader.load(
              product.modelPath,
              (gltf) => {
                const model = gltf.scene;

                // scale 값이 배열 형태로 들어온 것을 확인하였으므로, 그대로 적용합니다.
                model.scale.fromArray(product.scale || [1, 1, 1]); // scale 값 설정

                if (product.position) {
                  model.position.fromArray(product.position);
                } else {
                  model.position.set(deskCenter.x, deskHeight, deskCenter.z); // 기본 위치를 책상 중앙으로 설정
                }

                model.userData = {
                  id: product.id,
                  uniqueId: product.uniqueId,
                  product,
                  isFetched: product.isFetched || false,
                };

                // 그림자 설정
                model.castShadow = true;
                model.receiveShadow = true;

                setModels((prevModels) => [...prevModels, model]);
                scene.add(model);
                console.log(
                  "Selected product model loaded and added to scene:",
                  product
                );
              },
              undefined,
              (error) => {
                console.error(
                  `An error happened while loading the model: ${product.modelPath}`,
                  error
                );
              }
            );
          } else {
            console.error(
              "Product modelPath is undefined for product:",
              product
            );
          }
        }
      });

      models.forEach((model) => {
        if (!selectedProductUniqueIds.includes(model.userData.uniqueId)) {
          scene.remove(model);
          setModels((prevModels) =>
            prevModels.filter(
              (m) => m.userData.uniqueId !== model.userData.uniqueId
            )
          );
          console.log("Removed model from scene:", model.userData.uniqueId);
        }
      });
    }
  }, [selectedProducts, scene, deskHeight]);

  const handleRotationChange = (rotationY) => {
    if (activeModel) {
      activeModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
      setSelectedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.uniqueId === activeModel.userData.uniqueId
            ? { ...product, rotation: activeModel.rotation.toArray() }
            : product
        )
      );
    }
  };

  const handleHeightChange = (height) => {
    if (activeModel) {
      activeModel.position.y = parseFloat(height);
      setSelectedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.uniqueId === activeModel.userData.uniqueId
            ? { ...product, position: activeModel.position.toArray() }
            : product
        )
      );
    }
  };

  const handleCloseTransformControls = () => {
    setActiveModel(null);
  };

  const handleComplete = async () => {
    saveModelData();
    const thumbnail = captureThumbnail();
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  
    const sceneState = JSON.parse(localStorage.getItem("sceneState")) || [];
    const sceneStateIds = sceneState.map((item) => item.id);
  
    localStorage.setItem("sceneStateIds", JSON.stringify(sceneStateIds));
  
    console.log('IDs stored in sceneStateIds:', sceneStateIds);
  
    try {
        const response = await fetch('http://localhost:8080/api/products/related-posts', {  // Replace with actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: sceneStateIds }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the response as JSON
      console.log('Related posts:', data);
  
      setRelatedPosts(data);

    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  
    onComplete();
  };

  const recommendedPosts = JSON.parse(localStorage.getItem("recommendedPosts"));
  if (recommendedPosts) {
    console.log('Loaded recommended posts:', recommendedPosts);
  }

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {scene && camera && (
        <>
          <MouseControls
            camera={camera}
            models={models}
            setActiveModel={(model) => {
              if (model && model.userData) {
                setModels((prevModels) =>
                  prevModels.map((m) =>
                    m.userData.uniqueId === model.userData.uniqueId ? model : m
                  )
                );
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
