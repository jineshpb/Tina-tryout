// app/hello-today/opengraph-image.tsx
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { NextPageContext } from "next"

export const size = {
  width: 1200,
  height: 630,
}

const baseUrl = process.env.PERSONAL_URL
  ? `https://${process.env.PERSONAL_URL}`
  : "http://localhost:3000"

const url = `${baseUrl}/fonts/Geist-Regular.ttf`

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

export default async function Image({
  params,
  req,
  context,
}: {
  params: { slug: string }
  req: NextRequest
  context: NextPageContext
}) {
  const fontData = await fetch(
    new URL(`${baseUrl}/fonts/Geist-Regular.otf`),
  ).then((res) => res.arrayBuffer())

  // const serifFontData = await fetch(
  //   new URL(`${baseUrl}/fonts/PPEditorialNew-Italic.otf`),
  // ).then((res) => res.arrayBuffer())

  // const PPEditorialFontData = await fetch(
  //   new URL(`${baseUrl}/fonts/PPEditorialNew-Regular.otf`),
  // ).then((res) => res.arrayBuffer())

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
          backgroundColor: "#ffffff",
        }}
      >
        <div
          tw="flex py-4 px-8"
          style={{
            position: "relative",

            gap: 20,
          }}
        >
          <div tw="flex text-[30px] text-zinc-400 ">
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
        </div>
        <div tw="flex flex-col w-full p-6 mt-auto mb-8 relative z-10">
          <h1
            tw="flex"
            style={{
              fontSize: 120,
              color: "#71717A",
              marginTop: 30,
              lineHeight: 0.6,
              textAlign: "left",
              letterSpacing: "-0.03em",
              // fontFamily: "PPEditorialNew-Regular",
            }}
          >
            Hi,
            <span
              style={{
                // fontFamily: "PPEditorialNew-Italic",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              {" "}
              I&apos;m
            </span>{" "}
            Jinesh
          </h1>
          <p
            tw="flex"
            style={{
              fontSize: 38,
              lineHeight: 0.6,
              marginBottom: 30,
              color: "#A1A1AA",
            }}
          >
            {getRandomRoles(3)}
          </p>

          <div
            tw="flex"
            style={{
              fontSize: 60,
            }}
          >
            <div
              tw="flex"
              style={{
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
        // {
        //   name: "PPEditorialNew-Italic",
        //   data: serifFontData,
        // },
        // {
        //   name: "PPEditorialNew-Regular",
        //   data: PPEditorialFontData,
        // },
      ],

      emoji: "fluent",
    },
  )
}
