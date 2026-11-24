import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="empty">
      <h2>게시글을 찾을 수 없습니다.</h2>
      <p>삭제되었거나 없는 글입니다.</p>
      <Link href="/posts" className="button">목록으로</Link>
    </div>
  )
}
