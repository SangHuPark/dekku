"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const objects = [
  { name: "Car", modelPath: "/threedmodels/car_example.glb" },
  { name: "Speaker", modelPath: "/threedmodels/speaker_example.glb" },
  // 추가 오브젝트
];

const Page = () => {
  const [selectedObjects, setSelectedObjects] = useState([]); // 선택된 오브젝트 상태
  const [isBarOpen, setIsBarOpen] = useState(true); // 헤더바 펼치기/접기 상태
  const canvasRef = useRef(null); // 캔버스 참조
  const sceneRef = useRef(new THREE.Scene()); // Three.js 장면 참조
  const cameraRef = useRef(null); // 카메라 참조
  const rendererRef = useRef(null); // 렌더러 참조
  const controlsRef = useRef(null); // OrbitControls 참조
  const dragControlsRef = useRef(null); // 드래그 컨트롤 참조
  const gridHelperRef = useRef(null); // 그리드 헬퍼 참조
  const planeRef = useRef(null); // 평면 참조
  const deskRef = useRef(null); // 책상 모델 참조
  const loadedObjectsRef = useRef(new Map()); // 로딩된 오브젝트 참조
  const objectsArr = useRef([]); // 모든 오브젝트 참조

  // 헬퍼 함수: 선택된 물체를 장면에 추가
  const addPrimitive = (objectType, objectName, geometry, material) => {
    let mesh = new THREE.Mesh(geometry, material);
    let object = new THREE.Group();
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    object.add(mesh);

    // Ensure the object gets a unique name
    let highest = 0;
    for (let i = 0; i < objectsArr.current.length; i++) {
      const objCount = objectsArr.current.filter((obj) =>
        obj.name.startsWith(objectName)
      ).length;
      if (
        objectsArr.current[i].userData.objectName === objectName &&
        objCount >= highest
      ) {
        highest = objCount + 1;
      }
    }

    object.name = `${objectName}-${highest}`;
    object.userData.type = objectType;
    object.userData.objectName = objectName;

    objectsArr.current.push(object);
    sceneRef.current.add(object);

    return object;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 카메라 설정
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(10, 40, 60);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // 렌더러 설정
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xeeeeee);

      // 캔버스가 렌더러를 수용할 수 있는지 확인
      if (canvasRef.current) {
        canvasRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
      } else {
        console.error("Canvas reference is not set.");
      }

      const scene = sceneRef.current;

      // 조명 추가
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 20, 10).normalize();
      scene.add(directionalLight);

      // OrbitControls 설정
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
      controls.enablePan = true;
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controlsRef.current = controls;

      // 드래그 컨트롤 설정
      const dragControls = new DragControls(
        objectsArr.current,
        camera,
        renderer.domElement
      );
      dragControls.addEventListener(
        "dragstart",
        (event) => (controls.enabled = false)
      );
      dragControls.addEventListener(
        "dragend",
        (event) => (controls.enabled = true)
      );
      dragControlsRef.current = dragControls;

      // 애니메이션 루프
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // GLTFLoader를 사용하여 책상 모델 로드
      const loader = new GLTFLoader();
      loader.load("/threedmodels/ssafydesk.glb", (gltf) => {
        const desk = gltf.scene;
        desk.name = "Desk";
        scene.add(desk);
        deskRef.current = desk;

        // 책상 모델의 초기 크기와 위치 조정
        desk.scale.set(50, 50, 50);
        desk.position.set(0, -36.5, 0);

        // 그리드 추가
        const gridHelper = new THREE.GridHelper(50, 20);
        scene.add(gridHelper);
        gridHelperRef.current = gridHelper;

        // 평면 추가
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        geometry.rotateX(-Math.PI / 2);
        const plane = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({ visible: false })
        );
        scene.add(plane);
        planeRef.current = plane;
      });

      // 윈도우 리사이즈 이벤트 핸들러
      const handleResize = () => {
        if (rendererRef.current && cameraRef.current) {
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
        }
      };
      window.addEventListener("resize", handleResize);

      // 컴포넌트 언마운트 시 클린업
      return () => {
        window.removeEventListener("resize", handleResize);
        if (canvasRef.current && rendererRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  // 선택된 오브젝트가 변경될 때마다 호출되는 useEffect
  useEffect(() => {
    selectedObjects.forEach((obj) => {
      if (!loadedObjectsRef.current.has(obj.id)) {
        const loader = new GLTFLoader();
        loader.load(obj.modelPath, (gltf) => {
          const model = gltf.scene;
          model.name = obj.name;
          const group = new THREE.Group();
          group.add(model);
          group.userData.type = "GLTF";
          group.userData.objectName = obj.name;
          objectsArr.current.push(group);
          sceneRef.current.add(group);
          loadedObjectsRef.current.set(obj.id, group);
          dragControlsRef.current.transformGroup = true;
          dragControlsRef.current.objects = objectsArr.current;
        });
      }
    });
  }, [selectedObjects]);

  return (
    <div className="flex">
      <div className="w-48 p-4 bg-gray-100">
        <h3 className="text-lg font-bold mb-2">Object Selector</h3>
        <ul className="space-y-2">
          {objects.map((obj, index) => (
            <li
              key={index}
              onClick={() => {
                const id = Date.now(); // 각 오브젝트에 고유 ID 부여
                setSelectedObjects((prev) => [...prev, { ...obj, id }]);
              }}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex items-center space-x-4 overflow-x-auto">
          <h1 className="text-xl font-bold">3D Viewer</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsBarOpen((prev) => !prev)}
          >
            {isBarOpen ? "Hide Selected Objects" : "Show Selected Objects"}
          </button>
          {isBarOpen && (
            <div className="flex space-x-4 overflow-x-auto">
              {selectedObjects.map((obj, index) => (
                <div key={index} className="bg-gray-300 p-2 rounded">
                  {obj.name}
                </div>
              ))}
            </div>
          )}
        </header>
        <div ref={canvasRef} className="" />
      </div>
    </div>
  );
};

export default Page;
