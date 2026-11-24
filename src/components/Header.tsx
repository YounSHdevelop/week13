import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/posts" className="logo">
          <span className="logo-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </span>
          <span>
            <span className="logo-title">익명 게시판</span>
            <span className="logo-sub">편하게 이야기를 나누는 쉼터</span>
          </span>
        </Link>
        <nav className="nav" aria-label="주 메뉴">
          <Link href="/posts">목록</Link>
          <Link href="/posts/new">글쓰기</Link>
        </nav>
      </div>
    </header>
  )
}
