import client from "@/tina/__generated__/client"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import PasswordProtection from "@/components/PasswordProtection"
import { PostPageComponentNew } from "@/components/app/posts/post-page-new"

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
  const result = await client.queries
    .posts({ relativePath: `${params.slug}.mdx` })
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.error(error)
      return notFound()
    })

  // Fetch all posts for suggestions
  const allPostsResult = await client.queries.postsConnection({
    last: 50, // Get more posts for better suggestions
  })

  // Calculate suggested posts
  const suggestedPosts = calculateSuggestedPosts(
    result.data.posts,
    allPostsResult.data.postsConnection.edges || [],
  )

  return <PostPageComponentNew {...result} suggestedPosts={suggestedPosts} />
}

// Helper function to calculate suggested posts
const calculateSuggestedPosts = (currentPost: any, allPostsEdges: any[]) => {
  // Get all posts except current one
  const allPosts = allPostsEdges
    .filter((edge) => edge?.node?._sys.filename !== currentPost._sys.filename)
    .map((edge) => edge?.node)
    .filter(Boolean)

  // Score posts based on tag matches
  const scoredPosts = allPosts.map((post) => {
    const matchingTags =
      post?.tags?.filter((tag: string) => currentPost.tags?.includes(tag))
        .length || 0

    return {
      post,
      score: matchingTags,
    }
  })

  // Sort by score and take top 3
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post)
}
