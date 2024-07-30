import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Desk = ({ modelPath, position, scale }) => {
  const ref = useRef();
  const { scene } = useThree();
  const defaultPosition = position || [0, 0, 0];
  const defaultScale = scale || [1, 1, 1]; // 기본 스케일 설정

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      ref.current = gltf.scene;
      ref.current.position.set(...defaultPosition);
      ref.current.scale.set(...defaultScale);
      scene.add(ref.current);
    });

    return () => {
      if (ref.current) {
        scene.remove(ref.current);
      }
    };
  }, [modelPath, defaultPosition, defaultScale, scene]);

  return null;
};

export default Desk;
