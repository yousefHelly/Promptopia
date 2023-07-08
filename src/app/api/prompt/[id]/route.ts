import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function GET (request: Request, {params:{id}}:{params:{id:string}}){
    try {
        const prompt = await prisma.prompt.findUnique({where:{id:+id}})
        return NextResponse.json(prompt)
    } catch (error) {
        console.log(error);
        return new Response('Prompt Not Found', {status:404})
    }
}
export async function PATCH (request: Request, {params:{id}}:{params:{id:string}}){
    try {
        const {description, tag, creatorId}: Partial<Prompt> = await request.json()
        const prompt = await prisma.prompt.findUnique({where:{id:+id}})
        if(prompt){
            if(prompt.creatorId === creatorId){
                await prisma.prompt.update({data:{description:description, tag:tag}, where:{id:+id}})
                return NextResponse.json({msg:'Updated Successfully'})
            }else{
                return new Response('Unauthorized User !',{status:401})
            }
        }else{
            return new Response('Prompt not Found !',{status:404})
        }
    } catch (error) {
        console.log(error);
        return new Response('Failed updating prompt !', {status:500})
    }
}

export async function DELETE (request: Request, {params:{id}}:{params:{id:string}}){
    try {
        await prisma.prompt.delete({where:{id:+id}})
        return NextResponse.json({msg:'Deleted Successfully'})
    } catch (error) {
        console.log(error);
        return new Response('Failed deleting prompt !', {status:500})
    }
}