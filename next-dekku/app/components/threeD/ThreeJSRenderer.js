import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseControls from './MouseControls';
import TransformControls from './TransformControls';
import SelectedProducts from './SelectedProducts';
import { v4 as uuidv4 } from 'uuid';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: 'YOUR_ACCESS_KEY',
//   secretAccessKey: 'YOUR_SECRET_KEY',
//   region: 'YOUR_REGION'
// });

// const uploadToS3 = (data, fileName) => {
//   const params = {
//     Bucket: 'YOUR_BUCKET_NAME',
//     Key: fileName,
//     Body: JSON.stringify(data),
//     ContentType: 'application/json'
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error("Error uploading JSON data:", err);
//     } else {
//       console.log("Successfully uploaded JSON data:", data);
//     }
//   });
// };

const ThreeJSRenderer = ({ selectedProducts, setSelectedProducts, onComplete }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [deskHeight, setDeskHeight] = useState(0);
  const [deskSize, setDeskSize] = useState({ x: 0, z: 0 });
  const [models, setModels] = useState([]);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [activeModel, setActiveModel] = useState(null);

  const saveModelData = () => {
    const data = models.map(model => ({
      id: model.userData.id,
      uniqueId: model.userData.uniqueId,
      name: model.userData.product.name,
      description: model.userData.product.description,
      image: model.userData.product.image,
      modelPath: model.userData.product.modelPath,
      position: model.position.toArray(),
      scale: model.scale.toArray(),
      rotation: model.rotation.toArray(),
      price: model.userData.product.price,
      isFetched: model.userData.isFetched,
    }));
    localStorage.setItem('sceneState', JSON.stringify(data));
    console.log(data);

    // S3 업로드 호출
    // uploadToS3(data, 'modelData.json');
  };

  const captureThumbnail = () => {
    renderer.render(scene, camera);
    const thumbnail = renderer.domElement.toDataURL('image/png');
    localStorage.setItem('thumbnail', thumbnail);
    return thumbnail;
  };

  const fetchModelData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch file from S3");
      }
      const data = await response.json();
      console.log("Fetched JSON data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  };

  const loadModelsFromData = (data, scene, loader, setSelectedProducts) => {
    data.forEach(modelData => {
      console.log("modelData:", modelData);

      loader.load(modelData.modelPath, (gltf) => {
        const model = gltf.scene;
        if (modelData.position && modelData.scale && modelData.rotation) {
          model.position.fromArray(modelData.position);
          model.scale.fromArray(modelData.scale);
          model.rotation.fromArray(modelData.rotation);
        }
        model.userData = {
          id: modelData.id,
          uniqueId: modelData.uniqueId || uuidv4(),
          product: modelData,
          isFetched: true,
        };
        setModels(prevModels => [...prevModels, model]);
        setSelectedProducts(prevProducts => [...prevProducts, {
          id: modelData.id,
          name: modelData.name,
          description: modelData.description,
          image: modelData.image,
          modelPath: modelData.modelPath,
          scale: modelData.scale,
          uniqueId: modelData.uniqueId || uuidv4(),
          position: modelData.position,
          rotation: modelData.rotation,
          price: modelData.price,
          isFetched: true,
        }]);
        scene.add(model);
        console.log("Model loaded and added to scene:", modelData);
      }, undefined, (error) => {
        console.error(`An error happened while loading the model: ${modelData.modelPath}`, error);
      });
    });
  };

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(20, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, -10);
    camera.lookAt(0, 10, 0);
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 30, 0);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load('/threedmodels/ssafydesk.glb', (gltf) => {
      const desk = gltf.scene;
      desk.position.set(0, 0, -1.5);
      desk.scale.set(3, 3, 3);

      const box = new THREE.Box3().setFromObject(desk);
      const deskHeight = box.max.y - box.min.y;
      const deskSize = { x: box.max.x - box.min.x, z: box.max.z - box.min.z };
      setDeskHeight(deskHeight);
      setDeskSize(deskSize);

      scene.add(desk);
      console.log("Desk model loaded and added to scene.");

      const jsonUrl = 'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/memberId/47270356-1d1c-4fcf-8776-4bba416ca87e';
      fetchModelData(jsonUrl).then(data => {
        loadModelsFromData(data, scene, loader, setSelectedProducts);
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
  }, []);

  useEffect(() => {
    if (scene) {
      const loader = new GLTFLoader();
      const existingModelUniqueIds = models.map(model => model.userData.uniqueId);
      const selectedProductUniqueIds = selectedProducts.map(product => product.uniqueId);

      selectedProducts.forEach((product) => {
        if (!existingModelUniqueIds.includes(product.uniqueId)) {
          loader.load(product.modelPath, (gltf) => {
            const model = gltf.scene;
            const scale = product.scale || [1, 1, 1];
            const fixedPosition = { x: 0, y: deskHeight + 0.03, z: -1.5 };
            model.userData = { id: product.id, uniqueId: product.uniqueId, product, isFetched: product.isFetched || false };

            if (product.position && product.scale && product.rotation) {
              model.position.fromArray(product.position);
              model.scale.fromArray(product.scale);
              model.rotation.fromArray(product.rotation);
            } else {
              model.position.set(fixedPosition.x, fixedPosition.y, fixedPosition.z);
              model.scale.set(...scale);
            }

            setModels(prevModels => [...prevModels, model]);
            scene.add(model);
            console.log("Selected product model loaded and added to scene:", product);
          }, undefined, (error) => {
            console.error(`An error happened while loading the model: ${product.modelPath}`, error);
          });
        }
      });

      models.forEach((model) => {
        if (!selectedProductUniqueIds.includes(model.userData.uniqueId)) {
          scene.remove(model);
          setModels(prevModels => prevModels.filter(m => m.userData.uniqueId !== model.userData.uniqueId));
          console.log("Removed model from scene:", model.userData.uniqueId);
        }
      });
    }
  }, [selectedProducts, scene, deskHeight]);

  const handleRotationChange = (rotationY) => {
    if (activeModel) {
      activeModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
      setSelectedProducts(prevProducts => prevProducts.map(product =>
        product.uniqueId === activeModel.userData.uniqueId
          ? { ...product, rotation: activeModel.rotation.toArray() }
          : product
      ));
    }
  };

  const handleHeightChange = (height) => {
    if (activeModel) {
      activeModel.position.y = parseFloat(height);
      setSelectedProducts(prevProducts => prevProducts.map(product =>
        product.uniqueId === activeModel.userData.uniqueId
          ? { ...product, position: activeModel.position.toArray() }
          : product
      ));
    }
  };

  const handleCloseTransformControls = () => {
    setActiveModel(null);
  };

  const handleComplete = () => {
    saveModelData();
    const thumbnail = captureThumbnail();
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    onComplete();
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {scene && camera && (
        <>
          <MouseControls
            camera={camera}
            models={models}
            setActiveModel={(model) => {
              if (model && model.userData) {
                setModels(prevModels => prevModels.map(m =>
                  m.userData.uniqueId === model.userData.uniqueId ? model : m
                ));
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
          <SelectedProducts 
            selectedProducts={selectedProducts} 
            removeProduct={(uniqueId) => {
              console.log('removeProduct called in ThreeJSRenderer with uniqueId:', uniqueId);
              setSelectedProducts(prevProducts => prevProducts.filter(product => product.uniqueId !== uniqueId));
            }} 
          />
          <button
            className="bg-cyan-800 text-white px-10 py-4 rounded mt-2 fixed bottom-10 right-10 text-lg"
            onClick={handleComplete}
            style={{ zIndex: 10 }}
          >
            완성하기
          </button>
        </>
      )}
    </div>
  );
};

export default ThreeJSRenderer;
