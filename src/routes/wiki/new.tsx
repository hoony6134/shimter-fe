import { createFileRoute } from '@tanstack/react-router'
import NewWikiPage from '@/pages/wiki/wiki-new'

export const Route = createFileRoute('/wiki/new')({
  component: NewWikiPage,
})
