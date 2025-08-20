import { useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
} from '@/components/ui/timeline'
import { getPlant, createLog, createDiseaseLog } from '@/data/plant'
import type { PlantDto } from '@/types/plant'

function PlantDetailPage() {
  const { id } = useParams({ strict: false })
  const [plant, setPlant] = useState<PlantDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddingLog, setIsAddingLog] = useState(false)
  const [isAddingDiseaseLog, setIsAddingDiseaseLog] = useState(false)

  // Log form states
  const [logDescription, setLogDescription] = useState('')
  const [diseaseLogData, setDiseaseLogData] = useState({
    disease: '',
    description: '',
  })

  const diseaseOptions = [
    { value: 'powdery', label: '흰가루병' },
    { value: 'blight', label: '역병' },
    { value: 'rust', label: '녹병' },
    { value: 'spot', label: '반점병' },
    { value: 'wilt', label: '시들음병' },
    { value: 'rot', label: '썩음병' },
    { value: 'other', label: '기타' },
  ]

  const fetchPlant = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      const plantData = await getPlant(id)

      // Ensure the plant has the required array properties
      const safePlant: PlantDto = {
        ...plantData,
        logs: plantData.logs || [],
        diseaseLogs: plantData.diseaseLogs || [],
      }

      setPlant(safePlant)
    } catch (error) {
      console.error('Failed to fetch plant:', error)
      toast.error('식물 정보를 불러오는데 실패했습니다.')

      // Fallback to mock data for demo purposes
      const mockPlant: PlantDto = {
        id: id,
        logs: [
          {
            description: '물주기 완료',
            createdAt: new Date().toISOString(),
          },
        ],
        diseaseLogs: [],
      }
      setPlant(mockPlant)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchPlant()
  }, [fetchPlant])

  const handleAddLog = async () => {
    if (!logDescription.trim() || !plant) return

    try {
      setIsAddingLog(true)
      const updatedPlant = await createLog(plant.id, {
        description: logDescription,
      })
      setPlant(updatedPlant)
      setLogDescription('')
      toast.success('관리 기록이 추가되었습니다!')
    } catch (error) {
      console.error('Failed to add log:', error)
      toast.error('기록 추가에 실패했습니다.')
    } finally {
      setIsAddingLog(false)
    }
  }

  const handleAddDiseaseLog = async () => {
    if (!diseaseLogData.disease || !diseaseLogData.description.trim() || !plant)
      return

    try {
      setIsAddingDiseaseLog(true)
      const updatedPlant = await createDiseaseLog(plant.id, diseaseLogData)
      setPlant(updatedPlant)
      setDiseaseLogData({ disease: '', description: '' })
      toast.success('질병 기록이 추가되었습니다!')
    } catch (error) {
      console.error('Failed to add disease log:', error)
      toast.error('질병 기록 추가에 실패했습니다.')
    } finally {
      setIsAddingDiseaseLog(false)
    }
  }

  // Combine and sort all logs by date
  const getAllLogs = () => {
    if (!plant) return []

    const logs = plant.logs || []
    const diseaseLogs = plant.diseaseLogs || []

    const allLogs = [
      ...logs.map((log) => ({ ...log, type: 'log' as const })),
      ...diseaseLogs.map((log) => ({ ...log, type: 'disease' as const })),
    ]

    return allLogs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (!plant) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😞</div>
        <p className="text-lg text-muted-foreground">식물을 찾을 수 없습니다</p>
      </div>
    )
  }

  const allLogs = getAllLogs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🌿 식물 #{plant.id.slice(-6)}
          </h2>
          <p className="text-muted-foreground">
            총 {plant.logs?.length || 0}개의 관리 기록,{' '}
            {plant.diseaseLogs?.length || 0}개의 질병 기록
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">관리 기록 추가</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>관리 기록 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">기록 내용</label>
                  <Textarea
                    placeholder="물주기, 가지치기, 비료 등의 관리 내용을 기록해주세요"
                    value={logDescription}
                    onChange={(e) => setLogDescription(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={handleAddLog}
                  disabled={isAddingLog || !logDescription.trim()}
                  className="w-full"
                >
                  {isAddingLog ? '추가 중...' : '기록 추가'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>질병 기록 추가</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>질병 기록 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">질병 종류</label>
                  <Select
                    value={diseaseLogData.disease}
                    onValueChange={(value) =>
                      setDiseaseLogData((prev) => ({ ...prev, disease: value }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="질병을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {diseaseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    증상 및 대응 방법
                  </label>
                  <Textarea
                    placeholder="발견된 증상과 대응 방법을 상세히 기록해주세요"
                    value={diseaseLogData.description}
                    onChange={(e) =>
                      setDiseaseLogData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={handleAddDiseaseLog}
                  disabled={
                    isAddingDiseaseLog ||
                    !diseaseLogData.disease ||
                    !diseaseLogData.description.trim()
                  }
                  className="w-full"
                >
                  {isAddingDiseaseLog ? '추가 중...' : '질병 기록 추가'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">전체 기록:</span>
                <span className="font-medium">{plant.logs?.length || 0}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">질병 기록:</span>
                <span className="font-medium text-red-600">
                  {plant.diseaseLogs?.length || 0}개
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">해결된 질병:</span>
                <span className="font-medium text-green-600">
                  {plant.diseaseLogs?.filter((log) => log.overcome).length || 0}
                  개
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏥 현재 질병 상태</CardTitle>
          </CardHeader>
          <CardContent>
            {(plant.diseaseLogs?.filter((log) => !log.overcome) || [])
              .length === 0 ? (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm text-muted-foreground">
                  현재 활성 질병이 없습니다
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {(plant.diseaseLogs || [])
                  .filter((log) => !log.overcome)
                  .slice(0, 3)
                  .map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="capitalize">
                        {diseaseOptions.find((d) => d.value === log.disease)
                          ?.label || log.disease}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📅 최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            {allLogs.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  아직 기록이 없습니다
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {allLogs.slice(0, 3).map((log, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center gap-2">
                      {'disease' in log ? (
                        <span className="text-red-600">🦠</span>
                      ) : (
                        <span className="text-green-600">📝</span>
                      )}
                      <span className="text-muted-foreground">
                        {format(new Date(log.createdAt), 'MM/dd', {
                          locale: ko,
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6 truncate">
                      {log.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📜 전체 기록 타임라인</CardTitle>
        </CardHeader>
        <CardContent>
          {allLogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-muted-foreground">아직 기록이 없습니다</p>
              <p className="text-sm text-muted-foreground mt-2">
                관리 기록이나 질병 기록을 추가해보세요
              </p>
            </div>
          ) : (
            <Timeline>
              {allLogs.map((log, index) => (
                <TimelineItem key={index}>
                  <TimelineMarker
                    variant={
                      'disease' in log
                        ? log.overcome
                          ? 'success'
                          : 'danger'
                        : 'default'
                    }
                  />
                  <TimelineContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {'disease' in log ? (
                          <>
                            <span className="text-red-600">🦠</span>
                            <span className="font-medium">
                              질병 기록:{' '}
                              {diseaseOptions.find(
                                (d) => d.value === log.disease,
                              )?.label || log.disease}
                            </span>
                            {log.overcome && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                해결됨
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="text-green-600">📝</span>
                            <span className="font-medium">관리 기록</span>
                          </>
                        )}
                        <span className="text-sm text-muted-foreground ml-auto">
                          {format(
                            new Date(log.createdAt),
                            'yyyy년 MM월 dd일 HH:mm',
                            { locale: ko },
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        {log.description}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PlantDetailPage
