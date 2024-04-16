import { PostPageComponent } from "@/components/app/posts/post-page-component"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await client.queries
    .posts({ relativePath: `${params.slug}.mdx` })
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.error(error)
      return notFound()
    })

  return <PostPageComponent {...result} />
}
