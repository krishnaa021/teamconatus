import { useEffect, useState } from 'react'
import { searchArticles } from '../api/guardianApi.js'


export function useArticleFeed({ query = '', section = '' }) {
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
          'Something went wrong while fetching articles. Check your API key and connection.'
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

  async function loadMore() {
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

  return {
    articles,
    loading,
    loadingMore,
    error,
    hasMore: page < pages,
    loadMore,
    retry: () => setRetryCount((c) => c + 1),
  }
}