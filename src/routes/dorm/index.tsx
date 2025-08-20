import DormIndex from '@/pages/dorm/dorm-index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dorm/')({
  component: DormIndex,
})
