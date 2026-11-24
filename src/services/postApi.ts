import type {
  ApiErrorResponse,
  CreatePostResponse,
  PostDetail,
  PostInput,
  PostListQuery,
  PostListResponse,
} from '@/src/types/post'

function baseUrl(): string {
  if (typeof window !== 'undefined') return ''
  // API_BASE_URL이 없으면 현재 실행 중인 포트로 요청
  const base = process.env.API_BASE_URL?.trim() || `http://localhost:${process.env.PORT || 3000}`
  return base.replace(/\/$/, '')
}

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return typeof value === 'object' && value !== null && 'message' in value && typeof value.message === 'string'
}

async function send(path: string, init?: RequestInit): Promise<Response> {
  let response: Response
  try {
    response = await fetch(baseUrl() + path, {
      cache: 'no-store',
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    throw new ApiError(0, '서버에 연결할 수 없습니다.')
  }
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    throw new ApiError(response.status, isApiErrorResponse(body) ? body.message : `요청 실패 (${response.status})`)
  }
  return response
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await send(path, init)
  return (await response.json()) as T
}

const bearer = (token: string) => ({ Authorization: `Bearer ${token}` })

export function getPosts(query: PostListQuery = {}): Promise<PostListResponse> {
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.page) params.set('page', String(query.page))
  if (query.size) params.set('size', String(query.size))
  const qs = params.toString()
  return request<PostListResponse>(`/api/posts${qs ? `?${qs}` : ''}`)
}

export function getPost(id: number, countView = true): Promise<PostDetail> {
  return request<PostDetail>(`/api/posts/${id}${countView ? '' : '?view=0'}`)
}

export function createPost(input: PostInput): Promise<CreatePostResponse> {
  return request<CreatePostResponse>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updatePost(id: number, input: PostInput, token: string): Promise<PostDetail> {
  return request<PostDetail>(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: bearer(token),
    body: JSON.stringify(input),
  })
}

export async function deletePost(id: number, token: string): Promise<void> {
  await send(`/api/posts/${id}`, { method: 'DELETE', headers: bearer(token) })
}
