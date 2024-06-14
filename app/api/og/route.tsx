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

    console.log("searchParams", searchParams.get("title"))

    const result = await client.queries
      .posts({ relativePath: `${searchParams.get("title")}.mdx` })
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.error(error)
        return notFound()
      })

    // console.log("result", result)

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My website"

    const formattedTitle = convertToSentence(title)

    const fontData = await fetch(
      new URL(`${baseUrl}/fonts/Geist-Bold.otf`),
    ).then((res) => res.arrayBuffer())
    // const fontData = await fetch(Geist).then((res) => res.arrayBuffer())

    console.log("fontData", fontData)

    const imageData = await image

    // console.log("fontURL", `${baseUrl}/fonts/Geist-Bold.otf`)

    // console.log("title", title)

    return new ImageResponse(
      (
        <div tw="flex h-full pl-8 flex-row-reverse  bg-zinc-800">
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
                Case study
              </p>
            </div>
            <h1
              tw="text-[76px]  font-extrabold"
              style={{
                lineHeight: "4.5rem",
              }}
            >
              {formattedTitle}
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
            name: "Geist-Bold",
            data: fontData,
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
