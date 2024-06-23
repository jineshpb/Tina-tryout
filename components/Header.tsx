import client from "@/tina/__generated__/client"
import NewNavbar from "./NewNavbar"
import { SettingsConnectionQuery } from "@/tina/__generated__/types"

import { SettingsQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

export default async function Header() {
  const result2 = await client.queries.settingsConnection()

  console.log(result2.data)

  return <NewNavbar data={result2.data} />
}
