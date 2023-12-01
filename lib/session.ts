import { User } from "next-auth"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser(): Promise<{
  sessionUser: User | null
}> {
  const session = await getServerSession(authOptions)

  return {
    sessionUser: session?.user ?? null,
  }
}
