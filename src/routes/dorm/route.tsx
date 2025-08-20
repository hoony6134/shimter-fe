import DormLayout from '@/pages/dorm/dorm-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dorm')({
  component: DormLayout,
})
