import { notFound } from 'next/navigation'
import PostView from '@/src/components/PostView'
import ErrorMessage from '@/src/components/ErrorMessage'
import { ApiError, getPost } from '@/src/services/postApi'
import type { PostDetail } from '@/src/types/post'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params
  const postId = Number(id)
  if (!Number.isSafeInteger(postId) || postId < 1) notFound()

  let post: PostDetail
  try {
    post = await getPost(postId)
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound()
    return <ErrorMessage message={e instanceof Error ? e.message : '알 수 없는 오류'} />
  }
  return <PostView post={post} />
}
