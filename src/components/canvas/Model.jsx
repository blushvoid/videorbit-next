import React from 'react'
import { useGLTF } from '@react-three/drei'

const Model = ({ url }) => {
  const gltf = useGLTF(url, true)
  return <primitive object={gltf.scene} dispose={null} />
}

export default Model
