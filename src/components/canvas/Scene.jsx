import React from 'react'
import Model from './Model'

const Scene = React.forwardRef(({ modelPath }, ref) => (
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
))

export default Scene
