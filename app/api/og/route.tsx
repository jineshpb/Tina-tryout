import { ImageResponse } from "@vercel/og"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

// import Geist from "@/public/fonts/Geist-Bold.ttf"
export const runtime = "experimental-edge"

const webSiteUrl = "http://localhost:3000"
const newSiteUrl = "localhost:3000"

const newUrl = process.env.PERSONAL_URL ? process.env.PERSONAL_URL : newSiteUrl

const baseUrl = process.env.PERSONAL_URL
  ? `https://${process.env.PERSONAL_URL}`
  : "http://localhost:3000" // Default to localhost if running locally

const image = fetch(new URL(`${baseUrl}/green-balls.png`)).then((res) =>
  res.arrayBuffer(),
)

// console.log("image", image)
// console.log("baseUrl", newUrl)

function convertToSentence(text: string | null | undefined) {
  // Split the text by hyphens
  const words = text?.split("-")

  // Capitalize the first word and lowercase the rest
  const capitalizedWords = words?.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return word.toLowerCase()
  })

  // Join the words into a single string and add a period at the end
  const sentence = capitalizedWords?.join(" ") + "."

  return sentence
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has("title")

    const result = await client.queries
      .posts({ relativePath: `${searchParams.get("title")}.mdx` })
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.error(error)
        return notFound()
      })

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My website"

    const formattedTitle = convertToSentence(title)

    const fontData = await fetch(
      new URL(`${baseUrl}/fonts/Geist-Medium.otf`),
    ).then((res) => res.arrayBuffer())

    const PPEditorialItalic = await fetch(
      new URL(`${baseUrl}/fonts/PPEditorialNew-Italic.otf`),
    ).then((res) => res.arrayBuffer())

    const imageData = await image

    return new ImageResponse(
      (
        <div tw="flex h-full pl-8 flex-row-reverse bg-white ">
          <div tw="flex w-1/3 h-full ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${baseUrl}/green-balls.png`}
              width="854"
              height="332"
              alt="balls"
              tw="w-full h-full object-contain"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              tw="absolute left-[-100px] bg-emerald-800 top-[-30px] w-[150px] h-[130%] bg-neutral-800"
              style={{
                transform: "rotate(12deg)",
                background: "#ffffff",
              }}
            ></div>
          </div>
          <div tw="flex items-start flex-col  w-2/3 p-6 mt-auto mb-8 text-white relative z-10">
            <div
              tw="flex py-4  "
              style={{
                position: "relative",

                gap: 20,
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  color: "#71717A",
                  fontFamily: "PPEDitorial-Italic",
                }}
              >
                www.jinesh.me
              </p>
            </div>
            <h1
              tw="text-[76px]  font-extrabold"
              style={{
                lineHeight: "4.5rem",
                color: "#71717A",
                letterSpacing: "-0.03em",
              }}
            >
              {formattedTitle}
            </h1>
            <p
              tw="text-[32px]"
              style={{
                color: "#D4D4D8",
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
            name: "Geist-Bold",
            data: fontData,
          },
          {
            name: "PPEDitorial-Italic",
            data: PPEditorialItalic,
          },
        ],
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    return new Response("Failed to generate OG", { status: 500 })
  }
}
