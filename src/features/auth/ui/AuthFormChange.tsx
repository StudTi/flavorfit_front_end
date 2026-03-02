import { PAGES } from "@/shared/config/page.config"
import Link from "next/link"

interface Props {
  isLogin: boolean
}

export function AuthFormChange({ isLogin }: Props) {
  return (
    <div className="mt-3 text-center text-sm">
      {isLogin ? (
        <div>
          Хотите создать аккаунт? {' '}
          <Link
            href={PAGES.REGISTER}
            className="link-simple"
          >
            Регистрация
          </Link>
        </div>
      ) : (
        <div>
          Уже существует аккаунт? {' '}
            <Link
              href={PAGES.LOGIN}
              className="link-simple"
            >
              Авторизация
            </Link>
        </div>
      )}
    </div>
  )
}


