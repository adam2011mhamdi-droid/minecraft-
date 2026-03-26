import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls, Stars } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { World } from './components/World'
import { Player } from './components/Player'

function App() {
  return (
    <Canvas shadows camera={{ fov: 45 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} castShadow intensity={1} />
      
      <Physics gravity={[0, -9.81, 0]}>
        <Player />
        <World />
      </Physics>

      <PointerLockControls />
    </Canvas>
  )
}

export default App
