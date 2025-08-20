import Button from '@/components/button'

function Hero() {
  return (
    <div className="hero-section flex items-center justify-start h-screen">
      <div className="flex flex-col items-start w-full">
        <p className="text-lg text-blue-600 mb-2 font-semibold">
          캠퍼스 생활을 더 편리하게
        </p>
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-teal-500">
          Campass
        </h1>
        <h1 className="text-5xl font-bold mb-4 leading-14">
          학교 생활을 위한
          <br />
          스마트 캠퍼스 도우미
        </h1>
        <p className="text-lg mb-6">
          학교 정보 열람, 강의, 동아리, 커뮤니티 등 학교 생활에 필요한 모든 것을
          한 곳에서
        </p>
        <div className="flex items-center justify-start w-full gap-4">
          <Button>바로 시작하기</Button>
          <Button variant="outline">더 알아보기</Button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <img
          src="/hero-image.png"
          alt="Hero"
          className="w-full max-w-md object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
