import { useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createPlant } from '@/data/plant'
import type { PlantDto } from '@/types/plant'

function PlantMainPage() {
  const navigate = useNavigate()
  const [plants, setPlants] = useState<PlantDto[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const initializePlants = async () => {
      try {
        setInitialLoading(true)
        // In a real app, you would fetch plants from an API
        // const userPlants = await getUserPlants()
        // setPlants(userPlants)
        setPlants([]) // Start with empty list
      } catch (error) {
        console.error('Failed to fetch plants:', error)
        toast.error('식물 목록을 불러오는데 실패했습니다.')
      } finally {
        setInitialLoading(false)
      }
    }

    initializePlants()
  }, [])

  const handleCreatePlant = async () => {
    try {
      setLoading(true)
      const newPlant = await createPlant()

      // Ensure the plant has the required array properties
      const safeNewPlant: PlantDto = {
        ...newPlant,
        logs: newPlant.logs || [],
        diseaseLogs: newPlant.diseaseLogs || [],
      }

      setPlants([...plants, safeNewPlant])
      toast.success('새로운 식물을 생성했습니다!')
    } catch (error) {
      console.error('Failed to create plant:', error)
      toast.error('식물 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">내 식물 목록</h2>
        <Button onClick={handleCreatePlant} disabled={loading}>
          {loading ? '생성 중...' : '새 식물 등록'}
        </Button>
      </div>

      {plants.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-lg text-muted-foreground mb-4">
                등록된 식물이 없습니다
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                새로운 식물을 등록하여 건강 상태를 모니터링해보세요
              </p>
              <Button onClick={handleCreatePlant} disabled={loading}>
                {loading ? '생성 중...' : '첫 식물 등록하기'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => (
            <Card key={plant.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌿 식물 #{plant.id.slice(-6)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">전체 기록:</span>
                    <span>{plant.logs?.length || 0}개</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">질병 기록:</span>
                    <span className="text-red-600">
                      {plant.diseaseLogs?.length || 0}개
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">해결된 질병:</span>
                    <span className="text-green-600">
                      {plant.diseaseLogs?.filter((log) => log.overcome)
                        .length || 0}
                      개
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      navigate({ to: `/plant/${plant.id}` })
                    }}
                  >
                    상세 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlantMainPage
