import { PostPageComponent } from "@/components/app/posts/post-page-component"
import client from "@/tina/__generated__/client"
import { Metadata } from "next"
import { notFound } from "next/navigation"

// export const metadata: Metadata = {
//   title: "Tina CMS Blog",
//   description: "My Web dev blog",
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  // const detaisl = await getPostFromParams({ params })
  // console.log("params", params)

  try {
    const result = await client.queries.posts({
      relativePath: `${params.slug}.mdx`,
    })
    if (!result) {
      console.error("No results found")
      return {
        title: "Not Found",
        description: "This page could not be found",
      }
    }
    return {
      title: result.data.posts.title,
      description: "This is a blog page",
      alternates: {
        canonical: `/posts/${params.slug}`,
      },
      openGraph: {
        title: result.data.posts.title,
        description: result.data.posts.title,
        type: "article",
        url: `/posts/${params.slug}`,
        images: [
          {
            url: `/api/og?title=${params.slug.toString()}`,
            width: 1200,
            height: 630,
            alt: result.data.posts.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: result.data.posts.title,
        description: result.data.posts.title,
        images: [`/api/og?title=${params.slug.toString()}`],
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
  // generateMetadata({ params })
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
