'use client'

import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const RoleProtected = ({
  allowedRoles,
  children
}: {
  allowedRoles: string[],
  children: React.ReactNode
}) => {
  const { user } = useUser()
  console.log('user',user)
  
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (!allowedRoles.includes(user.role)) {
      router.push("/unauthorized")
    } else {
      setLoading(false)
    }
  }, [user])

  if (loading) return <div>Loading...</div>
  return <>{children}</>
}
