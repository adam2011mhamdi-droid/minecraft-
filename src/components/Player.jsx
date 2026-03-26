import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SPEED = 5

export function Player() {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 10, 0] }))
  const velocity = useRef([0, 0, 0])
  
  useEffect(() => api.velocity.subscribe(v => velocity.current = v), [api.velocity])

  useFrame((state) => {
    const { forward, backward, left, right } = getKeys()
    const direction = new THREE.Vector3()
    const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward))
    const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0)

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    ref.current.getWorldPosition(camera.position)
  })

  return <mesh ref={ref} />
}

// Helper pour le clavier
function getKeys() {
  const keys = { forward: false, backward: false, left: false, right: false }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'z') keys.forward = true
    if (e.key === 's') keys.backward = true
    if (e.key === 'q') keys.left = true
    if (e.key === 'd') keys.right = true
  })
  window.addEventListener('keyup', (e) => {
    if (e.key === 'z') keys.forward = false
    if (e.key === 's') keys.backward = false
    if (e.key === 'q') keys.left = false
    if (e.key === 'd') keys.right = false
  })
  return keys
}
