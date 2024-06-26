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

const baseUrl = process.env.PERSONAL_URL
  ? `https://${process.env.PERSONAL_URL}`
  : "http://localhost:3000"

const url = `${baseUrl}/fonts/Geist-Black.ttf`

// const fetchFont = async (url: string) => {
//   try {
//     const res = await fetch(url)
//     if (!res.ok) {
//       throw new Error(`Failed to fetch (${res.status}) `)
//     }
//     return (await res.arrayBuffer()) as ArrayBuffer
//   } catch (error) {
//     console.error("Error fetching font:", error)
//     throw error
//   }
// }

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
const emojis = [
  "😀",
  "😄",
  "😊",
  "🙂",
  "👍",
  "🎉",
  "🔥",
  "👋",
  "😄 ",
  "🚗",
  "☕",
  "⚽",
  "🏍️",
  "🔧",
  "💻",
  "🤘",
  "🤙",
]

const roles = [
  "UX designer",
  "CG generalist",
  "Coffee lover",
  "Frontend developer*",
  "UI designer",
  "Product designer",
  "Web developer*",
  "Graphic designer",
]

const getRandomEmojis = (count: number) => {
  const randomEmojis: string[] = []
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length)
    randomEmojis.push(emojis[randomIndex])
  }
  return randomEmojis
}
const getRandomRoles = (count: number) => {
  const randomRoles: string[] = []
  while (randomRoles.length < count) {
    const randomIndex = Math.floor(Math.random() * roles.length)
    const role = roles[randomIndex]
    if (!randomRoles.includes(role)) {
      randomRoles.push(role)
    }
  }
  return randomRoles.slice(0, count).join(", ")
}

const randomEmojis = getRandomEmojis(5)
const randomRoles = getRandomRoles(3)

const image = `${baseUrl}/bgGradient.jpg`

export default async function Image({
  params,
  req,
  context,
}: {
  params: { slug: string }
  req: NextRequest
  context: NextPageContext
}) {
  const fontData = await fetch(new URL(`${baseUrl}/fonts/Geist-Bold.otf`)).then(
    (res) => res.arrayBuffer(),
  )

  const today = new Date()
  const dayName = daysOfWeek[today.getDay()]

  // const spaceBoldFontData = await fetchFont(url)

  // const name =
  //   params.name.charAt(0).toUpperCase() + params.name.slice(1).toLowerCase()

  // const { searchParams } = req.nextUrl;
  // const title =
  //   searchParams.get("title") ||
  //   "Building an interactive webGL experience in Next.js";

  return new ImageResponse(
    (
      <div
        tw="flex h-full pl-8 flex-row-reverse bg-custom-gradient"
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
          backgroundColor: "#27272A",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #3F3F467F 2%, transparent 0%), radial-gradient(circle at 75px 75px, #3F3F467F 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* <img
         
          width="770"
          height="432"
          alt="gradient"
          style={{
            height: "115%",
            width: "115%",
            position: "absolute",
            opacity: 0.3,
          }}
        /> */}
        <div
          tw="flex py-4 px-8  shadow-lg"
          style={{
            position: "relative",
            borderRadius: 30,
            gap: 20,
            background: "linear-gradient(to bottom, #52525B, #3F3F46)",
            boxShadow:
              "inset 0 -1px 0 rgba(0, 0, 0, 0.2), inset 0 2px 4px #ffffff",
          }}
        >
          {/* <svg height={60} viewBox="0 0 40 40" fill="#A1A1AA">
            <path d="M8.65,0V10.29H22.5V25a2.61,2.61,0,0,1,0,.28v.06a11.9,11.9,0,0,1-.4,3.07,6.7,6.7,0,0,1-4.25,4.06,5.74,5.74,0,0,1-1.72-1.31c-1.3-1.44-1.93-3.46-1.93-6.16V24H0v1a17.81,17.81,0,0,0,1.82,8.35,1.51,1.51,0,0,0,.15.28l.05.09A14.08,14.08,0,0,0,8,39.13l.11,0a1.59,1.59,0,0,0,.27.12,13.93,13.93,0,0,0,5.72,1.22h7.32a16.6,16.6,0,0,0,9-2.28,2.75,2.75,0,0,0,.33-.23,13.9,13.9,0,0,0,2.85-2.62l.25-.32,0,0a3.3,3.3,0,0,0,.22-.3A16.75,16.75,0,0,0,36.69,25V0Zm7.14,32.79a6.72,6.72,0,0,1-6.71-6.7V25h4.11a9.87,9.87,0,0,0,2.18,6.83,6.6,6.6,0,0,0,1,.94C16.21,32.78,16,32.79,15.79,32.79ZM34.69,25a14.84,14.84,0,0,1-2.31,8.61l0,0v0a.36.36,0,0,1-.07.1l0,0v0l-.06.08c-.07.09-.14.17-.21.27a12.17,12.17,0,0,1-2.5,2.28l-.14.1h-.05a12.9,12.9,0,0,1-5.2,1.81,12.56,12.56,0,0,0,2.44-1.93c2.7-2.72,4.07-6.56,4.07-11.42V8.29H16.74V2h18Z"></path>
          </svg> */}
          <div
            tw="flex text-[30px] text-zinc-400 "
            style={{
              zIndex: 999,
            }}
          >
            <p
              style={{
                position: "relative",
                lineHeight: 0.2,
                color: "#A1A1AA",
              }}
            >
              Design portfolio
            </p>
          </div>
          {/* <span
            style={{
              position: "absolute",
              borderRadius: "30px",
              left: "1px",
              zIndex: -999,
              bottom: "-6px",
              backgroundColor: "#10B981",
              width: "244px",
              height: "60px",
            }}
          ></span> */}
        </div>
        <div tw="flex flex-col w-full p-6 mt-auto mb-8 relative z-10">
          <h1
            tw="text-[120px] flex flex-col font-extrabold tracking-tight "
            style={{
              display: "flex",
              fontSize: 120,
              fontStyle: "normal",
              color: "#A1A1AA",
              marginTop: 30,
              lineHeight: 0.6,
              whiteSpace: "pre-wrap",
              textAlign: "left",
              letterSpacing: "-0.03em",
            }}
          >
            Hi, I&apos;m Jinesh
          </h1>
          <p
            tw="flex"
            style={{
              fontSize: 38,
              lineHeight: 0.6,
              marginBottom: 30,
              color: "#71717A",
            }}
          >
            {getRandomRoles(3)}
          </p>

          <div
            style={{
              display: "flex",
              fontSize: 60,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 60,
              }}
            >
              {getRandomEmojis(5).map((emoji, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "GeistSans-Bold",
          data: fontData,
        },
      ],

      emoji: "fluent",
    },
  )
}
