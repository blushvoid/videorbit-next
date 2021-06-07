import React, { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Html, useGLTF } from '@react-three/drei'

const HTML = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
  ref,
  refItem,
}) => (
  <Html fullscreen portal={domContent}>
    <div ref={refItem} className='container'>
      <h1 className='title'>{children}</h1>
    </div>
  </Html>
)

export default HTML
