import { Link, Outlet } from '@tanstack/react-router'

function CommunityLayout() {
  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex flex-col items-start w-full min-h-screen">
        <div className="flex items-center mb-4 mt-24">
          <Link to="/community">
            <h1 className="text-4xl font-bold mr-4 text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-500">
              커뮤니티
            </h1>
          </Link>
        </div>
        <p className="text-lg text-neutral-500 mb-8">
          커뮤니티에서 작물 관련 정보와 팁을 공유하고, 다른 사용자들과
          소통해보세요.
        </p>
        <div className="w-full mb-24">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CommunityLayout
