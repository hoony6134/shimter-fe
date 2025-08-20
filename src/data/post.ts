import api from '@/lib/api'
import type { PostDto, PostListDto, CreatePostDto } from '@/types/post'

// 포스트 목록 조회
export const getPostList = async (
  skip: number,
  take: number,
): Promise<PostListDto> => {
  const response = await api.get('/post', {
    params: { skip, take },
  })
  return response.data
}

// 포스트 상세 조회
export const getPost = async (id: string): Promise<PostDto> => {
  const response = await api.get(`/post/${id}`)
  return response.data
}

// 포스트 생성
export const createPost = async (postData: CreatePostDto): Promise<PostDto> => {
  const response = await api.post('/post', postData)
  return response.data
}
