"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const objects = [
  { name: "Cube", geometry: new THREE.BoxGeometry(), color: 0x00ff00 },
  { name: "Sphere", geometry: new THREE.SphereGeometry(), color: 0x0000ff },
  // 추가 오브젝트
];

const Page = () => {
  const [selectedObject, setSelectedObject] = useState(null); // 선택된 오브젝트 상태
  const canvasRef = useRef(null); // 캔버스 참조
  const sceneRef = useRef(new THREE.Scene()); // Three.js 장면 참조
  const cameraRef = useRef(null); // 카메라 참조 (useEffect에서 초기화)
  const rendererRef = useRef(null); // 렌더러 참조 (useEffect에서 초기화)
  const controlsRef = useRef(null); // OrbitControls 참조
  const dragControlsRef = useRef(null); // 드래그 컨트롤 참조
  const gridHelperRef = useRef(null); // 그리드 헬퍼 참조
  const planeRef = useRef(null); // 평면 참조
  const deskRef = useRef(null); // 책상 모델 참조

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 카메라 설정
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(10, 40, 60); // 카메라 위치 조정
      camera.lookAt(0, 0, 0); // 카메라가 그리드 중심을 바라보도록 설정
      cameraRef.current = camera;

      // 렌더러 설정
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xeeeeee); // 배경색 설정
      canvasRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const scene = sceneRef.current;

      // OrbitControls 설정
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0); // 카메라의 중심점을 (0, 0, 0)으로 설정
      controls.update();
      controls.enablePan = true; // 팬 활성화
      controls.enableDamping = true; // 댐핑 활성화
      controls.dampingFactor = 0.25; // 댐핑 계수
      controlsRef.current = controls;

      // 애니메이션 루프
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // OrbitControls 업데이트
        renderer.render(scene, camera);
      };

      animate();

      // GLTFLoader를 사용하여 책상 모델 로드
      const loader = new GLTFLoader();
      loader.load("/threedmodels/ssafydesk.glb", (gltf) => {
        const desk = gltf.scene;
        desk.name = "Desk"; // 모델의 이름 설정
        scene.add(desk);
        deskRef.current = desk;

        // 책상 모델의 초기 크기와 위치 조정
        desk.scale.set(50, 50, 50); // 책상 크기 설정 (기본값: 1, 1, 1)
        desk.position.set(0, -36.5, 0); // 책상 위치 설정 (기본값: (0, 0, 0))

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
      window.addEventListener("resize", () => {
        if (rendererRef.current && cameraRef.current) {
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
        }
      });

      // 컴포넌트 언마운트 시 클린업
      return () => {
        window.removeEventListener("resize", () => {});
        if (canvasRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (selectedObject && cameraRef.current && rendererRef.current) {
      // 선택된 오브젝트의 지오메트리와 색상 가져오기
      const { geometry, color } = selectedObject;
      const material = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);

      const scene = sceneRef.current;
      // scene.clear(); // 장면 초기화 대신, 기존 오브젝트 제거
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // 그리드와 평면을 다시 추가
      if (gridHelperRef.current) {
        scene.add(gridHelperRef.current);
      }
      if (planeRef.current) {
        scene.add(planeRef.current);
      }
      if (deskRef.current) {
        scene.add(deskRef.current); // 책상 모델 추가
      }
      scene.add(mesh); // 선택된 오브젝트 추가

      // 드래그 컨트롤 설정
      const dragControls = new DragControls(
        [mesh],
        cameraRef.current,
        rendererRef.current.domElement
      );
      dragControlsRef.current = dragControls;

      // 드래그 이벤트 핸들러
      dragControls.addEventListener("dragstart", () => {
        // 드래그 시작 시 OrbitControls 비활성화
        controlsRef.current.enableRotate = false;
        controlsRef.current.enableZoom = false;
        controlsRef.current.enablePan = false;
      });

      dragControls.addEventListener("dragend", () => {
        // 드래그 종료 시 OrbitControls 활성화
        controlsRef.current.enableRotate = true;
        controlsRef.current.enableZoom = true;
        controlsRef.current.enablePan = true;
      });

      dragControls.addEventListener("drag", (event) => {
        event.object.position.x = Math.round(event.object.position.x * 10) / 10;
        event.object.position.z = Math.round(event.object.position.z * 10) / 10;

        // 오브젝트가 grid 평면 위에서만 움직이도록 제한
        event.object.position.y = 0; // Y축 고정 (평면 위)
      });

      // 클린업 함수
      return () => {
        dragControls.dispose(); // 드래그 컨트롤 해제
        scene.remove(mesh); // 장면에서 오브젝트 제거
      };
    }
  }, [selectedObject]);

  return (
    <div className="flex">
      <div className="w-48 p-4">
        <h3 className="text-lg font-bold mb-2">Object Selector</h3>
        <ul className="space-y-2">
          {objects.map((obj, index) => (
            <li
              key={index}
              onClick={() => setSelectedObject(obj)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
      <div ref={canvasRef} className="flex-1 h-screen" />
    </div>
  );
};

export default Page;
