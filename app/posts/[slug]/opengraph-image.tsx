// app/hello-today/opengraph-image.tsx
import { ImageResponse } from "next/og"

import { NextRequest } from "next/server"
import { NextPageContext } from "next"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000" // Default to localhost if running locally

const url = `${baseUrl}/fonts/Geist-Bold.ttf`

const fetchFont = async (url: string) => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch (${res.status}) `)
    }
    return (await res.arrayBuffer()) as ArrayBuffer
  } catch (error) {
    console.error("Error fetching font:", error)
    throw error
  }
}

const spaceBold = fetch(url)
  .then((res) => res.arrayBuffer())
  .catch((error) => {
    console.error("Error fetching font:", error)
  })

console.log("meta url", import.meta.url)

// const spaceMedium = fetch(
//   new URL("/fonts/SpaceGrotesk-Medium.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

// const spaceRegular = fetch(
//   new URL("../../../public/fonts/SpaceGrotesk-Regular.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

export default async function Image({
  params,
  req,
  context,
}: {
  params: { slug: string }
  req: NextRequest
  context: NextPageContext
}) {
  // const { searchParams } = req.nextUrl

  // console.log("params, req", params, req)

  // const name = searchParams.get("name")

  console.log("params", params)

  const today = new Date()
  const dayName = daysOfWeek[today.getDay()]

  const spaceBoldFontData = await fetchFont(url)

  // const name =
  //   params.name.charAt(0).toUpperCase() + params.name.slice(1).toLowerCase()

  // const { searchParams } = req.nextUrl;
  // const title =
  //   searchParams.get("title") ||
  //   "Building an interactive webGL experience in Next.js";
  return new ImageResponse(
    (
      <div tw="flex h-full pl-8 flex-row-reverse  bg-zinc-800">
        <div tw="flex w-1/3 h-full ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img
            src={`${baseUrl}/green-balls.png`}
            alt="prism"
            tw="w-full h-full object-contain"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          /> */}
          <div
            tw="absolute left-[-100px] bg-emerald-800 top-[-30px] w-[150px] h-[130%] bg-neutral-800"
            style={{
              transform: "rotate(12deg)",
              background: "#27272A",
            }}
          ></div>
        </div>
        <div tw="flex items-start flex-col  w-2/3 p-6 mt-auto mb-8 text-white relative z-10">
          <div
            tw="flex py-4 px-8  shadow-lg"
            style={{
              position: "relative",
              borderRadius: 30,
              gap: 20,
              background: "linear-gradient(to bottom, #6EE7B7, #10B981)",
            }}
          >
            <p
              style={{
                fontSize: "32px",
                color: "#27272A",
              }}
            >
              Blog
            </p>
          </div>
          <h1
            tw="text-[76px]  font-extrabold"
            style={{
              lineHeight: "4.5rem",
            }}
          >
            {params.slug}
          </h1>
          <p
            tw="text-[32px]"
            style={{
              color: "#52525B",
            }}
          >
            A case study by jinesh
          </p>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "SpaceGrotesk-Bold",
          data: spaceBoldFontData,
          style: "normal",
        },
      ],
    },
  )
}
