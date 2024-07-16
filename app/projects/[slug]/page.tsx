import { PageComponent } from "@/components/app/page"
import { ProjectListPageComponent } from "@/components/app/projects/project-list-page"
import { ProjectPageComponent } from "@/components/app/projects/project-page-component"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("slug", params.slug)

  const result = await client.queries
    .projects({ relativePath: `${params.slug}.md` })
    .then((result) => {
      console.log("result", result)
      return result
    })
    .catch((error) => {
      console.error(error)
      return notFound()
    })

  return <ProjectPageComponent {...result} />
}
