"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import moment from "moment"
import { SlUser } from "react-icons/sl"
import { FaRegStar, FaStar } from "react-icons/fa"

let interval: any

type Card = {
  id: number
  title: string
  rating?: number
  author: string
  location?: string
  date?: string
  authorLink?: string
  authorImage?: string
  brandLogo?: string
  feedback: string
}

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: any
  offset?: number
  scaleFactor?: number
}) => {
  const { cardItems } = items

  // console.log("cardItems", cardItems)

  const CARD_OFFSET = offset || 10
  const SCALE_FACTOR = scaleFactor || 0.06

  const [cards, DisplayCards] = useState<Card[]>(cardItems)

  useEffect(() => {
    startFlipping()

    return () => clearInterval(interval)
  }, [])

  const startFlipping = () => {
    interval = setInterval(() => {
      DisplayCards((prevCards: Card[]) => {
        const newArray = [...prevCards] // create a copy of the array
        newArray.unshift(newArray.pop()!) // move the last element to the front
        return newArray
      })
    }, 6000)
  }

  return (
    <div className="!not-prose  relative  my-20 min-h-[35rem] w-full md:min-h-[25rem]  ">
      {cards?.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute block size-full max-w-[60rem] flex-col  justify-between rounded-3xl border border-neutral-200 bg-white  p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1] dark:bg-zinc-800 dark:shadow-white/[0.05]"
            animate={{
              transformOrigin: "top center",
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="flex size-full flex-col justify-between gap-8">
              <div className="flex flex-col">
                <div>
                  <h3 className="!my-2 !text-2xl font-medium tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex font-normal italic leading-snug text-zinc-600  dark:text-zinc-200">
                    &quot;{card.feedback}&quot;
                  </p>
                </div>
                <div className="mb-2">
                  {card.date && (
                    <span className="text-sm italic text-zinc-500 dark:text-zinc-400">
                      {moment(card.date).format("MMM DD, YYYY")}
                    </span>
                  )}
                </div>
              </div>
              {card.author && (
                <div className="flex w-full flex-col">
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-4 p-2">
                      {card.authorImage ? (
                        <div className="my-auto flex  size-16 items-center justify-center overflow-hidden rounded-full border-4 border-emerald-300  dark:border-emerald-500">
                          <img
                            src={card.authorImage}
                            className="m-0 size-16 max-w-24 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-16 items-center justify-center rounded-full  border-4 border-emerald-300 bg-zinc-200 p-2 dark:border-emerald-500">
                          <SlUser />
                        </div>
                      )}

                      <div className="flex flex-col">
                        <div className="flex w-auto gap-1 py-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="py-1">
                              {index < (card.rating ?? 0) ? (
                                <FaStar className=" h-[16px]" />
                              ) : (
                                <FaRegStar className="h-[16px]" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="w-full text-[18px] font-bold leading-tight">
                          {card.author}
                        </div>

                        <span className="text-[14px] leading-tight">
                          {card.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-auto items-start">
                      {card.brandLogo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={card.brandLogo}
                          className="!my-0 mr-6 size-16 object-contain"
                          alt="brand logo"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
