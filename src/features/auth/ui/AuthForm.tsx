'use client'
import { LoginDocument, RegisterDocument } from "@/__generated__/graphql"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { PAGES } from "@/shared/config/page.config"
import { useMutation } from "@apollo/client/react"
import Link from "next/link"

interface Props {
  type: 'login' | 'register'
}

export function AuthForm({ type }: Props) {
  const isLogin = type == 'login'
  const [register, { data, loading, error }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument
  )

  return (
  <div className="flex h-screen">
    <div className="bg-violet-500 rounded-2xl w-sm m-auto p-6 text-white shadow-lg">

      <h1 className="text-center text-4xl font-bold mb-5">{isLogin ? 'Логин' : 'Регистрация'}</h1>

      <form className="space-y-3">
        <Input type="email" name="email" placeholder="Email" required className=""/>

        <div className="text-center">
          <Button type="submit" disabled={loading}>{isLogin ? 'Логин' : 'Регистрация'}</Button>
        </div>
      </form>
        
        <div className="mt-3 text-center">
          {isLogin ? (
            <div>
              Создать аккаунт? {' '}
              <Link href={PAGES.REGISTER} className="underline">Регистрация</Link>
            </div>
          ) : (
            <div>
              Уже существует аккаунт? {' '}
              <Link href={PAGES.LOGIN} className="underline">Авторизация</Link>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}