import type { PostInput } from '@/src/types/post'

export function validatePost(input: PostInput): string | null {
  const title = input.title.trim()
  const content = input.content.trim()
  if (title.length < 1 || title.length > 100) return '제목은 1~100자로 입력하세요.'
  if (content.length < 1 || content.length > 5000) return '본문은 1~5000자로 입력하세요.'
  return null
}
