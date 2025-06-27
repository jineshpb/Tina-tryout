"use client"
import React, { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import { cn } from "@/utils/cn"
import Link from "next/link"
import Image from "next/image"
import node from "postcss/lib/node"
import { ThemeToggle } from "../ThemeToggle"
import { Home, Radio } from "lucide-react"

function NameLogo({ logo }: { logo: any }) {
  // replace any with the actual type of logo
  return (
    <button
      onClick={() => {
        const element = document.getElementById("introduction")
        element?.scrollIntoView({ behavior: "smooth" })
      }}
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-emerald-900"
    >
      <Image src={logo} width={24} height={24} alt="Logo" />
    </button>
  )
}

function handleClick(link: string) {
  const element = document.getElementById(link)
  element?.scrollIntoView({ behavior: "smooth" })
}

type NavItem = {
  link: string
  icon: JSX.Element
  name: string
}

type NavItems = {
  menuItems: NavItem[]
  logo: JSX.Element
}

export const FloatingNav = ({
  logo,
  navItems,
  className,
}: {
  navItems: NavItems
  className?: string
  logo?: JSX.Element
}) => {
  const { scrollYProgress } = useScroll()

  const nameLogo = navItems.logo

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(true)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!

      if (scrollYProgress.get() < 0.05 || scrollYProgress.get() === 1) {
        setVisible(true)
      } else {
        if (direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  return (
    <AnimatePresence mode="sync">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed inset-x-0 top-10 z-[99999] mx-auto flex max-w-fit items-center justify-center gap-4 space-x-4 rounded-[40px] border border-transparent bg-white py-2 pl-2 pr-4 shadow-[0px_8px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.1] dark:bg-zinc-800",
          className,
        )}
      >
        <button
          onClick={() => {
            const element = document.getElementById("introduction")
            element?.scrollIntoView({ behavior: "smooth" })
          }}
          aria-label="Home page"
          className="relative mb-1 flex w-auto items-center justify-center rounded-[28px]   bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-xl font-medium tracking-tighter text-emerald-900 transition-all ease-in-out hover:from-emerald-200 hover:to-emerald-500"
          style={{
            boxShadow: "inset 0 2px 4px #ffffff/0.5",
          }}
        >
          {/* <Home size={24} /> */}
          <NameLogo logo={nameLogo} />
          <span className="absolute bottom-[-6px] left-0 -z-10  size-full rounded-[30px] bg-emerald-600 transition-all duration-300 group-hover:bottom-[-5px]"></span>
        </button>
        {Array.isArray(navItems.menuItems) &&
          navItems.menuItems.map((navItem: any, idx: number) => (
            <button
              key={`link=${idx}`}
              onClick={() => handleClick(navItem.link)}
              className={cn(
                "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
              )}
            >
              <span className="block sm:hidden"></span>
              <span className="hidden text-xl sm:block">{navItem.label}</span>
            </button>
          ))}

        <div className="mx-auto flex w-auto items-center justify-center tracking-normal">
          <a
            href="https://live.jineshb.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-500 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-700"
          >
            <Radio className="size-3 animate-pulse" />
            <span className="inline-block min-w-fit">Live</span>
          </a>
        </div>
        <button className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
          <ThemeToggle />
          <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
