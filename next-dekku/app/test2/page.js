'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js'; // 경로 유지

const objects = [
  { name: 'Cube', geometry: new THREE.BoxGeometry(), color: 0x00ff00 },
  { name: 'Sphere', geometry: new THREE.SphereGeometry(), color: 0x0000ff },
  // 추가 오브젝트
];

const Page = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null); // 초기화는 useEffect에서 수행
  const rendererRef = useRef(null); // 초기화는 useEffect에서 수행

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 배경색 설정
      renderer.setClearColor(0xeeeeee); // 원하는 색상 코드로 변경

      canvasRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const scene = sceneRef.current;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', () => {
        if (rendererRef.current && cameraRef.current) {
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
        }
      });

      return () => {
        window.removeEventListener('resize', () => {});
        if (canvasRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (selectedObject && cameraRef.current && rendererRef.current) {
      const { geometry, color } = selectedObject;
      const material = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);

      const scene = sceneRef.current;
      scene.clear();
      scene.add(mesh);

      const dragControls = new DragControls([mesh], cameraRef.current, rendererRef.current.domElement);

      dragControls.addEventListener('drag', (event) => {
        event.object.position.x = Math.round(event.object.position.x * 10) / 10;
        event.object.position.y = Math.round(event.object.position.y * 10) / 10;
      });
    }
  }, [selectedObject]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px' }}>
        <h3>Object Selector</h3>
        <ul>
          {objects.map((obj, index) => (
            <li key={index} onClick={() => setSelectedObject(obj)}>
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
      <div ref={canvasRef} style={{ flex: 1, height: '100vh' }} />
    </div>
  );
};

export default Page;
