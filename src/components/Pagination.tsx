import Link from 'next/link'

interface Props {
  page: number
  size: number
  total: number
  q: string
}

function href(page: number, q: string): string {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/posts${qs ? `?${qs}` : ''}`
}

export default function Pagination({ page, size, total, q }: Props) {
  const last = Math.max(1, Math.ceil(total / size))
  if (last === 1 && page === 1) return null
  const pages = Array.from({ length: last }, (_, i) => i + 1)
  return (
    <nav className="pagination" aria-label="페이지 이동">
      {page > 1 ? <Link href={href(page - 1, q)}>이전</Link> : <span className="off">이전</span>}
      {pages.map((p) =>
        p === page ? (
          <span key={p} className="current" aria-current="page">{p}</span>
        ) : (
          <Link key={p} href={href(p, q)}>{p}</Link>
        ),
      )}
      {page < last ? <Link href={href(page + 1, q)}>다음</Link> : <span className="off">다음</span>}
    </nav>
  )
}
