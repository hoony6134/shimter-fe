import { createFileRoute } from '@tanstack/react-router'

import WritePage from '@/pages/community/write-page'

export const Route = createFileRoute('/community/write')({
  component: WritePage,
})
