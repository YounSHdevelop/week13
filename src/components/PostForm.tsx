'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createPost, updatePost } from '@/src/services/postApi'
import { validatePost } from '@/src/lib/validation'
import { getEditToken, saveEditToken } from '@/src/lib/editTokens'
import type { PostDetail } from '@/src/types/post'

interface Props {
  post?: PostDetail
}

export default function PostForm({ post }: Props) {
  const router = useRouter()
  const isEdit = post !== undefined
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    const input = { title: title.trim(), content: content.trim() }
    const error = validatePost(input)
    if (error) {
      setMessage(error)
      return
    }
    setSubmitting(true)
    setMessage(null)
    try {
      let id: number
      if (isEdit) {
        const token = getEditToken(post.id)
        if (!token) throw new Error('이 브라우저에 이 글의 관리 토큰이 없어 수정할 수 없습니다.')
        id = (await updatePost(post.id, input, token)).id
      } else {
        const created = await createPost(input)
        saveEditToken(created.post.id, created.editToken)
        id = created.post.id
      }
      router.push(`/posts/${id}`)
    } catch (e) {
      setMessage(e instanceof Error ? e.message : '저장에 실패했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        제목
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} disabled={submitting} />
      </label>
      <label>
        본문
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} maxLength={5000} disabled={submitting} />
      </label>
      {message && <p className="notice">{message}</p>}
      <div className="actions">
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? '저장 중…' : isEdit ? '수정' : '작성'}
        </button>
        <Link href={isEdit ? `/posts/${post.id}` : '/posts'} className="button secondary" prefetch={false}>
          취소
        </Link>
      </div>
    </form>
  )
}
