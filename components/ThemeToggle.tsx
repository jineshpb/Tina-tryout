"use client"

import { useTheme } from "next-themes"
import { RxMoon, RxSun } from "react-icons/rx"
import { FiSun } from "react-icons/fi"
import { FaRegMoon } from "react-icons/fa"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  return (
    <>
      <button
        onClick={() => setTheme("light")}
        className="hidden text-gray-300 dark:flex"
      >
        <FiSun />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className="flex text-gray-600 dark:hidden"
      >
        <FaRegMoon />
      </button>
    </>
  )
}
