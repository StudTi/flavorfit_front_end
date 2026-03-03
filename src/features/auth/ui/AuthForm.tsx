'use client'
import { LoginDocument, RegisterDocument, type AuthInput } from "@/__generated__/graphql"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { useMutation } from "@apollo/client/react"
import { AuthFormChange } from "./AuthFormChange"
import { useForm } from "react-hook-form"
import { isEmailRegex } from "../utils/is-email.regex"
import { IAuthFormData } from "../types/auth-form.types"
import { toast } from "sonner"
import Image from "next/image"


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
      <div className="bg-gradient-to-b from-primary to-violet-400 rounded-2xl w-sm m-auto p-10 text-white shadow-lg relative">

        <h1 className="text-center text-4xl font-bold mb-7">
          {isLogin ? 'Логин' : 'Регистрация'}
        </h1>

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
            aria-invalid={!!errors.email}
          />

          {/* Вывод ошибки */}
          {errors.email && (
            <p className="text-sm text-destructive">
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
            aria-invalid={!!errors.password}
          />

          {/* Вывод ошибки */}
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}

          {/* Кнопка логина и регистрации */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={!isValid || loading}
              variant="secondary"
            >
              {isLogin ? 'Логин' : 'Регистрация'}
            </Button>
          </div>
        </form>
        <AuthFormChange isLogin={isLogin} />

        {/* <Image
          src="/images/icons/mail.png"
          alt="mail"
          width={20}
          height={20}
          className="absolute left-3 bottom-47"
          draggable={false}
        /> */}
        
        {/* Стикер салата на форме авторизации и регистрации */}
        <Image
          src="/images/stickers/salad.png"
          alt="Салат"
          width={140}
          height={140}
          className="absolute -left-12 -bottom-10 rotate-10"
          draggable={false} // не дает возможность перетащить изображение
        />
      </div>
    </div>
  )
}