import client from "@/tina/__generated__/client"
import NewNavbar from "./NewNavbar"

export default async function Header({ className }: { className?: string }) {
  const result = await client.queries.settings({
    relativePath: "settings_doc.json",
  })

  const result2 = await client.queries.settingsConnection()
  console.log(result2)

  return (
    <div className="sticky top-0 z-10 w-full backdrop-blur-xl ">
      <NewNavbar {...result2} />
    </div>
  )
}
