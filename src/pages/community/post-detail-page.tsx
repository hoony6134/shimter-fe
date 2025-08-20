import { useParams, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPost } from '@/data/post'
import type { PostDto } from '@/types/post'

const PostDetailPage = () => {
  const { id } = useParams({ from: '/community/$id' })
  const navigate = useNavigate()
  const [post, setPost] = useState<PostDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const postData = await getPost(id)
        setPost(postData)
        setError(null)
      } catch (err) {
        console.error('포스트 조회 실패:', err)
        setError('포스트를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleGoBack = () => {
    navigate({ to: '/community' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="w-full mx-auto">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                {error || '포스트를 찾을 수 없습니다.'}
              </p>
              <Button onClick={handleGoBack}>목록으로 돌아가기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto">
      <div className="mb-4">
        <Button variant="outline" onClick={handleGoBack}>
          ← 목록으로 돌아가기
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl break-words">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap break-words">
              {post.content}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PostDetailPage
