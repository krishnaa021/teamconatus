import { Link } from 'react-router-dom'

function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function NewsItem({ article }) {
  const { id, webTitle, sectionName, fields = {} } = article
  const image = fields.thumbnail
  const summary = fields.trailText?.replace(/<[^>]+>/g, '')

  return (
    <article>
      <Link to={`/article/${id}`} className="group block" state={{ preview: article }}>
        <div className="mb-3 aspect-[16/10] overflow-hidden bg-paper-tint">
          {image ? (
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center font-display text-lg italic text-rule"
              aria-hidden="true"
            >
              Dispatch
            </div>
          )}
        </div>
        <div>
          <span className="mb-1.5 inline-block text-[0.72rem] font-semibold uppercase tracking-wide text-navy">
            {sectionName}
          </span>
          <h3 className="mb-2 text-xl group-hover:text-blue group-hover:underline">
            {webTitle}
          </h3>
          {summary && <p className="mb-2 text-sm text-ink-soft">{summary}</p>}
          <span className="text-xs text-meta">{formatDate(fields.firstPublicationDate)}</span>
        </div>
      </Link>
    </article>
  )
}
