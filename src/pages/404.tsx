import { Link } from '@tanstack/react-router'

import Button from '@/components/button'

function Page404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <div className="max-w-lg mx-auto">
        {/* 404 큰 숫자 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-500 mb-4">
            404
          </h1>
        </div>

        {/* 메인 메시지 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-base text-gray-500">
            URL을 다시 확인하시거나 홈페이지로 돌아가세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="bg-gradient-to-br from-emerald-600 to-teal-500 min-w-32">
              홈으로 돌아가기
            </Button>
          </Link>
          <Button
            variant="outline"
            className="min-w-32"
            onClick={() => window.history.back()}
          >
            이전 페이지로
          </Button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">도움이 필요하신가요?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a
              href="mailto:campass@scian.xyz"
              className="text-emerald-600 hover:text-blue-800 hover:underline transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>

        {/* Campass 브랜딩 */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <img
              src="/logo.png"
              alt="Campass Logo"
              className="h-4 opacity-60"
            />
            <span className="text-sm font-medium">Campass</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Campass. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page404
