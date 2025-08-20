import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPostList } from '@/data/post'
import type { PostDto } from '@/types/post'

const CommunityPage = () => {
  const [posts, setPosts] = useState<PostDto[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const take = 10

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true)
      const skip = (page - 1) * take
      const response = await getPostList(skip, take)
      setPosts(response.posts)
      setTotal(response.total)
      setError(null)
    } catch (err) {
      console.error('포스트 목록 조회 실패:', err)
      setError('포스트를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(total / take)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 및 글쓰기 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">총 {total}개의 글이 있습니다.</p>
        </div>
        <Link to="/community/write">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {/* 포스트 목록 */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-gray-500 mb-4">아직 작성된 글이 없습니다.</p>
                <Link to="/community/write">
                  <Button>첫 번째 글 작성하기</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to="/community/$id" params={{ id: post.id }}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer mb-4">
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum =
              Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
            if (pageNum > totalPages) return null

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommunityPage
