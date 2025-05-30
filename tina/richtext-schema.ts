import { Template, tinaTableTemplate } from "tinacms"

export const richTextComponents: Template[] = [
  tinaTableTemplate,
  {
    name: "VideoPlayer",
    label: "Video Player",
    fields: [
      {
        name: "url",
        label: "Video URL",
        type: "string",
      },
    ],
    ui: {
      defaultItem: {
        url: "https://www.youtube.com/watch?v=3jWRrafhO7M",
      },
    },
  },
  {
    name: "CaptionedImage",
    label: "Label Image",
    fields: [
      {
        name: "imageUrl",
        label: "Image URL",
        type: "image",
      },
      {
        name: "caption",
        label: "Caption",
        type: "string",
      },
      {
        name: "alt",
        label: "Alt Text",
        type: "string",
      },
    ],
  },
  {
    name: "TweetEmbed",
    label: "Tweet",
    ui: {
      defaultItem: {
        tweetId: "1794582890304671929",
      },
    },
    fields: [
      {
        name: "tweetId",
        label: "Tweet ID",
        type: "string",
        description:
          "The ID of the tweet. You can find this in the URL of the tweet.",
      },
    ],
  },
  {
    name: "TextBox",
    label: "Text Box",
    fields: [
      {
        name: "text",
        label: "Text",
        type: "rich-text",
      },
    ],
  },
  {
    name: "PullQuote",
    label: "Pull Quote",
    ui: {
      defaultItem: {
        quote: "This is a pull quote.",
        author: "Issac Newton",
      },
    },
    fields: [
      {
        name: "quote",
        label: "Quote",
        type: "string",
      },
      {
        name: "author",
        label: "Author",
        type: "string",
      },
      {
        name: "authorLink",
        label: "Author Link",
        type: "string",
      },
    ],
  },
  {
    name: "FeedbackCard",
    label: "Feedback Card",
    ui: {
      defaultItem: {},
    },
    fields: [
      {
        name: "cardItems",
        label: "Card Items",
        type: "object",
        list: true,
        fields: [
          {
            name: "id",
            label: "ID",
            type: "number",
          },
          {
            name: "title",
            label: "Title",
            type: "string",
          },
          {
            name: "rating",
            label: "Rating",
            type: "number",
          },
          {
            name: "author",
            label: "Author",
            type: "string",
          },
          {
            name: "location",
            label: "Location",
            type: "string",
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
          },
          {
            name: "authorLink",
            label: "Author Link",
            type: "string",
          },
          {
            name: "authorImage",
            label: "Author Image",
            type: "image",
          },
          {
            name: "brandLogo",
            label: "Brand Logo",
            type: "image",
          },

          {
            name: "feedback",
            label: "Feedback",
            type: "string",
          },
        ],
      },
    ],
  },
  {
    name: "ImageTextBlock",
    label: "Image Text Block",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "string",
      },
      {
        name: "type",
        label: "Type",
        type: "string",
      },
      {
        name: "body",
        label: "Body",
        type: "rich-text",
      },
      {
        name: "image",
        label: "Image",
        type: "image",
      },
      {
        name: "imagePosition",
        label: "Image Position",
        type: "string",

        options: [
          { value: "left", label: "left" },
          { value: "right", label: "right" },
        ],
      },
    ],
  },
  {
    name: "ImageCarousel",
    label: "Image Carousel",
    fields: [
      {
        name: "images",
        label: "Images",
        type: "object",
        list: true,
        fields: [
          {
            name: "image",
            label: "Image",
            type: "image",
          },
          {
            name: "caption",
            label: "Caption",
            type: "string",
          },
        ],
      },
      {
        name: "orientation",
        label: "Orientation",
        type: "string",

        options: [
          { value: "landscape", label: "landscape" },
          { value: "portrait", label: "portrait" },
        ],
      },
    ],
  },
  {
    name: "IphoneMockup",
    label: "Iphone Mockup",
    fields: [
      {
        name: "url",
        label: "Video URL",
        type: "string",
      },
    ],
    ui: {
      defaultItem: {
        url: "https://www.youtube.com/watch?v=3jWRrafhO7M",
      },
    },
  },
  {
    name: "FigmaPrototype",
    label: "Figma Prototype",
    fields: [
      {
        name: "url",
        label: "Embed URL",
        type: "string",
        description:
          "The Figma prototype embed URL (from Share > Get embed code)",
      },
      {
        name: "width",
        label: "Width",
        type: "string",
        description: "Optional: Custom width (e.g., 800px, 100%)",
        required: false,
      },
      {
        name: "height",
        label: "Height",
        type: "string",
        description: "Optional: Custom height (e.g., 600px)",
        required: false,
      },
    ],
    ui: {
      defaultItem: {
        url: "",
        width: "",
        height: "",
      },
    },
  },
  {
    name: "MermaidChart",
    label: "Mermaid Diagram",
    fields: [
      {
        name: "chart",
        label: "Chart Definition",
        type: "string",
        ui: {
          component: "textarea",
        },
      },
    ],
  },
]
