export interface PostSummary {
  id: number
  title: string
  author: string
  createdAt: string
  views: number
}

export interface PostDetail extends PostSummary {
  content: string
}

export interface PostListQuery {
  q?: string
  page?: number
  size?: number
}

export interface PostListResponse {
  posts: PostSummary[]
  total: number
  page: number
  size: number
}

export interface PostInput {
  title: string
  content: string
}

export interface CreatePostResponse {
  post: PostDetail
  editToken: string
}

export interface ApiErrorResponse {
  message: string
}
