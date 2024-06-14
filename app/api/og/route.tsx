import { ImageResponse } from "@vercel/og"

// import Geist from "@/public/fonts/Geist-Bold.ttf"
export const runtime = "experimental-edge"

const webSiteUrl = "http://localhost:3000"

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000" // Default to localhost if running locally

const image = fetch(
  new URL(`${baseUrl}/green-balls.png`, import.meta.url),
).then((res) => res.arrayBuffer())

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has("title")

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My website"

    // const fontData = await fetch(
    //   new URL(`${baseUrl}/fonts/Geist-Bold.otf`),
    // ).then((res) => res.arrayBuffer())
    // const fontData = await fetch(Geist).then((res) => res.arrayBuffer())

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
                Blog
              </p>
            </div>
            <h1
              tw="text-[76px]  font-extrabold"
              style={{
                lineHeight: "4.5rem",
              }}
            >
              {title}
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
        // fonts: [
        //   {
        //     name: "Geist-Bold",
        //     data: fontData,
        //   },
        // ],
        // width: 1200,
        // height: 630,
      },
    )
  } catch (error) {
    return new Response("Failed to generate OG", { status: 500 })
  }
}
