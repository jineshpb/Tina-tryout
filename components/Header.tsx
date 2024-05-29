import client from "@/tina/__generated__/client"
import NewNavbar from "./NewNavbar"
import { SettingsConnectionQuery } from "@/tina/__generated__/types"

import { SettingsQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

export default async function Header({ className }: { className?: string }) {
  const result2 = await client.queries.settingsConnection()

  return <NewNavbar data={result2.data} />
}
