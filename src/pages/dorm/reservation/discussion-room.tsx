import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState, useEffect } from 'react'

// 예약 상태 enum
enum ReservationStatus {
  AVAILABLE = 'available', // 예약 가능 (녹색)
  PARTIAL = 'partial', // 부분 예약 (주황색)
  FULL = 'full', // 예약 마감 (빨간색)
  DISABLED = 'disabled', // 예약 불가 (회색)
}

// 가상의 예약 데이터 (실제로는 API에서 가져올 데이터)
const mockReservationData: Record<string, ReservationStatus> = {
  '2025-08-19': ReservationStatus.PARTIAL,
  '2025-08-20': ReservationStatus.FULL,
  '2025-08-21': ReservationStatus.AVAILABLE,
  '2025-08-22': ReservationStatus.PARTIAL,
  '2025-08-23': ReservationStatus.AVAILABLE,
  '2025-08-24': ReservationStatus.AVAILABLE,
  '2025-08-25': ReservationStatus.FULL,
}

function DiscussionRoomReservation() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [applicantName, setApplicantName] = useState<string>('')

  useEffect(() => {
    const storedName = localStorage.getItem('name')
    setApplicantName(storedName || '홍길동')
  }, [])

  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    // 로컬 시간대 기준으로 YYYY-MM-DD 형식으로 포맷
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 1주일 후까지만 활성화
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    const oneWeekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return date < today || date > oneWeekFromToday
  }

  //   // 예약 상태에 따른 스타일 적용
  //   const getDateStatus = (date: Date): ReservationStatus => {
  //     // 로컬 시간대 기준으로 날짜 문자열 생성
  //     const year = date.getFullYear()
  //     const month = String(date.getMonth() + 1).padStart(2, '0')
  //     const day = String(date.getDate()).padStart(2, '0')
  //     const dateString = `${year}-${month}-${day}`
  //     return mockReservationData[dateString] || ReservationStatus.AVAILABLE
  //   }

  //   // 예약 마감된 날짜들
  //   const getDisabledDates = () => {
  //     const disabledDates: Date[] = []
  //     const today = new Date()
  //     const oneWeekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  //     // 오늘 이전 날짜들과 1주일 후 날짜들 비활성화
  //     for (
  //       let d = new Date('2025-01-01');
  //       d <= new Date('2025-12-31');
  //       d.setDate(d.getDate() + 1)
  //     ) {
  //       if (d < today || d > oneWeekFromToday) {
  //         disabledDates.push(new Date(d))
  //       }
  //     }

  //     // 예약 마감된 날짜들 비활성화
  //     Object.entries(mockReservationData).forEach(([dateString, status]) => {
  //       if (status === ReservationStatus.FULL) {
  //         disabledDates.push(new Date(dateString))
  //       }
  //     })

  //     return disabledDates
  //   }

  // 날짜별 modifiers 설정
  const getModifiers = () => {
    const modifiers: Record<string, Date[]> = {
      available: [],
      partial: [],
      full: [],
    }

    Object.entries(mockReservationData).forEach(([dateString, status]) => {
      const date = new Date(dateString + 'T00:00:00') // 로컬 시간대로 파싱
      if (!isDateDisabled(date)) {
        switch (status) {
          case ReservationStatus.AVAILABLE:
            modifiers.available.push(date)
            break
          case ReservationStatus.PARTIAL:
            modifiers.partial.push(date)
            break
          case ReservationStatus.FULL:
            modifiers.full.push(date)
            break
        }
      }
    })

    return modifiers
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold mb-4">구관 토론실 예약</h1>
      <p className="text-muted-foreground mb-6">
        예약을 원하시는 날짜와 시간을 선택해주세요. 예약은 오늘부터 1주일 후까지
        가능합니다.
      </p>
      <div className="mb-6 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
            modifiers={getModifiers()}
            modifiersStyles={{
              available: {
                backgroundColor: 'rgb(220 252 231)',
                color: 'rgb(22 101 52)',
                borderRadius: '0.375rem',
              },
              partial: {
                backgroundColor: 'rgb(254 215 170)',
                color: 'rgb(154 52 18)',
                borderRadius: '0.375rem',
              },
              full: {
                backgroundColor: 'rgb(254 202 202)',
                color: 'rgb(153 27 27)',
                cursor: 'not-allowed',
                borderRadius: '0.375rem',
              },
            }}
            className="w-full"
          />
          <div className="text-sm space-y-2">
            <div className="font-semibold">범례</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 border rounded"></div>
              <span>예약 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-200 border rounded"></div>
              <span>부분 예약</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 border rounded"></div>
              <span>예약 마감</span>
            </div>
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>예약 정보 확인</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="applicant">신청자</Label>
              <Input
                id="applicant"
                type="text"
                value={applicantName}
                disabled
                className="disabled:opacity-60 disabled:cursor-not-allowed bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">신청 날짜</Label>
              <Input
                id="date"
                type="text"
                value={formatDate(selectedDate)}
                disabled
                className="disabled:opacity-60 disabled:cursor-not-allowed bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start-time">시작 시간</Label>
              <Input
                id="start-time"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="bg-background"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-time">종료 시간</Label>
              <Input
                id="end-time"
                type="time"
                step="1"
                defaultValue="11:00:00"
                className="bg-background"
              />
            </div>
          </CardContent>

          <div className="flex-grow" />
          <CardFooter className="justify-end">
            <Button>예약하기</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default DiscussionRoomReservation
