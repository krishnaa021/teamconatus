import { Link } from 'react-router-dom'

function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function FeaturedArticle({ article }) {
  const { id, webTitle, sectionName, fields = {} } = article
  const image = fields.thumbnail
  const summary = fields.trailText?.replace(/<[^>]+>/g, '')

  return (
    <article className="mb-10 border-b border-rule pb-10">
      <Link
        to={`/article/${id}`}
        state={{ preview: article }}
        className="group grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10"
      >
        <div className="order-2 lg:order-1">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-[#c70000]">
            {sectionName}
          </span>
          <h2 className="mb-3 font-display text-3xl leading-tight group-hover:text-blue group-hover:underline sm:text-4xl lg:text-[2.75rem]">
            {webTitle}
          </h2>
          {summary && <p className="mb-3 text-base text-ink-soft sm:text-lg">{summary}</p>}
          <span className="text-xs text-meta">{formatDate(fields.firstPublicationDate)}</span>
        </div>

        <div className="order-1 aspect-[16/10] overflow-hidden bg-paper-tint lg:order-2">
          {image ? (
            <img src={image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-lg italic text-rule">
              Dispatch
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}