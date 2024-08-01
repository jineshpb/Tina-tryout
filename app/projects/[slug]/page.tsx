import { PageComponent } from "@/components/app/page"
import { ProjectListPageComponent } from "@/components/app/projects/project-list-page"
import { ProjectPageComponent } from "@/components/app/projects/project-page-component"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  // const detaisl = await getPostFromParams({ params })
  console.log("params", params)

  try {
    const result = await client.queries.projects({
      relativePath: `${params.slug}.md`,
    })
    if (!result) {
      console.error("No results found")
      return {
        title: "Not Found",
        description: "This page could not be found",
      }
    }
    return {
      title: result.data.projects.title,
      description: "This is a projects page",
      alternates: {
        canonical: `/projects/${params.slug}`,
      },
      openGraph: {
        title: result.data.projects.title,
        description: result.data.projects.title,
        type: "article",
        url: `/projects/${params.slug}`,
        images: [
          {
            url: `/api/projectog?title=${params.slug.toString()}`,
            width: 1200,
            height: 630,
            alt: result.data.projects.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: result.data.projects.title,
        description: result.data.projects.title,
        images: [`/api/projectog?title=${params.slug.toString()}`],
      },
    }
  } catch (error) {
    console.error("ther was an error", error)
    return {
      title: "Not Found",
      description: "This page could not be found",
    }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  // console.log("slug", params.slug)

  const result = await client.queries
    .projects({ relativePath: `${params.slug}.md` })
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.error(error)
      return notFound()
    })

  return <ProjectPageComponent {...result} />
}
