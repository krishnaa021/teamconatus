import { Link } from 'react-router-dom'
import { wrap } from '../lib/layout.js'

export default function Blog() {
  return (
    <div className={`${wrap} max-w-[720px] pb-16 pt-10`}>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to Dispatch
      </Link>

      <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-navy">
        Dispatch Blog
      </span>
      <h1 className="mb-4 text-3xl">Notes from the newsroom</h1>
      <p className="text-ink-soft">
        This is where opinion pieces, analysis, commentary, and frequent updates that offer a personal or expert perspective on current events — will live. Nothing posted yet, but check back soon.
      </p>
    </div>
  )
}