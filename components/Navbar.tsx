"use client"

import clsx from "clsx"
import React, { useEffect, useState } from "react"

import Link from "next/link"
import { MdMenu, MdClose } from "react-icons/md"

import { usePathname } from "next/navigation"


import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  PostsConnectionQuery,
  SettingsConnectionQuery,
} from "@/tina/__generated__/types"


export default function NavBar({
  settings,
}: {
  settings: SettingsConnectionQuery
}) {
  const [isMobile, setIsMobile] = useState(isMobileDevice())
  const pathname = usePathname()
  function isMobileDevice() {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768
    }
    return false
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileDevice())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav aria-label="Main navigation">
      <ul className="items-center rounded-b-lg px-4 py-2">
        {isMobile ? (
          <DesktopMenu data={data} />
        ) : (
          <div className=" mx-auto flex max-w-7xl items-center justify-between">
            {/* <NameLogo logo={settings.data.logo} /> */}
            <DesktopMenu data={data} />
          </div>
        )}
      </ul>
    </nav>
  )
}

function isHome(link: string, pathname: string) {
  const pathnameSegments = pathname.split("/")

  const isHome = pathnameSegments.length === 2 && pathnameSegments[1] === ""

  return isHome
}

function MobileMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument
  pathname: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="block p-2 text-2xl text-slate-800"
        onClick={() => setOpen(true)}
      >
        <MdMenu />
      </button>
      <div
        className={clsx(
          "fixed inset-0 z-50 flex flex-col items-center gap-10 bg-slate-50 pr-4 pt-24 transition-transform duration-300 ease-in-out ",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          aria-label="Close menu"
          aria-expanded={open}
          className="fixed left-6 top-3 block p-2 text-2xl text-slate-800 "
          onClick={() => setOpen(false)}
        >
          <MdClose />
        </button>
        {settings.data.nav_item.map(({ link, label, nav_icon }, index) => (
          <React.Fragment key={label}>
            <li className="flex items-center first:mt-8">
              <PrismicNextLink
                className={clsx(
                  "group relative flex items-center gap-3 overflow-hidden rounded px-3 py-2 text-3xl font-bold text-slate-900 ",
                  {
                    "bg-purple-500 text-purple-200 hover:bg-purple-500":
                      ("url" in link &&
                        link.url !== "/" &&
                        pathname.includes(asLink(link) as string)) ||
                      (isHome(link as any, pathname) &&
                        pathname === "/" &&
                        "url" in link &&
                        link.url === "/"),
                  },
                )}
                field={link}
                onClick={() => setOpen(false)}
                aria-current={
                  pathname.includes(asLink(link) as string) ? "page" : undefined
                }
              >
                <span>{nav_icon && <RenderIcon navIcon={nav_icon} />}</span>

                <span className="relative">{label}</span>
              </PrismicNextLink>
            </li>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

function NameLogo({ logo }: { logo: any }) {
  // replace any with the actual type of logo
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-900"
    >
      <Image field={logo} alt="Logo" />
    </Link>
  )
}

function DesktopMenu({ data }: { data: PostsConnectionQuery }) {
  return (
    <div className="top-16 h-full items-center gap-4 bg-transparent py-0 pr-4 md:flex">
      {data(({ link, label, nav_icon }, index) => (
        <React.Fragment key={label}>
          <li>
            <Button
              asChild
              variant="link"
              className={cn(
                "group relative flex items-center gap-1 overflow-hidden px-3 py-3 text-xl font-bold text-slate-500",
                {
                  " text-purple-700 ":
                    ("url" in link &&
                      link.url !== "/" &&
                      pathname.includes(asLink(link) as string)) ||
                    (isHome(link as any, pathname) &&
                      pathname === "/" &&
                      "url" in link &&
                      link.url === "/"),
                },
              )}
            >
              <PrismicNextLink
                className={clsx("")}
                field={link}
                aria-current={
                  pathname.includes((asLink(link) as string) || "")
                    ? "page"
                    : undefined
                }
              >
                {/* <span className="z-10">
                  {nav_icon && <RenderIcon navIcon={nav_icon} />}
                </span> */}

                <span
                // className={clsx(
                //   "absolute inset-0 z-0 h-full rounded  bg-purple-500 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                //   pathname.includes(asLink(link) as string)
                //     ? "translate-y-12"
                //     : "translate-y-14"
                // )}
                />
                <span className="relative">{label}</span>
              </PrismicNextLink>
            </Button>
          </li>
        </React.Fragment>
      ))}
    </div>
  )
}
