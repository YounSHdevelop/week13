import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="empty">
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link href="/posts" className="button">게시글 목록으로</Link>
    </div>
  )
}
