import { defineConfig } from "tinacms"
import { richTextComponents } from "./richtext-schema"

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main"

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary")
      return pack.TinaCloudCloudinaryMediaStore
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "settings",
        label: "Settings",
        path: "content/settings",
        format: "json",
        fields: [
          {
            name: "logo",
            type: "image",
            label: "Logo",
          },
          {
            name: "menuItems",
            type: "object",
            label: "Menu Items",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title }
              },
            },
            fields: [
              {
                name: "label",
                type: "string",
                label: "Label",
              },
              {
                name: "link",
                type: "string",
                label: "Link",
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/page",
        format: "mdx",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },

          {
            name: "blocks",
            label: "Blocks",
            type: "object",
            list: true,
            templates: [
              {
                name: "welcomeHero",
                label: "Welcome Hero",
                fields: [
                  {
                    name: "title",
                    type: "string",
                    label: "Title",
                    required: true,
                  },
                  {
                    name: "name",
                    type: "string",
                    label: "Name",
                    required: true,
                  },
                  {
                    name: "description",
                    type: "string",
                    label: "Description",
                  },
                  {
                    name: "profileImage",
                    type: "image",
                    label: "Profile Image",
                  },

                  {
                    name: "link",
                    type: "object",
                    label: "Link",
                    list: true,
                    fields: [
                      {
                        name: "cta",
                        type: "string",
                        label: "CTA",
                      },
                      {
                        name: "url",
                        type: "string",
                        label: "URL",
                      },
                    ],
                  },
                ],
              },
              {
                name: "experience",
                label: "Experience",
                fields: [
                  {
                    name: "experienceHeading",
                    type: "string",
                    label: "Experience Heading",
                  },
                  {
                    name: "roles",
                    type: "object",
                    label: "Roles",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item.title }
                      },
                      defaultItem: {
                        position: "designer",
                        company: "TinaCMS",
                        date: "2021",
                        description: "I did some stuff",
                      },
                    },
                    fields: [
                      {
                        name: "position",
                        type: "string",
                        label: "Position",
                      },
                      {
                        name: "company",
                        type: "string",
                        label: "Company",
                      },
                      {
                        name: "date",
                        type: "string",
                        label: "Date",
                      },
                      {
                        name: "description",
                        type: "rich-text",
                        label: "Description",
                      },
                    ],
                  },
                ],
              },
              {
                name: "projects",
                label: "Projects",
                fields: [
                  {
                    name: "projectsHeading",
                    type: "string",
                    label: "Projects Heading",
                  },
                  {
                    name: "projects",
                    type: "object",
                    label: "Projects",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title }
                      },
                      defaultItem: {
                        title: "TinaCMS",
                        description: "I did some stuff",
                        link: "https://tina.io",
                      },
                    },
                    fields: [
                      {
                        name: "title",
                        type: "string",
                        label: "Title",
                      },
                      {
                        name: "description",
                        type: "string",
                        label: "Description",
                      },
                      {
                        name: "link",
                        type: "string",
                        label: "Link",
                      },
                      {
                        name: "image",
                        type: "image",
                        label: "Image",
                      },
                      {
                        name: "videoLink",
                        type: "string",
                        label: "Video link",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            if (document._sys.filename === "about") {
              return "/about"
            }
            if (document._sys.filename === "home") {
              return "/"
            }
            return undefined
          },
          filename: {
            slugify: (values) => {
              return `${(values.title || "")
                .toLowerCase()
                .replace(/ /g, "-")}`.replace(/[^\w.\/-\s]/gi, "")
            },
          },
        },
      },
      {
        name: "posts",
        label: "Posts",
        path: "content/post",
        format: "mdx",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "coverImage",
            type: "image",
            label: "Cover Image",
          },
          {
            name: "date",
            type: "datetime",
            label: "Date",
            required: true,
          },
          {
            name: "tags",
            type: "string",
            label: "Tags",
            list: true,
          },
          {
            name: "body",
            type: "rich-text",
            label: "Body",
            isBody: true,
            templates: richTextComponents,
          },
        ],
        defaultItem() {
          return {
            title: "New Post",
            date: new Date().toISOString(),
          }
        },
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            return `/posts/${document._sys.filename}`
          },
          filename: {
            slugify: (values) => {
              return `${(values.title || "")
                .toLowerCase()
                .replace(/ /g, "-")}`.replace(/[^\w.\/-\s]/gi, "")
            },
          },
        },
      },
      {
        name: "projects",
        label: "Projects",
        path: "content/project",

        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "description",
            type: "string",
            label: "Description",
            required: true,
          },
          {
            name: "link",
            type: "string",
            label: "Link",
            required: true,
          },
        ],

        ui: {
          // This is an DEMO router. You can remove this to fit your site

          filename: {
            slugify: (values) => {
              return `${(values.title || "")
                .toLowerCase()
                .replace(/ /g, "-")}`.replace(/[^\w.\/-\s]/gi, "")
            },
          },
        },
      },
    ],
  },
})
