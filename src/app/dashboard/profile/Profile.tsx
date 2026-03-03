import { useGetProfileQuery } from "@/__generated__/output"

export function Profile() {
  const { } = useGetProfileQuery()
  
  return <div>Profile Page</div>

}
