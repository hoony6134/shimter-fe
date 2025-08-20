import { createFileRoute } from '@tanstack/react-router'

import PlantMainPage from '@/pages/plant/plant-main-page'

export const Route = createFileRoute('/plant/')({
  component: PlantMainPage,
})
