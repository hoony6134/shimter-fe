import { createFileRoute } from '@tanstack/react-router'
import VerifySchoolPage from '@/pages/auth/verify'

export const Route = createFileRoute('/auth/verify')({
  component: VerifySchoolPage,
})