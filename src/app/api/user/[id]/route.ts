import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function GET (request: Request, {params:{id}}: {params:{id:string}}){
    const User = await prisma.user.findUnique({where:{id:+id},include:{prompts:true}})
    return NextResponse.json(User)
}