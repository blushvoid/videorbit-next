import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import * as THREE from 'three'
import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from 'react'


//components
import ResponsiveHeader from '../components/responsiveHeader'
import { Section } from '../components/section'
import Footer from '../components/footer'
import Loader from '../components/Loader'

//state
import scrollState from '../components/state'

import { a, useTransition } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

import HeroSection from '../sections/hero'
import ProcessSection from '../sections/process'
import LandingSection from '../sections/landing'
import DevelopmentSection from '../sections/development'
import Light from '../components/RectLight'
//R3F
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { Html, useProgress, useGLTFLoader } from '@react-three/drei'

function Model({ url }) {
  const gltf = useGLTFLoader(url, true)
  return <primitive object={gltf.scene} dispose={null} />
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[70, 70, -50]} castShadow />
      <pointLight position={[-20, -20, 10]} color='#59B2EB' intensity={3} />
      <pointLight position={[0, -5, 5]} intensity={0.5} />
      <pointLight position={[0, 0, 55]} intensity={0.5} />
      <directionalLight position={[0, -2, 0]} color='#6D4ED4' intensity={4} />
      <pointLight position={[-20, -20, 40]} color='#FF7ADC' intensity={0.5} />
      <Light />
      {/* <hemisphereLight
        color="#ffffff"
        groundColor="#b9b9b9"
        position={[-7, 25, 13]}
        intensity={0.85}
      /> */}
      {/* <ambientLight intensity={1} />
      <directionalLight position={[10, 20, 5]} intensity={0.5} />
      <directionalLight
      castShadow
      position={[0, 15, 0]}
      intensity={0.3}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={20}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      />
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
      
      <directionalLight
      position={[5, 5, 5]}
      intensity={1}
      color="#F783BB"
      castShadow
    /> */}
      {/*<directionalLight position={[-5, -5, 5]} intensity={1} color="purple" />  */}
    </>
  )
}

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (state.mouse.x * Math.PI) / 20,
      0.05
    )
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      (state.mouse.y * Math.PI) / 20,
      0.05
    )
    ref.current.position.y += Math.sin(1000 + state.clock.elapsedTime) / 50
    ref.current.rotation.x +=
      (Math.sin(1000 + state.clock.elapsedTime) * Math.PI) / 2000
    ref.current.rotation.y +=
      (Math.cos(1000 + state.clock.elapsedTime) * Math.PI) / 2000
    ref.current.rotation.z +=
      (Math.sin(1000 + state.clock.elapsedTime) * Math.PI) / 4000

    // console.log(state.mouse);
  })
  // WORKING ROTATION
  // useFrame(() => (ref.current.rotation.y += 0.001));

  const [refItem, inView] = useInView({
    threshold: 0,
  })
  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView])

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} ref={ref}>
        {/* !!! MESH POSITION FOR THE 3D MODELS position={[0.8, -10.96, 2.16]}*/}
        <mesh
          ref={ref}
          position={[0.8, -1.0, -5.0]}
          rotation={[0, 0.0, -0.05]}
          castShadow
          receiveShadow
        >
          <fog attach='fog' args={['lightpink', 60, 50]} />
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className='container'>
            <h1 className='title'>{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  )
}

const Page = ({ title }) => {
  useStore.setState({ title })
  const [events, setEvents] = useState()

  const domContent = useRef()
  const scrollArea = useRef()

  const onScroll = (e) => (scrollState.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <>
      <ResponsiveHeader />
      <Canvas
        // concurrent
        colorManagement
        camera={{ position: [0, 0, 125], fov: 70 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor="#f1d8f5 url('background.png') no-repeat"
            modelPath='/website_avatar_vers_v1Draco.gltf'
            position={250}
          >
            <HeroSection />
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor="#FECEE9 url('background4.png') no-repeat"
            modelPath='/website_avatar_fruits_v7Draco.gltf'
            position={0}
          >
            <ProcessSection />
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor="#f1d8f5 url('background5.png') no-repeat"
            modelPath='/website_avatar_soph_v5Draco.gltf'
            position={-250}
          >
            <LandingSection />
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor="#f2f3fc url('background4.png') no-repeat"
            modelPath='/website_avatar_lanc_v15Draco.gltf'
            position={-500}
          >
            <DevelopmentSection />
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: `${scrollState.pages * 100}vh` }} />
      </div>
      <Footer />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
