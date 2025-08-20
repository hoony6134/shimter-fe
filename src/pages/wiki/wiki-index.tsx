import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

export default function WikiIndex() {
  const cardFx =
    'border-2 border-blue-500 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'

  const linkFx =
    'relative inline-block text-blue-600 text-sm font-semibold ' +
    "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 " +
    'after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 ' +
    'hover:after:w-full'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            개요
            <a href="#" className={linkFx}>
              더 알아보러 가기
            </a>
          </CardTitle>
          <CardDescription className="text-base">
            GIST (광주과학기술원)의 기본정보
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            대학원
            <a href="#" className={linkFx}>
              더 알아보러 가기
            </a>
          </CardTitle>
          <CardDescription className="text-base">
            광주과학기술원 대학원의 기본정보
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            학부생 특전
            <a href="#" className={linkFx}>
              더 알아보러 가기
            </a>
          </CardTitle>
          <CardDescription className="text-base">
            GIST 학부생이 누릴 수 있는 특전
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            기숙사
            <a href="#" className={linkFx}>
              더 알아보러 가기
            </a>
          </CardTitle>
          <CardDescription className="text-base">
            학부, 대학원생 기숙사에 대한 정보
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            교육 과정
            <a href="#" className={linkFx}>
              더 알아보러 가기
            </a>
          </CardTitle>
          <CardDescription className="text-base">
            학부 전공과정의 교육과정에 대한 정보
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className={cardFx}>
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center justify-between text-2xl font-bold text-black">
            +
            <Link to="/wiki/new" className={linkFx}>
              새로운 글 작성하러 가기
            </Link>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
