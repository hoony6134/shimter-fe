import DormReservationIndex from '@/pages/dorm/reservation/reservation-index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dorm/reservation/')({
  component: DormReservationIndex,
})
