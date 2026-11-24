import Link from 'next/link'
import PostList from '@/src/components/PostList'
import SearchForm from '@/src/components/SearchForm'
import Pagination from '@/src/components/Pagination'
import ErrorMessage from '@/src/components/ErrorMessage'
import { getPosts } from '@/src/services/postApi'
import type { PostListResponse } from '@/src/types/post'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 10

interface Props {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>
}

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? ''

export default async function PostsPage({ searchParams }: Props) {
  const sp = await searchParams
  const q = first(sp.q).trim()
  const parsed = Number(first(sp.page))
  const page = Number.isSafeInteger(parsed) && parsed >= 1 ? parsed : 1

  let data: PostListResponse | null = null
  let error: string | null = null
  try {
    data = await getPosts({ q, page, size: PAGE_SIZE })
  } catch (e) {
    error = e instanceof Error ? e.message : '알 수 없는 오류'
  }

  const emptyMessage = q
    ? `"${q}" 제목의 게시글이 없습니다.`
    : page > 1
      ? '이 페이지에는 게시글이 없습니다.'
      : '아직 게시글이 없습니다. 첫 글을 남겨 보세요.'

  return (
    <>
      <div className="page-head">
        <h1>게시글 목록{data && <span className="count">{data.total}</span>}</h1>
        <Link href="/posts/new" className="button">글쓰기</Link>
      </div>
      <SearchForm q={q} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        data && (
          <>
            <PostList posts={data.posts} emptyMessage={emptyMessage} />
            <Pagination page={data.page} size={data.size} total={data.total} q={q} />
          </>
        )
      )}
    </>
  )
}
