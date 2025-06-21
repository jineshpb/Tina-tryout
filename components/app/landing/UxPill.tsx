import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"

const UXPill = () => {
  const cardMotion = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },

      y: -10,
      rotate: -5,
    },
  }
  const cardMotion1 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 10,
    },
  }
  const cardMotion2 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 15,
    },
  }

  const starMotion = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 15,
    },
  }

  const starMotion1 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: -20,
      y: -25,
      rotate: -50,
    },
  }
  const starMotion2 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 5,
      y: -5,
      rotate: 20,
    },
  }

  const glowMotion = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 2,
      transition: { duration: 0.3 },
      y: -10,
      rotate: -5,
    },
  }

  return (
    <motion.div
      whileHover="hover"
      id="pill"
      className=" backgroud-image:[url('./Noise.png')] relative z-0 hidden overflow-hidden rounded-full   bg-[#1D1C20]   shadow-[0px_8px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:inline-block md:h-[60px] md:w-[120px] lg:h-[100px] lg:w-[160px] "
    >
      <motion.div>
        <motion.div
          variants={cardMotion}
          id="card-round"
          className="absolute -bottom-4 right-16 z-10 rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/Ellipse2.png"
            alt="ellise"
            width={24}
            height={24}
            className="pointer-events-none pl-2 pt-2"
          />
        </motion.div>
        <motion.div
          variants={cardMotion1}
          id="card-rectangle"
          className="absolute -bottom-4 right-12 z-[13] rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/Polygon.png"
            alt="rectangle"
            width={24}
            height={24}
            className="pl-2 pt-2"
          />
        </motion.div>

        <motion.div
          variants={cardMotion2}
          id="card-figma"
          className="absolute -bottom-4 right-6 z-[16] rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/FigmaLogo.png"
            alt="figma logo"
            width={24}
            height={24}
            className="pointer-events-none pl-2 pt-2 md:w-4 lg:w-6"
          />
        </motion.div>

        <motion.div
          variants={glowMotion}
          className="absolute bottom-0 size-8 w-full bg-[#9563FF] blur-xl"
        ></motion.div>
      </motion.div>
      <motion.img
        variants={starMotion2}
        src="./Star1.png"
        alt="star1"
        className="pointer-events-none absolute  bottom-1 right-6 z-[17] md:size-6 lg:size-8"
      />
      <motion.img
        variants={starMotion}
        src="./Star2.png"
        alt="star1"
        className="pointer-events-none absolute right-12 top-4 z-[13] md:size-3 lg:size-4"
      />
      <motion.img
        variants={starMotion1}
        src="./Star4.png"
        alt="star1"
        className="pointer-events-none absolute bottom-0 left-8 z-[11] md:size-8 lg:size-10"
      />
    </motion.div>
  )
}

export default UXPill
