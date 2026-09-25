import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { SECTIONS } from './Filters.jsx'
import { wrap } from '../lib/layout.js'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function Header() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const activeSection = searchParams.get('section') || ''

  return (
    <header className="border-b border-rule bg-paper">
      <div
        className={`${wrap} flex justify-between border-b border-rule py-2.5 text-xs text-meta`}
      >
        <span>{today}</span>
        <span className="hidden sm:inline">Powered by the Guardian Open Platform</span>
      </div>

      <div className={`${wrap} flex flex-col items-center gap-1 py-10 text-center sm:py-5`}>
        <Link
          to="/"
          className="font-display text-5xl font-bold tracking-tight text-navy sm:text-7xl lg:text-7xl"
        >
          Dispatch
        </Link>
        <p className="font-display text-base italic text-meta sm:text-lg">
          A better way to read the news
        </p>
      </div>

      <nav
        className={`${wrap} scrollbar-hide flex gap-1 overflow-x-auto border-t border-rule pb-3 pt-2 sm:justify-center`}
        aria-label="Sections"
      >
        {SECTIONS.map((section) => {
          const isActive = location.pathname === '/' && activeSection === section.id
          const to = section.id ? `/?section=${section.id}` : '/'
          return (
            <Link
              key={section.id || 'all'}
              to={to}
              className={
                'flex-none whitespace-nowrap border-b-2 px-3.5 py-1.5 text-sm font-semibold hover:text-navy ' +
                (isActive ? 'border-navy text-navy' : 'border-transparent text-ink-soft')
              }
            >
              {section.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}