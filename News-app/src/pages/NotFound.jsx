import { Link } from 'react-router-dom'
import { wrap } from '../lib/layout.js'

export default function NotFound() {
  return (
    <div className={`${wrap} py-20 text-center`}>
      <h1 className="mb-3 text-3xl">Page not found</h1>
      <p className="mb-5 text-meta">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to Dispatch
      </Link>
    </div>
  )
}
