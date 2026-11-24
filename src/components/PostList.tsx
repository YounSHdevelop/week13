import type { PostSummary } from '@/src/types/post'
import PostListItem from './PostListItem'

interface Props {
  posts: PostSummary[]
  emptyMessage: string
}

const DAY = 24 * 60 * 60 * 1000

export default function PostList({ posts, emptyMessage }: Props) {
  if (posts.length === 0) {
    return <p className="empty">{emptyMessage}</p>
  }
  const now = Date.now()
  return (
    <table className="post-table">
      <thead>
        <tr>
          <th className="num col-num">번호</th>
          <th>제목</th>
          <th className="col-author">작성자</th>
          <th className="col-date">작성일</th>
          <th className="num col-views">조회</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} isNew={now - Date.parse(post.createdAt) < DAY} />
        ))}
      </tbody>
    </table>
  )
}
