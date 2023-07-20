import React, {Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from  '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf")

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.5}/>
      <primitive 
      object={computer.scene}
      scale={isMobile ? 0.7 : 0.75}
      position={isMobile ? [-1.2, -3, -2.2] : [0, -3.50, -1.5]}
      rotation={[-0.001, 0.05, -0.001]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // looks for changes in window size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    //sets value to isMobile
    setIsMobile(mediaQuery.matches);

    //defines callback function to execute changes to media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    //add callback function as an event listener fo changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    //removes listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  }, [])

  return(
    <Canvas frameLoop='demand' 
    shadows 
    camera={{ position: [20, 3, 5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}>

      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
        enableZoom={false} 
        maxPolarAngle={Math.PI/2} 
        minPolarAngle={Math.PI/2} />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all/>

    </Canvas>
  )
}

export default ComputersCanvas