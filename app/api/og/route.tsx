import { ImageResponse } from "@vercel/og"

// export const runtime = "experimental-edge"

const webSiteUrl = "http://localhost:3000"

export function GET() {
  try {
    return new ImageResponse(
      (
        <div tw="flex h-full">
          <div tw="w-1/2">
            <h1 tw="">Building an interactive Webgl experience in Next.js</h1>
            <p tw="">Create the prism that inspired 100k conference sign up</p>
          </div>
          <div tw="flex w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img
              tw="w-full"
              src={`http://localhost:3000/prism.png`}
              alt="prism"
              width="256"
              height="256"
            /> */}
          </div>
        </div>
      ),
      { debug: true },
    )
  } catch (error) {
    console.log(error)
  }
}
