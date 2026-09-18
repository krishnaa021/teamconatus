import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import Filters from '../components/Filters.jsx'
import NewsList from '../components/NewsList.jsx'
import { searchArticles } from '../api/guardianApi.js'
import { wrap } from '../lib/layout.js'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const section = searchParams.get('section') || ''

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await searchArticles({ query, section, page: 1 })
        if (cancelled) return
        setArticles(data.results)
        setPage(1)
        setPages(data.pages)
      } catch (err) {
        if (cancelled) return
        setError(
          'Something went wrong while fetching the news. Check your API key and connection.'
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [query, section, retryCount])

  async function handleLoadMore() {
    const nextPage = page + 1
    setLoadingMore(true)
    try {
      const data = await searchArticles({ query, section, page: nextPage })
      setArticles((prev) => [...prev, ...data.results])
      setPage(data.currentPage)
    } catch (err) {
      setError('Could not load more articles. Please try again.')
    } finally {
      setLoadingMore(false)
    }
  }

  function handleSearch(value) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set('q', value)
    } else {
      next.delete('q')
    }
    setSearchParams(next)
  }

  function handleSelectSection(id) {
    const next = new URLSearchParams(searchParams)
    if (id) {
      next.set('section', id)
    } else {
      next.delete('section')
    }
    setSearchParams(next)
  }

  return (
    <div className={`${wrap} pb-12 pt-7`}>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar initialValue={query} onSearch={handleSearch} />
        <Filters activeSection={section} onSelect={handleSelectSection} />
      </div>

      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        onRetry={() => setRetryCount((c) => c + 1)}
        hasMore={page < pages}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </div>
  )
}
