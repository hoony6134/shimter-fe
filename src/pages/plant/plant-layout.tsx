import { Link, Outlet } from '@tanstack/react-router'

function PlantLayout() {
  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex flex-col items-start w-full min-h-screen">
        <div className="flex items-center mb-4 mt-24">
          <Link to="/plant">
            <h1 className="text-4xl font-bold mr-4 text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-emerald-500">
              질병 모니터링
            </h1>
          </Link>
        </div>
        <p className="text-lg text-neutral-500 mb-8">
          작물의 상태를 모니터링하고, 질병 로그와 관리 기록을 추가하여 식물을
          건강하게 키워보세요.
        </p>
        <div className="w-full mb-24">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PlantLayout
