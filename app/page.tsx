import Header from "@/components/Header"
import { HomePageComponent } from "@/components/app/home-page"
import client from "@/tina/__generated__/client"

export default async function HomePage() {
  const result = await client.queries.homePage()

  // console.log("homepage query", result)

  return (
    <>
      <Header />

      <HomePageComponent {...result} />
    </>
  )
}
