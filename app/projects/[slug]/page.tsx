import { PageComponent } from "@/components/app/page"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>
}
