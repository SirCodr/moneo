'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { loginWithProvider } from '@/lib/auth'

export async function login() {
  const origin = (await headers()).get("origin")
  const { error, data } = await loginWithProvider({ provider: 'google', options: { redirectTo: `${origin}/auth/callback` } })

  if (error) {  
    console.error(error)
    return
  } else {
    redirect(data.url)
  }
}