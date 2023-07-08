import { prisma } from "@/db"
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    const prompt: Partial<Prompt> = await request.json()
    console.log(prompt);
    const newPrompt = await prisma.prompt.create({data:{description:prompt.description!, tag:prompt.tag!, creatorId:prompt.creatorId!}}),
    msg = 'Prompt Created Successfully'
    return NextResponse.json({newPrompt,msg})
}