import Link from 'next/link'
import type { PostDetail } from '@/src/types/post'
import { formatDate } from '@/src/lib/format'
import PostActions from './PostActions'

interface Props {
  post: PostDetail
}

export default function PostView({ post }: Props) {
  return (
    <article>
      <h1 className="post-title">{post.title}</h1>
      <p className="meta">
        <span>{post.author}</span>
        <span>{formatDate(post.createdAt)}</span>
        <span>조회 {post.views}</span>
      </p>
      <div className="content">{post.content}</div>
      <div className="actions">
        <Link href="/posts" className="button secondary">목록으로</Link>
        <PostActions id={post.id} />
      </div>
    </article>
  )
}
