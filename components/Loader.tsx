import { Html, useProgress } from "@react-three/drei"

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html>
      <span className=" "></span>
      <p className=" text-zinc-700 dark:text-zinc-500">
        {progress.toFixed(2)}%
      </p>
    </Html>
  )
}

export default Loader
