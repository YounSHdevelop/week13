'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { deletePost } from '@/src/services/postApi'
import { getEditToken, removeEditToken } from '@/src/lib/editTokens'

interface Props {
  id: number
}

export default function PostActions({ id }: Props) {
  const router = useRouter()
  const [hasToken, setHasToken] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    setHasToken(getEditToken(id) !== null)
  }, [id])

  async function handleDelete() {
    if (deleting) return
    const token = getEditToken(id)
    if (!token) return
    if (!confirm('이 글을 삭제할까요?')) return
    setDeleting(true)
    setMessage(null)
    try {
      await deletePost(id, token)
      removeEditToken(id)
      router.push('/posts')
      router.refresh()
    } catch (e) {
      setMessage(e instanceof Error ? e.message : '삭제에 실패했습니다.')
      setDeleting(false)
    }
  }

  if (!hasToken) return null
  return (
    <>
      <Link href={`/posts/${id}/edit`} className="button" prefetch={false}>수정</Link>
      <button type="button" className="button danger" onClick={handleDelete} disabled={deleting}>
        {deleting ? '삭제 중…' : '삭제'}
      </button>
      {message && <p className="notice">{message}</p>}
    </>
  )
}
