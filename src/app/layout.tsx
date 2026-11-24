import type { ReactNode } from 'react'
import Header from '@/src/components/Header'
import './globals.css'

export const metadata = { title: '익명 게시판' }

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="main">
          <div className="panel">{children}</div>
        </main>
        <footer className="footer">익명 게시판 · 고급웹프로그래밍 13주차 실습</footer>
      </body>
    </html>
  )
}
