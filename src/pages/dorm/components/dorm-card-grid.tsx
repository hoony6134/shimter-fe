import {
  IconBox,
  IconBulb,
  IconCalendarCheck,
  IconChecklist,
  IconChevronRight,
  IconHome,
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

import { Card } from '@/components/ui/card'

function DormCardGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <Link to="/dorm/info">
        <Card className="hover:shadow-xl transition-all group">
          <span className="font-semibold text-xl ml-4 flex items-center justify-between">
            <span>
              <IconHome className="inline-block mr-2" /> GIST 하우스 소개
            </span>
            <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity mr-4" />
          </span>
        </Card>
      </Link>
      <Link to="/dorm/reservation">
        <Card className="hover:shadow-xl transition-all group">
          <span className="font-semibold text-xl ml-4 flex items-center justify-between">
            <span>
              <IconCalendarCheck className="inline-block mr-2" /> 공용 시설 예약
            </span>
            <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity mr-4" />
          </span>
        </Card>
      </Link>
      <Card className="hover:shadow-xl transition-all group">
        <span className="font-semibold text-xl ml-4 flex items-center justify-between">
          <span>
            <IconChecklist className="inline-block mr-2" /> 퇴사/유지검사 신청
          </span>
          <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity mr-4" />
        </span>
      </Card>
      <Link to="/dorm/tip">
        <Card className="hover:shadow-xl transition-all group">
          <span className="font-semibold text-xl ml-4 flex items-center justify-between">
            <span>
              <IconBulb className="inline-block mr-2" /> 생활관 사용 팁
            </span>
            <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity mr-4" />
          </span>
        </Card>
      </Link>
      <Card className="hover:shadow-xl transition-all group">
        <span className="font-semibold text-xl ml-4 flex items-center justify-between">
          <span>
            <IconBox className="inline-block mr-2" /> 창고 사용 신청
          </span>
          <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity mr-4" />
        </span>
      </Card>
    </div>
  )
}

export default DormCardGrid
