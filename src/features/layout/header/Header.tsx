'use client'
import { NavMenu } from "@/shared/components/custom-ui/nav-menu/NavMenu";
import { navMenuItems } from "./nav.data";
import Link from "next/link";
import { PAGES } from "@/shared/config/page.config";
import { Logo } from "@/shared/components/ui/Logo";
import { Button } from "@/shared/components/ui/button";
import { Bell, Headset } from "lucide-react";
import { useAuth } from "@/features/hooks/useAuth";
import { LogoutProfile } from "./LogoutProfile";

export function Header() {
  const {user} = useAuth()
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center gap-9">
        <Link
          href={PAGES.DASHBOARD}
          className='flex size-10 items-center justify-center'
        >
          <Logo
            className="size-9"
          />
        </Link>
        <NavMenu menu={navMenuItems}/>
      </div>

      <div className="flex items-center">
        <Button
          variant="soft"
          size="icon"
          className="rounded-full mr-2.5"
        >
          <Headset className="size-4.5"/>
        </Button>
        <Button
          variant="soft"
          size="icon"
          className="mr-4 rounded-full">
          <Bell className="size-4.5"/>
        </Button>

        <LogoutProfile />
      </div>
    </header>
  )
}