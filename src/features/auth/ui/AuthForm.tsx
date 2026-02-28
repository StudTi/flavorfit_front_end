'use client'
import { LoginDocument, RegisterDocument, type AuthInput } from "@/__generated__/graphql"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { useMutation } from "@apollo/client/react"
import { AuthFormChange } from "./AuthFormChange"
import { useForm } from "react-hook-form"
import { isEmailRegex } from "../utils/is-email.regex"
import { IAuthFormData } from "../types/auth-form.types"
import cn from 'clsx'
import { toast } from "sonner"


interface Props {
  type: 'login' | 'register'
}

export function AuthForm({ type }: Props) {

  const isLogin = type == 'login'

  const {register, handleSubmit, formState: { errors, isValid }} = useForm<AuthInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  //* Уведомление о входе и ошибках

  const [auth, { loading }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
    {
      onCompleted: () => {
        toast.success(
          isLogin ? 'Вход выполнен успешно!' : 'Регистрация прошла успешно!',
          {
            id: 'auth-success'
          }
        )
      },
      onError: error => {
        toast.error(error.message, {
          id: 'auth-error'
        })
      }
    }
  )

  const handleAuth = async (data: IAuthFormData) => {
    await auth({
      variables: {
        data
      }
    })
  }

  return (
    <div className="flex h-screen">
      <div className="bg-violet-500 rounded-2xl w-sm m-auto p-6 text-white shadow-lg">

        <h1 className="text-center text-4xl font-bold mb-5">{isLogin ? 'Логин' : 'Регистрация'}</h1>

        <form
          className="space-y-3"
          onSubmit={handleSubmit(handleAuth)}
        >

          {/* Строка email в форме регистрации */}
          <Input
            {...register('email', {
              required: true,
              pattern: {
                value: isEmailRegex,
                message: 'Неверный Email адрес'
              }
            })}
            type="email"
            placeholder="Почта"
            className={cn(
              'border border-transparent transition-colors',
              errors.email ? 'border-red-500' : ''
            )}
          />

          {/* Вывод ошибки */}
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          {/* Строка password в форме регистрации */}
          <Input
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Пароль должен иметь длину не менее 6 символов'
              }
            })}
            type="password"
            placeholder="Пароль"
            className={cn(
              'border border-transparent transition-colors',
              errors.password ? 'border-red-500' : '')}
          />

          {/* Вывод ошибки */}
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* Кнопка логина и регистрации */}
          <div className="text-center">
            <Button
              onClick={() => 
                toast("", {
                  description: "" 
                })
              }
              type="submit"
              disabled={!isValid || loading}
            >
              {isLogin ? 'Логин' : 'Регистрация'}
            </Button>
          </div>
        </form>
        <AuthFormChange isLogin={isLogin}/>      
      </div>
    </div>
  )
}