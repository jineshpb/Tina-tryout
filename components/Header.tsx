import client from "@/tina/__generated__/client"
import NewNavbar from "./NewNavbar"

export default async function Header() {
  const result2 = await client.queries.settingsConnection()

  return <NewNavbar data={result2.data} />
}
