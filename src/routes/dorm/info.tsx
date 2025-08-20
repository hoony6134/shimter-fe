import DormInfo from '@/pages/dorm/dorm-info'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dorm/info')({
  component: DormInfo,
})
