import { createFileRoute } from '@tanstack/react-router'

import PostDetailPage from '@/pages/community/post-detail-page'

export const Route = createFileRoute('/community/$id')({
  component: PostDetailPage,
})
