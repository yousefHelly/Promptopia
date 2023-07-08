import { prisma } from '@/db'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const Handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await prisma.user.findFirst({where:{email:session.user?.email!}})
            session.user.id = sessionUser?.id
            return session
            },
        async signIn({profile}){
            try {
                //if user already exists
                const userExists = await prisma.user.findFirst({where:{email:profile!.email}})
                //if not, create user
                if(!userExists){
                        await prisma.user.create({data:{email:profile!.email!, image:(profile as any).picture, username:profile!.name!.replace(' ','').toLowerCase()}})
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    }
})

export {Handler as GET, Handler as POST}