import { prisma } from "@/db"
import { NextResponse } from "next/server"

// GET All Prompts or filter all prompts based on username, tag or description

export async function GET (req: Request){
    const {searchParams} = new URL(req.url)
    const search = searchParams.get('search') || ''
    console.log(search);
    const prompts = await prisma.prompt.findMany(
        {
            include:{
                creator:true
            },
            where:{
                OR:[
                    {
                        creator:{
                            username:{
                                contains:search
                            }
                        }
                    },
                    {
                        tag:{
                            contains:search
                        }
                    },
                    {
                        description:{
                            contains:search
                        },
                    }
                ],
            },
            orderBy:{
                id:'desc'
            }
        }
    ) 
    return NextResponse.json(prompts)
}