import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Desk = ({ modelPath, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const ref = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.position.set(...position);
      model.scale.set(...scale);
      ref.current = model;
    });
  }, [modelPath, position, scale]);

  return ref.current ? <primitive object={ref.current} /> : null;
};

export default Desk;
