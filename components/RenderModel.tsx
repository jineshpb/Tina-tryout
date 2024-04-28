import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { clsx } from "clsx"
import React, { ReactNode, Suspense } from "react"

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

      <Suspense>{children}</Suspense>
      <Environment preset="city" />
    </Canvas>
  )
}

export default RenderModel
