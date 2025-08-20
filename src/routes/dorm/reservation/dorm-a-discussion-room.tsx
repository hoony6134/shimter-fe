import DiscussionRoomReservation from '@/pages/dorm/reservation/discussion-room'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dorm/reservation/dorm-a-discussion-room',
)({
  component: DiscussionRoomReservation,
})
