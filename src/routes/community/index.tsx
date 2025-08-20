import { createFileRoute } from '@tanstack/react-router'

import CommunityPage from '@/pages/community/community-page'

export const Route = createFileRoute('/community/')({
  component: CommunityPage,
})
