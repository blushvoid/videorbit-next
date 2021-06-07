import React, { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { Section } from './section'
import Content from './Content'
import Scene from './Scene'

const Group = ({ domContent, bgColor, modelPath, position }) => {
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
  })

  const [refItem, inView] = useInView({
    threshold: 0,
  })
  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView, bgColor])

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]} ref={ref}>
        <Scene ref={ref} modelPath={modelPath} />
        <Content domContent={domContent} refItem={refItem} />
      </group>
    </Section>
  )
}

export default Group
