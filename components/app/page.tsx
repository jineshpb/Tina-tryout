"use client"

import { PageQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Heading from "../Heading"
import Avatar from "../Avatar"
import { Button } from "../ui/button"
import Link from "next/link"

export function PageComponent(props: {
  data: PageQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)

  const title = data.page.title
  const content = data.page.body

  return (
    <section>
      <div className="flex gap-8">
        <Avatar image={"/jinesh-mug.jpg"}></Avatar>
        <div className="w-full">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksWelcomeHero":
                return (
                  <section key={i}>
                    <Heading
                      as="h2"
                      size="xl"
                      data-tina-field={tinaField(block, "title")}
                      className="my-4"
                    >
                      {block.title}
                    </Heading>
                    <div className="prose prose-xl">
                      <TinaMarkdown
                        content={block.description}
                        data-tina-field={tinaField(block, "description")}
                      />
                    </div>
                    <div className="pt-4">
                      {block?.link?.map((link, i) => {
                        return (
                          <Button
                            variant="outline"
                            key={i}
                            data-tina-ref={
                              link ? tinaField(link, "cta") : undefined
                            }
                          >
                            <Link href={link?.url || "#"}>{link?.cta}</Link>
                          </Button>
                        )
                      })}
                    </div>
                  </section>
                )

              default:
                return null
            }
          })}
        </div>
      </div>

      <section className="mt-10">
        {data.page.blocks?.map((block, i) => {
          switch (block?.__typename) {
            case "PageBlocksExperience":
              return (
                <section key={i}>
                  <Heading
                    as="h2"
                    size="xl"
                    className="text-slate-300 dark:text-slate-600"
                  >
                    {block.experienceHeading}
                  </Heading>

                  {block.roles?.map((role, i) => {
                    return (
                      <div key={i} className="pt-10">
                        <span
                          className=" text-3xl font-bold"
                          data-tina-field={
                            role ? tinaField(role, "position") : undefined
                          }
                        >
                          {role?.position}
                        </span>
                        <div className="flex gap-2  text-slate-500 dark:text-slate-500">
                          <span
                            className="flex gap-4 pt-0"
                            data-tina-field={
                              role ? tinaField(role, "company") : undefined
                            }
                          >
                            {role?.company}
                          </span>
                          <span>&#8226;</span>
                          <span
                            data-tina-field={
                              role ? tinaField(role, "date") : undefined
                            }
                          >
                            {role?.date}
                          </span>
                        </div>

                        <div
                          className="prose prose-xl mt-6"
                          data-tina-field={
                            role ? tinaField(role, "description") : undefined
                          }
                        >
                          <TinaMarkdown content={role?.description} />
                        </div>
                      </div>
                    )
                  })}
                </section>
              )
            default:
              return null
          }
        })}
      </section>

      {/* <section data-tina-field={tinaField(data.page, "body")}>
        <TinaMarkdown content={content} />
      </section> */}
    </section>
  )
}
