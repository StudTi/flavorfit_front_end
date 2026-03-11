'use client'

import { LogoutDocument } from "@/__generated__/graphql";
import { UserInfo } from "@/shared/components/custom-ui/user-info/UserInfo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { PAGES } from "@/shared/config/page.config";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type PropsWithChildren } from "react";

export function LogoutProfile() {
  const [isOpen, setIsOpen] = useState(false)
  
  const [logout, { loading }] = useMutation(LogoutDocument)

  const client = useApolloClient()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      await client.clearStore()

      router.push(PAGES.LOGIN)
    } catch (error) {
      console.error('Ошибка выхода', error)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <UserInfo
          avatarUrl=""
          name="Sergey"
          email='d.c.0303@mail.ru'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-700 bg-gray-200 text-sm transition-colors">
        <DropdownMenuItem className="focus:bg-gray-300">
          <UserIcon className="text-gray-600"/>
            Профиль
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-red-300"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOutIcon className="text-gray-600"/>
            Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


