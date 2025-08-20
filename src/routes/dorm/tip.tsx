import DormTip from '@/pages/dorm/dorm-tip'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dorm/tip')({
  component: DormTip,
})
