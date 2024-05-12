import client from "@/tina/__generated__/client"
import NewNavbar from "./NewNavbar"
import { BlurNav } from "./BlurNav"
import { SettingsQuery } from "@/tina/__generated__/types"

export default async function Header({ className }: { className?: string }) {
  const result = await client.queries.settings({
    relativePath: "settings_doc.json",
  })

  const result2 = await client.queries.settingsConnection()

  return <NewNavbar {...result2} />
}
