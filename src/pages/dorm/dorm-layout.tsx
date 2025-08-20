import { Link, Outlet } from '@tanstack/react-router'

function DormLayout() {
  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex flex-col items-start w-full min-h-screen">
        <div className="flex items-center mb-4 mt-24">
          <Link to="/dorm">
            <h1 className="text-4xl font-bold mr-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-teal-500">
              GIST HOUSE
            </h1>
          </Link>
          <p className="text-3xl font-semibold text-neutral-600">기숙사 업무</p>
        </div>
        <p className="text-lg text-neutral-500 mb-8">
          GIST 기숙사 생활과 관련한 정보를 확인하고, 공용 공간 예약 및 퇴사검사
          신청 등 기숙사 업무를 제공합니다.
        </p>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DormLayout
