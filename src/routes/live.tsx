import { createFileRoute } from '@tanstack/react-router'

import Live from '@/pages/live/live-index'

export const Route = createFileRoute('/live')({
  component: Live,
})
