import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MouseControls = ({ camera, models, setActiveModel, controls, scene }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const plane = useRef(new THREE.Plane());
  const activeModel = useRef(null);
  const offset = useRef(new THREE.Vector3());
  const intersection = useRef(new THREE.Vector3());
  const gridHelper = useRef(null);
  const axesHelper = useRef(null);

  useEffect(() => {
    const onPointerMove = (event) => {
      const rect = event.target.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      if (activeModel.current) {
        if (raycaster.current.ray.intersectPlane(plane.current, intersection.current)) {
          activeModel.current.position.copy(intersection.current.sub(offset.current));
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

        gridHelper.current = new THREE.GridHelper(10, 10);
        axesHelper.current = new THREE.AxesHelper(5);

        gridHelper.current.position.copy(object.position);
        axesHelper.current.position.copy(object.position);

        scene.add(gridHelper.current);
        scene.add(axesHelper.current);

        plane.current.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.current.normal), intersects[0].point);
        offset.current.copy(intersects[0].point).sub(object.position);

        document.body.style.cursor = 'grabbing';

        controls.enabled = false; // 카메라 제어 비활성화
      }
    };

    const onPointerUp = () => {
      if (activeModel.current) {
        document.body.style.cursor = 'pointer';
        activeModel.current = null;
        setActiveModel(null);

        if (gridHelper.current) scene.remove(gridHelper.current);
        if (axesHelper.current) scene.remove(axesHelper.current);

        controls.enabled = true; // 카메라 제어 활성화
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
  }, [camera, models, setActiveModel, controls, scene]);

  return null;
};

export default MouseControls;
