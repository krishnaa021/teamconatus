import { Link } from 'react-router-dom'
import NewsList from '../components/NewsList.jsx'
import { useArticleFeed } from '../hooks/useArticleFeed.js'
import { wrap } from '../lib/layout.js'

// The Guardian API doesn't have a "blog" content type, but "commentisfree"
// is their opinion/commentary section (historically branded "Comment is
// free") — the closest match to blog-style writing in their catalog.
export default function Blog() {
  const { articles, loading, loadingMore, error, hasMore, loadMore, retry } =
    useArticleFeed({ section: 'commentisfree' })

  return (
    <div className={`${wrap} pb-16 pt-10`}>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to Dispatch
      </Link>

      <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-navy">
        Dispatch Blog
      </span>
      <h1 className="mb-8 text-3xl">Opinion &amp; commentary</h1>

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