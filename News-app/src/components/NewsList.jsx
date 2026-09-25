import NewsItem from './NewsItem.jsx'
import FeaturedArticle from './FeaturedArticle.jsx'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

export default function NewsList({
  articles,
  loading,
  error,
  onRetry,
  hasMore,
  onLoadMore,
  loadingMore,
  featured = false,
}) {
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (loading) {
    return <Loader />
  }

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center text-meta">
        <p>No articles match that search. Try a different keyword or section.</p>
      </div>
    )
  }

  const [topStory, ...restArticles] = articles
  const showFeatured = featured && Boolean(topStory)
  const gridArticles = showFeatured ? restArticles : articles

  return (
    <>
      {showFeatured && <FeaturedArticle article={topStory} />}

      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {gridArticles.map((article) => (
          <NewsItem key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            className="rounded-sm border border-navy px-6 py-2.5 font-semibold text-navy hover:bg-navy hover:text-paper disabled:cursor-default disabled:opacity-50"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </>
  )
}