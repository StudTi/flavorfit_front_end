import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../../ui/avatar"

interface Props {
  avatarUrl: string
  name: string
  email: string
}

export function UserInfo({ avatarUrl, name, email }: Props) {
  return <div className="flex items-center gap-3">

    <Avatar>
      <AvatarImage src="/images/icons/chicken.png" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>

    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs opacity-60">{email}</p>
    </div>

  </div>
}

