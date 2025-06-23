import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { content, mode = "proofread" } = await req.json()

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      )
    }

    const prompts = {
      proofread:
        "Proofread and correct the following text, maintaining the same meaning but fixing any grammatical errors, typos, or improving clarity:",
      enhance:
        "Enhance the following text to make it more engaging and professional while maintaining the same core message:",
      simplify:
        "Simplify the following text to make it more concise and easier to understand while keeping the main points:",
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional editor helping to improve content quality.",
        },
        {
          role: "user",
          content: `${prompts[mode as keyof typeof prompts]}\n\n${content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const rewrittenContent = completion.choices[0].message.content

    return NextResponse.json({ rewrittenContent })
  } catch (error) {
    console.error("AI Rewrite Error:", error)
    return NextResponse.json(
      { error: "Failed to process content" },
      { status: 500 },
    )
  }
}
