import { Link } from 'react-router-dom'
import { wrap } from '../lib/layout.js'

export default function About() {
  return (
    <div className={`${wrap} max-w-[720px] pb-16 pt-10`}>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to Dispatch
      </Link>

      <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-navy">
        About
      </span>
      <h1 className="mb-4 text-3xl">A calmer way to read the news</h1>

      <div className="flex flex-col gap-4 text-[1.05rem] text-ink-soft">
        <p>
          Dispatch is a news reader built to strip away the noise — no
          autoplaying video, no infinite pop-ups, just headlines, summaries,
          and full articles when you want them.
        </p>
        <p>
          Every article on this site is pulled live from the{' '}
          
          <a href="https://open-platform.theguardian.com/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue hover:underline">
          Guardian Open Platform</a>
          , a free public API. Dispatch isn't affiliated with the Guardian —
          it's an independent project built on top of their API.
        </p>
        <p>
          Under the hood, it's a React app with client-side routing (React
          Router), live data fetched with Axios, and a responsive layout
          styled with Tailwind CSS.
        </p>
      </div>
    </div>
  )
}