import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchArticles } from '../api/guardianApi.js'
import { wrap } from '../lib/layout.js'

export default function Ticker() {
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await searchArticles({ pageSize: 10 })
        if (!cancelled) setHeadlines(data.results)
      } catch (err) {
        if (!cancelled) setHeadlines([])
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (headlines.length === 0) return null

  const looped = [...headlines, ...headlines]

  return (
    <div className="overflow-hidden border-b border-rule bg-highlight/90">
      <div className={`${wrap} flex items-center gap-3 py-2`}>
        <span className="flex-none rounded-sm bg-navy px-2 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-paper">
          Latest
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
            {looped.map((article, index) => (
              <Link
                key={`${article.id}-${index}`}
                to={`/article/${article.id}`}
                state={{ preview: article }}
                className="whitespace-nowrap text-sm font-semibold text-ink hover:underline"
              >
                {article.webTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}