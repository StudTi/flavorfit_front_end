'use client'
import Link from "next/link";
import type { IMenuItem } from "./nav-menu.types";
import { cn } from "@/shared/utils";

interface Props {
  menuItem: IMenuItem
  isActive: boolean
}

export function NavMenuItem({isActive, menuItem}: Props) {
  return (
    <Link
      href={menuItem.href}
      className={cn(
        'flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-[#1f2023] text-white'
          : 'text-gray-800 bg-[#e9e9e9] hover:bg-gray-300'
      )}
    >
      <menuItem.icon
        className="size-4"
        aria-hidden="true"
      />
      <span>{menuItem.label}</span>
    </Link>
  )
}