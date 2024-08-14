import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MouseControls = ({ camera, models, setActiveModel, controls, scene, deskSize, deskHeight }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const plane = useRef(new THREE.Plane());
  const activeModel = useRef(null);
  const offset = useRef(new THREE.Vector3());
  const intersection = useRef(new THREE.Vector3());
  const gridHelper = useRef(null);
  const axesHelper = useRef(null);

  const createCustomGrid = (sizeX, sizeZ, divisionsX, divisionsZ) => {
    const grid = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3 }); // 두꺼운 빨간색 선

    const stepX = sizeX / divisionsX;
    const stepZ = sizeZ / divisionsZ;

    for (let i = -divisionsX / 2; i <= divisionsX / 2; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * stepX, 0, -sizeZ / 2),
        new THREE.Vector3(i * stepX, 0, sizeZ / 2),
      ]);
      const line = new THREE.Line(geometry, material);
      grid.add(line);
    }

    for (let j = -divisionsZ / 2; j <= divisionsZ / 2; j++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-sizeX / 2, 0, j * stepZ),
        new THREE.Vector3(sizeX / 2, 0, j * stepZ),
      ]);
      const line = new THREE.Line(geometry, material);
      grid.add(line);
    }

    return grid;
  };

  useEffect(() => {
    const onPointerMove = (event) => {
      const rect = event.target.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      if (activeModel.current) {
        if (raycaster.current.ray.intersectPlane(plane.current, intersection.current)) {
          activeModel.current.position.x = intersection.current.x;
          activeModel.current.position.z = intersection.current.z;
        }
      } else {
        const intersects = raycaster.current.intersectObjects(models, true);
        if (intersects.length > 0) {
          document.body.style.cursor = 'pointer';
        } else {
          document.body.style.cursor = 'default';
        }
      }
    };

    const onPointerDown = (event) => {
      const rect = event.target.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(models, true);
      if (intersects.length > 0) {
        let object = intersects[0].object;
        while (object.parent && !object.userData.product) {
          object = object.parent;
        }

        activeModel.current = object;
        setActiveModel(object);
        console.log('Model selected:', object);

        if (gridHelper.current) scene.remove(gridHelper.current);
        if (axesHelper.current) scene.remove(axesHelper.current);

        // 정사각형 배열의 그리드 생성
        gridHelper.current = createCustomGrid(deskSize.x, deskSize.z, 10, 10); // 정사각형 배열로 그리드 생성
        axesHelper.current = new THREE.AxesHelper(5);

        // 책상 위에 그리드 위치 조정
        gridHelper.current.position.set(0, deskHeight + 0.1, -1.5); // 책상 높이보다 조금 더 높게 설정
        axesHelper.current.position.copy(object.position);

        scene.add(gridHelper.current);
        scene.add(axesHelper.current);

        plane.current.setFromNormalAndCoplanarPoint(
          camera.getWorldDirection(plane.current.normal),
          object.position
        );

        controls.enabled = false;
        document.body.style.cursor = 'move';
      }
    };

    const onPointerUp = () => {
      if (activeModel.current) {
        setActiveModel(null);
        activeModel.current = null;
        controls.enabled = true;
        document.body.style.cursor = 'pointer';
        if (gridHelper.current) scene.remove(gridHelper.current);
        if (axesHelper.current) scene.remove(axesHelper.current);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [camera, models, setActiveModel, controls, scene, deskSize, deskHeight]);

  return null;
};

export default MouseControls;
