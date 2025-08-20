import { Card } from '@/components/ui/card'
import { IconChevronRight, IconHome } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

function DormReservationIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">기숙사 공용 공간 예약</h1>
      <p className="text-muted-foreground mb-6">
        아래에서 원하는 공간을 선택하여 예약할 수 있습니다.
      </p>
      <div className="h-full grid grid-cols-2 gap-6">
        <div className="*:w-full">
          <Link
            to="/dorm/reservation/dorm-a-discussion-room"
            className="relative group cursor-pointer overflow-hidden mb-6 block"
          >
            <img
              src="/images/dorm_a_discussion.png"
              alt="Dormitory A Discussion Room"
              className="w-full h-auto rounded-xl shadow-md"
            />
            <div className="absolute inset-0 rounded-xl bg-black/40 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/40 transition-colors pointer-events-none" />
            <div className="absolute top-8 left-8 right-8 text-white pointer-events-none">
              <h1 className="text-3xl font-bold drop-shadow mb-2">
                구관 토론실
              </h1>
              <p className="text-sm leading-relaxed">
                학사기숙사 A동 2층에 위치한 회의 공간으로, 예약자 우선 사용
                제도로 운영됩니다. 취식은 가능하나, 독서실이 근처에 있어 음주는
                금지되어 있습니다.
              </p>
            </div>
            <div className="absolute bottom-6 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="pointer-events-none">
                <Card className="px-4 py-3 hover:shadow-lg transition-all bg-transparent border-transparent text-white shadow-none">
                  <span className="font-semibold text-base flex items-center gap-2">
                    <IconHome className="inline-block" /> 예약 페이지로 이동
                    <IconChevronRight />
                  </span>
                </Card>
              </div>
            </div>
          </Link>
        </div>
        <div className="*:w-full">
          <Link
            to="/dorm/reservation/dorm-a-discussion-room"
            className="relative group cursor-pointer overflow-hidden mb-6 block"
          >
            <img
              src="/images/dorm_a_discussion.png"
              alt="Dormitory A Discussion Room"
              className="w-full h-auto rounded-xl shadow-md"
            />
            <div className="absolute inset-0 rounded-xl bg-black/40 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/40 transition-colors pointer-events-none" />
            <div className="absolute top-8 left-8 right-8 text-white pointer-events-none">
              <h1 className="text-3xl font-bold drop-shadow mb-2">
                해동학술정보실
              </h1>
              <p className="text-sm leading-relaxed">
                학사기숙사 B동 1층에 위치한 종합 커뮤니티 공간으로, 예약자 우선
                사용 제도로 운영됩니다. 취식 및 음주가 모두 금지되어 있는
                공간입니다.
              </p>
            </div>
            <div className="absolute bottom-6 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="pointer-events-none">
                <Card className="px-4 py-3 hover:shadow-lg transition-all bg-transparent border-transparent text-white shadow-none">
                  <span className="font-semibold text-base flex items-center gap-2">
                    <IconHome className="inline-block" /> 예약 페이지로 이동
                    <IconChevronRight />
                  </span>
                </Card>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DormReservationIndex
