import { Link } from '@tanstack/react-router'

import Button from '@/components/button'

export default function Header() {
  return (
    <header className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border-b border-white/30 dark:border-black/30 fixed top-0 left-0 w-full z-50">
      <nav className="mx-6 md:mx-12 lg:mx-24 xl:mx-48 py-4 flex flex-row items-center">
        <Link to="/">
          <span className="font-semibold text-xl">
            <img src="/logo.png" alt="Logo" className="h-6 inline-block mr-2" />
            Campass
          </span>
        </Link>
        <div className="flex-grow" />
        <div className="text-sm gap-4 md:gap-8 lg:gap-12 xl:gap-16 flex items-center">
          <Link
            to="/"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            서비스 소개
          </Link>
          <Link
            to="/wiki"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            위키
          </Link>
          <Link
            to="/"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            시간표 관리
          </Link>
          <Link
            to="/dorm"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            기숙사
          </Link>
          <Link
            to="/auth/sign-in"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            로그인
          </Link>
          <Link
            to="/auth/sign-up"
            className="hover:font-semibold transition-all relative after:content-[''] after:block after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1"
          >
            회원가입
          </Link>
          <Link to="/auth/sign-up">
            <Button
              children="바로 시작하기"
              variant="primary"
              className="bg-gradient-to-br from-blue-600 to-teal-500"
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
