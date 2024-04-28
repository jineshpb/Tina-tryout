// app/hello-today/opengraph-image.tsx
import { ImageResponse } from "next/og"

import { NextRequest } from "next/server"
import { NextPageContext } from "next"

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

const url = `${baseUrl}/fonts/SpaceGrotesk-Bold.ttf`

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

// const spaceBold = fetch(url)
//   .then((res) => res.arrayBuffer())
//   .catch((error) => {
//     console.error("Error fetching font:", error)
//   })

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

  console.log("params", params)

  // console.log("params, req", params, req)

  // const name = searchParams.get("name")

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
      <div
        tw="flex h-full pl-8 flex-row-reverse  bg-neutral-800"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          flexWrap: "nowrap",
          padding: "40px",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          tw="flex bg-zinc-100 py-4 px-8 "
          style={{
            borderRadius: 30,
            gap: 20,
          }}
        >
          {/* <svg height={60} viewBox="0 0 40 40" fill="#A1A1AA">
            <path d="M8.65,0V10.29H22.5V25a2.61,2.61,0,0,1,0,.28v.06a11.9,11.9,0,0,1-.4,3.07,6.7,6.7,0,0,1-4.25,4.06,5.74,5.74,0,0,1-1.72-1.31c-1.3-1.44-1.93-3.46-1.93-6.16V24H0v1a17.81,17.81,0,0,0,1.82,8.35,1.51,1.51,0,0,0,.15.28l.05.09A14.08,14.08,0,0,0,8,39.13l.11,0a1.59,1.59,0,0,0,.27.12,13.93,13.93,0,0,0,5.72,1.22h7.32a16.6,16.6,0,0,0,9-2.28,2.75,2.75,0,0,0,.33-.23,13.9,13.9,0,0,0,2.85-2.62l.25-.32,0,0a3.3,3.3,0,0,0,.22-.3A16.75,16.75,0,0,0,36.69,25V0Zm7.14,32.79a6.72,6.72,0,0,1-6.71-6.7V25h4.11a9.87,9.87,0,0,0,2.18,6.83,6.6,6.6,0,0,0,1,.94C16.21,32.78,16,32.79,15.79,32.79ZM34.69,25a14.84,14.84,0,0,1-2.31,8.61l0,0v0a.36.36,0,0,1-.07.1l0,0v0l-.06.08c-.07.09-.14.17-.21.27a12.17,12.17,0,0,1-2.5,2.28l-.14.1h-.05a12.9,12.9,0,0,1-5.2,1.81,12.56,12.56,0,0,0,2.44-1.93c2.7-2.72,4.07-6.56,4.07-11.42V8.29H16.74V2h18Z"></path>
          </svg> */}
          <div tw="flex text-[30px] text-white text-zinc-400">
            <p
              style={{
                lineHeight: 0.2,
              }}
            >
              jineshb.me
            </p>
          </div>
        </div>
        <div tw="flex flex-col w-full p-6 mt-auto mb-8 relative z-10">
          <h1
            tw="text-[120px] font-extrabold"
            style={{
              display: "flex",
              fontSize: 90,
              fontStyle: "normal",
              color: "black",
              marginTop: 30,
              lineHeight: 0.5,
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            Jinesh Bhaskaran
          </h1>
          <h2
            style={{
              display: "flex",
              fontSize: 40,
            }}
          >
            UX designer
          </h2>
          <div
            style={{
              display: "flex",
              fontSize: 40,
            }}
          >
            👋 😄 🎉 🚗 🎮 ➡️
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "SpaceGrotesk-Bold",
          data: spaceBoldFontData,
        },
      ],
    },
  )
}
