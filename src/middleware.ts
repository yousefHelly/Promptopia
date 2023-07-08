import { NextRequest, NextResponse } from "next/server"
import { prisma } from "./db"
import { getServerSession } from "next-auth/next"

export { default } from "next-auth/middleware"
export const config = { matcher: ["/create-prompt","/update-prompt/:path*"] }