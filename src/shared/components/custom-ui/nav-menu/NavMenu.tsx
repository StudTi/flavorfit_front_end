'use client'
import { usePathname } from "next/navigation";
import type { IMenuItem } from "./nav-menu.types";
import { NavMenuItem } from "./NavMenuItem";
import { match } from "path-to-regexp";

interface Props {
  menu: IMenuItem[]
}

export function NavMenu({ menu }: Props) {

  const pathname = usePathname()


  return (
    <nav className="flex items-center gap-2 pl-2">
      {menu.map(menuItem => (
        <NavMenuItem
          key={menuItem.href}
          menuItem={menuItem}
          isActive={!!match(menuItem.href)(pathname)}
        />
      ))}
    </nav>
  )
}