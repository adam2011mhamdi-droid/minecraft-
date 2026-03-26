import { useMemo } from 'react'
import * as THREE from 'three'
import { useBox } from '@react-three/cannon'
import { createNoise2D } from 'simplex-noise'

const noise = createNoise2D()

export function World() {
  const chunks = useMemo(() => {
    const size = 16
    const data = []
    for (let x = -size; x < size; x++) {
      for (let z = -size; z < size; z++) {
        const h = Math.floor(noise(x * 0.1, z * 0.1) * 5) + 5
        for (let y = 0; y < h; y++) {
          data.push([x, y, z, y === h - 1 ? 0 : 1]) // 0: Grass, 1: Dirt
        }
      }
    }
    return data
  }, [])

  return (
    <>
      {chunks.map((pos, i) => (
        <Block key={i} position={[pos[0], pos[1], pos[2]]} type={pos[3]} />
      ))}
    </>
  )
}

function Block({ position, type }) {
  const [ref] = useBox(() => ({ type: 'Static', position }))
  
  // Couleurs procédurales simples (en attendant le shader complet)
  const color = type === 0 ? '#4ade80' : '#713f12'

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  )
}
