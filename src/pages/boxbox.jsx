import React, { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('@/components/canvas/Content'), {
  ssr: false,
})
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
})
const Page = ({ domContent, children, bgColor, modelPath, position }) => {
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
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
