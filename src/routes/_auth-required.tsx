import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

import { useAuth } from '@/hooks/use-auth'

function AuthRequiredLayout() {
  const { user } = useAuth()

  if (user === undefined) return null
  else if (user === null)
    return <Navigate to="/" search={(prev) => ({ ...prev })} replace />
  else return <Outlet />
}

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
})
