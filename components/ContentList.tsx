"use client"

import { gsap } from "gsap"
import Link from "next/link"
import { use, useEffect, useRef, useState } from "react"
import { MdArrowOutward } from "react-icons/md"

import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type contentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[]
  contentType: Content.ContentIndexSlice["primary"]["content_type"]
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"]
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"]
}

export default function ContentList({
  items,
  contentType,
  viewMoreText = "Read more",
  fallbackItemImage,
}: contentListProps) {
  const component = useRef(null)

  {
    /* ref can be an array , here for example this ref is for the LI items */
  }
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])
  const [currentItem, setCurrentItem] = useState<number | null>(null)
  const urlPrefix = contentType === "Blog" ? "/blog" : "/project"

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.thumbnail_image)
      ? item.data.thumbnail_image
      : fallbackItemImage

    return asImageSrc(image, {
      fit: "fill",
      width: 800,

      sat: -40,
      exp: -20,
    })
  })

  const onmouseEnter = (index: number) => {
    setCurrentItem(index)
  }

  const onMouseLeave = () => {
    setCurrentItem(null)
  }

  {
    /* perfetch all the images */
  }
  useEffect(() => {
    contentImages.forEach((url, index) => {
      if (!url) return
      const img = new Image()
      img.src = url
    })
  }, [contentImages])

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".list-background",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: "ease-in-out",
        },
      )
    }, component)

    return () => ctx.revert()
  })

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",

            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          },
        )
      })
    }, component)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <ul
        className="flex flex-col border-b border-b-slate-200  "
        onMouseLeave={onMouseLeave}
        ref={component}
      >
        {items.map((item, index) => (
          <>
            {/* checking if the item have a title present before rendering */}

            {isFilled.keyText(item.data.title) && (
              <li
                key={index}
                className="opacity-0f transition-background group list-item duration-300 ease-in-out "
                onMouseEnter={() => {
                  onmouseEnter(index)
                }}
                ref={(el) => (itemsRef.current[index] = el)}
              >
                <Link
                  href={urlPrefix + "/" + item.uid}
                  className="relative flex items-center justify-between border-t border-t-slate-200 px-4 py-10 text-slate-800 group-hover:text-slate-100"
                  aria-label={item.data.title}
                >
                  <div className=" flex flex-col">
                    <span className="text-3xl font-semibold">
                      {item.data.title}
                    </span>
                    <div className="flex gap-3 font-medium text-purple-500 group-hover:text-purple-300">
                      {item.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="mf:ml-0 ml-auto flex items-center gap-2 text-xl font-medium">
                    {viewMoreText} <MdArrowOutward />
                  </span>
                  <div
                    className="list-background absolute left-0 top-0 z-[-1] size-full"
                    style={{
                      backgroundImage:
                        currentItem !== null && currentItem === index
                          ? `url(${contentImages[currentItem]})`
                          : " ",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  )
}
