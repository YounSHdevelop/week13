'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function PostsError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="error-box" role="alert">
      <strong>문제가 생겼습니다.</strong>
      <p>잠시 후 다시 시도해 주세요.</p>
      <div className="actions">
        <button type="button" className="button" onClick={() => retry()}>다시 시도</button>
        <Link href="/posts" className="button secondary">목록으로</Link>
      </div>
    </div>
  )
}
