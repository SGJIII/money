import { auth } from "@/app/auth"
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { contentType, topic, tone } = body;

    if (!contentType || !topic || !tone) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create prompt based on content type
    let prompt = "";
    switch (contentType) {
      case "Social Media Post":
        prompt = `Write a ${tone} social media post about ${topic}. Make it engaging and include relevant hashtags.`;
        break;
      case "Blog Article":
        prompt = `Write a ${tone} blog article about ${topic}. Include a compelling introduction and clear sections.`;
        break;
      case "Marketing Copy":
        prompt = `Write ${tone} marketing copy about ${topic}. Focus on benefits and include a clear call to action.`;
        break;
      default:
        prompt = `Write ${tone} content about ${topic}.`;
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional content creator skilled in writing engaging, conversion-focused content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("[CONTENT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 