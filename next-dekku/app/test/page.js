'use client'

import * as THREE from 'three';
import { useEffect } from 'react';

export default function threeDesk() {
  useEffect(() => {
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera 생성
    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Scene 생성
    const scene = new THREE.Scene();

    // Camera 설정
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // Light 생성
    const color = 0xffffff;
    const intensity = 500;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);

    const objects = [];

    // SphereGeometry 생성
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // 태양의 지역공간인 solarSystem 생성
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // SunMesh 생성
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // 지구의 지역공간인 earthOrbit 생성
    const earthOrbit = new THREE.Object3D();

    // earthOrbit은 태양으로부터 10 떨어짐
    earthOrbit.position.x = 10;

    // earthOrbit을 solarSystem에 추가
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // 지구 Material 생성
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    // 지구 Mesh 생성
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    // 달의 지역공간인 moonOrbit 생성
    const moonOrbit = new THREE.Object3D();

    // moonOrbit은 지구로부터 2만큼 떨어짐
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);

    // moonMesh를 절반 크기로 설정
    moonMesh.scale.set(0.5, 0.5, 0.5);

    // moonMesh를 moonOrbit에 추가
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    // Render Loop
    function render(time) {
      time *= 0.001;

      objects.forEach((obj) => {
        obj.rotation.y = time;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);

  return (
    <div>
      <canvas id="c" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
}
