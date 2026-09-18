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

      <div className={`${wrap} flex flex-wrap items-baseline gap-4 pb-3.5 pt-5`}>
        <Link
          to="/"
          className="font-display text-4xl font-bold tracking-tight text-navy lg:text-5xl"
        >
          Dispatch
        </Link>
        <p className="font-display text-sm italic text-meta">A better way to read the news</p>
      </div>

      <nav
        className={`${wrap} scrollbar-hide flex gap-1 overflow-x-auto pb-3`}
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
