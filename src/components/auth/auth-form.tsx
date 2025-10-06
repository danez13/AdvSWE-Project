'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Mode = 'login' | 'signup'

export function AuthForm({ mode = 'login' }: { mode?: Mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Log in' : 'Create account'}</CardTitle>
        <CardDescription>{mode === 'login' ? 'Access your dashboard' : 'Start tracking heat vulnerability in your area'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {mode === 'signup' && (
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
        )}
        <Button className="w-full">{mode === 'login' ? 'Log in' : 'Sign up'}</Button>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between text-sm">
        {mode === 'login' ? (
          <>
            <Link href="/signup" className="text-muted-foreground underline">Create account</Link>
            <Link href="#" className="text-muted-foreground underline">Forgot password</Link>
          </>
        ) : (
          <Link href="/login" className="text-muted-foreground underline">Already have an account? Log in</Link>
        )}
      </CardFooter>
    </Card>
  )
}
