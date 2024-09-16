"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useGLTF, useAnimations } from "@react-three/drei"

import { useFrame, useThree } from "@react-three/fiber"
export function ChonkyCat(props: any) {
  const group = useRef<THREE.Group>()

  const { nodes, materials, animations } = useGLTF("/models/cat.glb")
  const { actions } = useAnimations(animations, group)
  const { size } = useThree()

  const screenWidth = size.width

  const maxZ = screenWidth / 90 // Maximum allowed value for z position
  const minZ = -maxZ // Minimum allowed value for z position
  const speed = 2 // Speed of movement along the z axis

  const [direction, setDirection] = useState(1) // 1 for positive direction, -1 for negative direction
  const [rotationAngle, setRotationAngle] = useState(0)

  // console.log(nodes)

  // actions?.forEach((animation: AnimationAction) => {
  //   animation.play()
  // })

  useEffect(() => {
    if (actions) {
      const animationSequence = ["global_movement_LR", "global_movement_RL"]
      actions["Rig|Scene"]?.play()
    }
  }, [actions])

  useFrame((state, delta) => {
    if (group.current && actions) {
      const newZ = group.current.position.z + direction * speed * delta

      if (newZ > maxZ || newZ < minZ) {
        setDirection(-direction)
        // group.current.rotation.y = Math.PI
        setRotationAngle(rotationAngle + Math.PI)
      } else {
        group.current.position.z = newZ
      }

      group.current.rotation.y = rotationAngle
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig" position={[0, 0, -0.034]} scale={0.8}>
          <skinnedMesh
            name="fat_cat_white001"
            geometry={(nodes.fat_cat_white001 as THREE.SkinnedMesh).geometry}
            material={materials["Cat01.001"]}
            skeleton={(nodes.fat_cat_white001 as THREE.SkinnedMesh).skeleton}
            castShadow
          />
          <primitive object={nodes.root} />
        </group>
        <group name="BezierCircle" scale={1.897} />
      </group>
    </group>
  )
}

useGLTF.preload("models/cat.glb")
