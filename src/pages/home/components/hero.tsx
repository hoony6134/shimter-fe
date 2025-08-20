import { Link } from '@tanstack/react-router'

import Button from '@/components/button'

function Hero() {
  return (
    <div className="hero-section flex items-center justify-start h-screen">
      <div className="flex flex-col items-start w-full">
        <p className="text-lg text-emerald-600 mb-2 font-semibold">
          AI로 내 작물 건강 지키기
        </p>
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-500">
          심터
        </h1>
        <h1 className="text-5xl font-bold mb-4 leading-14">
          내 작물의 건강을
          <br />
          심터 AI와 함께 지켜요
        </h1>
        <p className="text-lg mb-6">
          작물 질병 진단, 모니터링과 관리 방법을 한 눈에
        </p>
        <div className="flex items-center justify-start w-full gap-4">
          <Link to="/auth/sign-up">
            <Button>바로 시작하기</Button>
          </Link>
          {/* <Button variant="outline">더 알아보기</Button> */}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <img
          src="/shimter_logo.png"
          alt="Hero"
          className="w-full max-w-md object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
