import WikiLayout from '@/pages/wiki/wiki-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wiki')({
  component: WikiLayout,
})
