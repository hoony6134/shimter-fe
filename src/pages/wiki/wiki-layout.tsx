import { Outlet } from '@tanstack/react-router'

export default function WikiLayout() {
  return (
    <div className="flex items-center justify-start min-h-screen">
      <div className="flex flex-col items-start w-full min-h-screen">
        <div className="flex items-center mb-4 mt-24">
          <h1 className="font-bold flex items-baseline gap-3">
            <span className="text-4xl">
              <span className="text-red-600">G</span>IST{' '}
              <span className="text-black">Wiki</span>
            </span>
          </h1>
        </div>
        <p className="text-lg text-neutral-500 mb-12">
          캠퍼스 생활을 더 편리하게
        </p>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
