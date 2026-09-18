import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import Filters from '../components/Filters.jsx'
import NewsList from '../components/NewsList.jsx'
import { useArticleFeed } from '../hooks/useArticleFeed.js'
import { wrap } from '../lib/layout.js'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const section = searchParams.get('section') || ''

  const { articles, loading, loadingMore, error, hasMore, loadMore, retry } =
    useArticleFeed({ query, section })

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
        onRetry={retry}
        hasMore={hasMore}
        onLoadMore={loadMore}
        loadingMore={loadingMore}
      />
    </div>
  )
}