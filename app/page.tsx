import Footer from "@/components/Footer"
import NewNavbar from "@/components/NewNavbar"
import { HomePageComponent } from "@/components/app/home-page"
import client from "@/tina/__generated__/client"

export default async function HomePage() {
  const result = await client.queries.homePage()
  const result2 = await client.queries.settingsConnection()

  // console.log("homepage query", result)

  return (
    <>
      <NewNavbar
        data={result2.data}
        variables={result2.variables}
        query={result2.query}
      />
      <HomePageComponent {...result} />
      <Footer
        data={result.data}
        variables={result.variables}
        query={result.query}
      />
    </>
  )
}
