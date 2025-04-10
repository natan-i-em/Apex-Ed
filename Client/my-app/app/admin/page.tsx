import { RoleProtected } from "@/components/RoleProtected"

export default function AdminPage() {
  return (
    <RoleProtected allowedRoles={["Admin"]}>
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {/* Admin-only content */}
      </div>
    </RoleProtected>
  )
}
