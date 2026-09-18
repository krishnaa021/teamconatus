import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { fetchArticleById } from '../api/guardianApi.js'
import { wrap } from '../lib/layout.js'

function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const backLinkClass = 'mb-6 inline-block text-sm font-semibold text-navy hover:underline'

export default function ArticleDetail() {

  const params = useParams()
  const id = params['*']
  const location = useLocation()
  const preview = location.state?.preview

  const [article, setArticle] = useState(preview || null)
  const [loading, setLoading] = useState(!preview)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchArticleById(id)
        if (!cancelled) setArticle(data)
      } catch (err) {
        if (!cancelled) {
          setError('This article could not be loaded. It may have been moved or removed.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading && !article) {
    return (
      <div className={`${wrap} max-w-[720px] pb-16 pt-7`}>
        <Loader label="Loading article…" />
      </div>
    )
  }

  if (error && !article) {
    return (
      <div className={`${wrap} max-w-[720px] pb-16 pt-7`}>
        <ErrorMessage message={error} />
        <Link to="/" className={backLinkClass}>
          &larr; Back to Dispatch
        </Link>
      </div>
    )
  }

  const fields = article.fields || {}
  const paragraphs = fields.bodyText
    ? fields.bodyText.split('\n').filter((p) => p.trim().length > 0)
    : []

  return (
    <article className={`${wrap} max-w-[720px] pb-16 pt-7`}>
      <Link to="/" className={backLinkClass}>
        &larr; Back to Dispatch
      </Link>

      <span className="mb-2.5 inline-block text-xs font-semibold uppercase tracking-wide text-navy">
        {article.sectionName}
      </span>
      <h1 className="mb-3.5 text-3xl lg:text-4xl">{article.webTitle}</h1>

      <div className="mb-5 flex flex-wrap gap-3.5 border-b border-rule pb-5 text-sm text-meta">
        {fields.byline && <span>{fields.byline}</span>}
        <span>{formatDate(fields.firstPublicationDate)}</span>
      </div>

      {fields.thumbnail && (
        <div className="mb-6">
          <img src={fields.thumbnail} alt="" />
        </div>
      )}

      <div className="flex flex-col gap-4 text-[1.05rem] text-ink">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p>{fields.trailText}</p>
        )}
      </div>

      <a
        className="mt-8 inline-block font-semibold text-blue hover:underline"
        href={article.webUrl}
        target="_blank"
        rel="noreferrer"
      >
        Read the full story on theguardian.com &rarr;
      </a>
    </article>
  )
}
