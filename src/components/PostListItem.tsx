import Link from 'next/link'
import type { PostSummary } from '@/src/types/post'
import { formatDate } from '@/src/lib/format'

interface Props {
  post: PostSummary
  isNew: boolean
}

export default function PostListItem({ post, isNew }: Props) {
  return (
    <tr>
      <td className="num col-num">{post.id}</td>
      <td>
        {/* 상세 조회 시 조회수가 증가하므로 prefetch 끔 */}
        <Link href={`/posts/${post.id}`} prefetch={false} className="title-link">{post.title}</Link>
        {isNew && <span className="badge-new" aria-label="새 글">N</span>}
      </td>
      <td className="col-author">{post.author}</td>
      <td className="col-date">{formatDate(post.createdAt)}</td>
      <td className="num col-views">{post.views}</td>
    </tr>
  )
}
