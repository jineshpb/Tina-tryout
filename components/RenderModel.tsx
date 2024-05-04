import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { clsx } from "clsx"
import React, { ReactNode, Suspense } from "react"
import Loader from "./Loader"

const RenderModel = ({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) => {
  return (
    <Canvas
      className={clsx("relative -z-10 h-screen w-screen", className)}
      shadows
    >
      <OrbitControls enabled={false} />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera
        makeDefault
        position={[-20, 4.9, 0]}
        rotation={[-1.5, -1, -1.5]}
        fov={20}
      />

      <Suspense fallback={<Loader />}>{children}</Suspense>
      <Environment preset="city" />
    </Canvas>
  )
}

const ApplyBackdropMaterial = () => {
  return (
    <AccumulativeShadows temporal frames={30} alphaTest={0.1} scale={30}>
      <RandomizedLight
        amount={10}
        radius={30}
        intensity={0.5}
        ambient={0.25}
        position={[0, 10, 0]}
      />
    </AccumulativeShadows>
  )
}

export default RenderModel
