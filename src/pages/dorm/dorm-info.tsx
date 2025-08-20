import Button from '@/components/button'
import { IconExternalLink } from '@tabler/icons-react'

function DormInfo() {
  return (
    <div className="overflow-auto h-full pb-24">
      <h1 className="text-3xl font-bold mb-4">GIST 하우스 소개</h1>
      <h2 className="text-2xl font-bold mb-4">대학 생활관 현황</h2>
      <p className="text-lg text-neutral-600 mb-4">
        A동과 B동으로 나뉘는 GIST 학부의 대학 생활관은 다음과 같이 구성되어
        있습니다.
      </p>
      <a
        href="https://ewww.gist.ac.kr/cyber/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center">
          <IconExternalLink className="inline-block mr-2" /> 기숙사 사이버 투어
        </Button>
      </a>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>정원: 890명</li>
        <li>관리실: 1실</li>
        <li>독서실: 4실</li>
        <li>세면장: 각 호실마다 배치</li>
        <li>샤워실: 각 호실마다 배치</li>
        <li>세탁실: 4실</li>
        <li>체력단련실: 2실</li>
      </ul>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute inset-0 bg-black opacity-60 rounded-lg"></span>
          <img
            src="/images/dorm_a.png"
            alt="Dormitory"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-start p-12">
            <div className="flex flex-col text-white">
              <span className="mb-2">Dormitory Building A</span>
              <span className="text-xl font-bold mb-4">
                GIST 학사기숙사 A동
              </span>
              <ul className="list-disc pl-6 space-y-2">
                <li>1층: 관리실, 세탁실(남/여), 남자기숙사(I 하우스)</li>
                <li>2층: 동아리실, 체력단련실 2실, 남자기숙사 (G/I 하우스)</li>
                <li>3층: 독서실 3실, 남자기숙사 (G/I 하우스)</li>
                <li>4층: 남자기숙사 (G/I 하우스)</li>
                <li>5~6층: 여자기숙사 (G/I 하우스)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <span className="absolute inset-0 bg-black opacity-60 rounded-lg"></span>
          <img
            src="/images/dorm_b.png"
            alt="Dormitory"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-start p-12">
            <div className="flex flex-col text-white">
              <span className="mb-2">Dormitory Building B</span>
              <span className="text-xl font-bold mb-4">
                GIST 학사기숙사 B동
              </span>
              <ul className="list-disc pl-6 space-y-2">
                <li>1층: 해동학술정보실, 남자기숙사(T 하우스)</li>
                <li>2층: 동아리실, 세탁실(남/여), 남자기숙사 (S/T 하우스)</li>
                <li>3층: 독서실 1실, 남자기숙사 (S/T 하우스)</li>
                <li>4층: 남자기숙사 (S/T 하우스)</li>
                <li>5~6층: 여자기숙사 (S/T 하우스)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        호실별 지급 물품 및 비치 가구
      </h2>
      <ul className="grid grid-cols-2 list-disc pl-6 mb-8 space-y-2">
        <li>책상 2개</li>
        <li>의자 2개</li>
        <li>책꽂이 2개</li>
        <li>옷장 2개</li>
        <li>침대 2개</li>
        <li>매트리스 2개</li>
        <li>침구 세트 (대여 가능 - 20,000원)</li>
        <li>자동형 도어락</li>
        <li>에어컨 및 난방기</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">생활관 입사 원칙</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>2인 1실 입소 원칙</li>
        <li>정규학기 기준 학부 재학생은 전원 입소 대상</li>
        <li>연차 초과자 및 산학 재학생의 경우에도 입소 허용</li>
        <li>생활관의 입사 허가 기간은 봄, 가을 정규학기 단위로 함이 원칙</li>
        <li>난방 및 취사 기기 사용 금지</li>
      </ul>
    </div>
  )
}

export default DormInfo
