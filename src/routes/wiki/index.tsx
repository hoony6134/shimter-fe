import { createFileRoute } from '@tanstack/react-router'
import WikiIndex from '@/pages/wiki/wiki-index' // UI는 pages에서 가져오기

export const Route = createFileRoute('/wiki/')({
  component: WikiIndex,
})
