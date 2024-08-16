"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MouseControls from "./MouseControls";
import TransformControls from "./TransformControls";
import { v4 as uuidv4 } from "uuid";

// 모델 데이터를 fetch하는 함수
const fetchModelData = async (jsonUrl) => {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch model data from ${jsonUrl}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching model data:", error);
    return null;
  }
};

const ThreeJSRenderer = ({
  jsonUrl,
}) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [deskHeight, setDeskHeight] = useState(0);
  const [deskSize, setDeskSize] = useState({ x: 0, z: 0 });
  const [models, setModels] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [deskCenter, setDeskCenter] = useState(new THREE.Vector3());
  const [selectedProducts, setSelectedProducts] = useState([]); // 상태로 selectedProducts 추가

  const loadModelsFromData = (data, scene, loader) => {
    data.forEach((modelData) => {
      loader.load(
        modelData.modelPath,
        (gltf) => {
          const model = gltf.scene;
          if (modelData.position && modelData.scale && modelData.rotation) {
            // "XYZ"를 제거하고 3개의 rotation 값만 사용
            const rotation = modelData.rotation.slice(0, 3);
            model.position.fromArray(modelData.position);
            model.scale.fromArray(modelData.scale);
            model.rotation.fromArray(rotation); // 수정된 rotation 값 적용
          } else {
            model.position.set(deskCenter.x, deskHeight, deskCenter.z);
            model.scale.set(1, 1, 1);
          }
          model.userData = {
            id: modelData.id,
            uniqueId: modelData.uniqueId || uuidv4(),
            product: { ...modelData, imageUrl: modelData.imageUrl },
            isFetched: true,
          };
          model.castShadow = true;
          model.receiveShadow = true;
          setModels((prevModels) => [...prevModels, model]);
          setSelectedProducts((prevProducts) => [
            ...prevProducts,
            { ...modelData, uniqueId: modelData.uniqueId || uuidv4() },
          ]);
          scene.add(model);
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
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
    directionalLight.position.set(30, 30, -30);
    directionalLight.target.position.set(0, 0, -1.5);
    directionalLight.castShadow = true;
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
      desk.castShadow = true;
      desk.receiveShadow = true;

      const deskBox = new THREE.Box3().setFromObject(desk);
      setDeskHeight(deskBox.max.y);
      setDeskCenter(deskBox.getCenter(new THREE.Vector3()));

      scene.add(desk);
      camera.position.set(deskCenter.x, deskCenter.y + 15, deskCenter.z - 10);
      camera.lookAt(deskCenter.x, deskCenter.y, deskCenter.z);

      loader.load("/threedmodels/ssafyroom.glb", (roomGltf) => {
        const room = roomGltf.scene;
        room.scale.set(3, 3, 3);
        room.position.set(0, 0, -1.5);
        room.receiveShadow = true;
        scene.add(room);

        // jsonUrl에서 모델 데이터 로드
        if (jsonUrl) {
          console.log("Loading 3D model with JSON URL:", jsonUrl);
          fetchModelData(jsonUrl).then((data) => {
            if (data) {
              loadModelsFromData(data, scene, loader);
            } else {
              console.log("No data loaded from JSON URL.");
            }
          });
        }
      });
    });

    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(deskCenter.x, deskCenter.y, deskCenter.z);
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

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
    const clearScene = () => {
      models.forEach((model) => scene.remove(model));
      setModels([]);
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
                model.scale.fromArray(product.scale || [1, 1, 1]);
                if (product.position) {
                  model.position.fromArray(product.position);
                } else {
                  model.position.set(deskCenter.x, deskHeight, deskCenter.z);
                }

                model.userData = {
                  id: product.id,
                  uniqueId: product.uniqueId,
                  product,
                  isFetched: product.isFetched || false,
                };

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
        </>
      )}
    </div>
  );
};

export default ThreeJSRenderer;
