import { createFileRoute } from '@tanstack/react-router'

import CommunityLayout from '@/pages/community/community-layout'

export const Route = createFileRoute('/community')({
  component: CommunityLayout,
})
