export interface PostDto {
  id: string
  title: string
  content: string
}

export interface PostListDto {
  posts: PostDto[]
  total: number
}

export interface CreatePostDto {
  title: string
  content: string
}
