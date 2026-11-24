import Form from 'next/form'
import Link from 'next/link'

interface Props {
  q: string
}

export default function SearchForm({ q }: Props) {
  return (
    <Form action="/posts" className="search" role="search">
      <div className="search-field">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input name="q" defaultValue={q} placeholder="제목으로 검색" maxLength={100} aria-label="제목 검색" />
      </div>
      <button type="submit" className="button">검색</button>
      {q && <Link href="/posts" className="button secondary">초기화</Link>}
    </Form>
  )
}
