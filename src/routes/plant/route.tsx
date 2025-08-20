import { createFileRoute } from '@tanstack/react-router'

import PlantLayout from '@/pages/plant/plant-layout'

export const Route = createFileRoute('/plant')({
  component: PlantLayout,
})
