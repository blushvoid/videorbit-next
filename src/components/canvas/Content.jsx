import React from 'react'
import { Html } from '@react-three/drei'

const Content = ({ domContent, refItem }) => (
  <Html fullscreen portal={domContent}>
    <div ref={refItem} className='container'></div>
  </Html>
)

export default Content
