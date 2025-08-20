import { createFileRoute } from '@tanstack/react-router'

import PlantDetailPage from '@/pages/plant/plant-detail-page'

export const Route = createFileRoute('/plant/$id')({
  component: PlantDetailPage,
})
