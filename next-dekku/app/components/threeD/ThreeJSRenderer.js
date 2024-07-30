import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';

const ThreeJSRenderer = ({ selectedProducts }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [deskHeight, setDeskHeight] = useState(0);
  const [models, setModels] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [activeModel, setActiveModel] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    setScene(scene);

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(20, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, -10);
    camera.lookAt(0, 0, 0);
    setCamera(camera);

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    const loader = new GLTFLoader();

    // Load Desk Model
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, 0);
      desk.scale.set(3, 3, 3);

      // 책상 모델의 높이 계산
      const box = new THREE.Box3().setFromObject(desk);
      const deskHeight = box.max.y - box.min.y;
      setDeskHeight(deskHeight);

      scene.add(desk);
    });

    selectedProducts.forEach((product, index) => {
      loader.load(product.modelPath, (gltf) => {
        const model = gltf.scene;
        const scale = product.scale || [1, 1, 1]; // 기본 스케일 적용
        console.log(`Loading model: ${product.modelPath} with scale: ${scale.join(',')}`);

        // 모델의 Y 위치를 책상 높이보다 0.01 위로 설정
        const yOffset = deskHeight + 0.01;
        model.position.set(0, yOffset, index * 1.5);
        model.scale.set(...scale); // scale 적용
        model.userData = { product }; // 제품 정보를 모델에 저장

        scene.add(model);
        setModels((prevModels) => [...prevModels, model]); // 모델 추가 후 상태 업데이트

        // BoundingBoxHelper 추가
        const boxHelper = new THREE.BoxHelper(model, 0xffff00);
        scene.add(boxHelper);
      }, undefined, (error) => {
        console.error(`An error happened while loading the model: ${product.modelPath}`, error);
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
  }, [selectedProducts, deskHeight]);

  useEffect(() => {
    if (scene && renderer && camera) {
      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update();
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [scene, renderer, camera]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {scene && camera && models.length > 0 && (
        <MouseControls
          camera={camera}
          models={models}
          setActiveModel={setActiveModel}
          controls={controlsRef.current}
          scene={scene}
        />
      )}
    </div>
  );
};

export default ThreeJSRenderer;
