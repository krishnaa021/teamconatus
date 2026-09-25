import { Link } from 'react-router-dom'
import { SECTIONS } from './Filters.jsx'
import { wrap } from '../lib/layout.js'


const sectionLinks = SECTIONS.filter((section) => section.id)

const linkClass = 'text-paper/75 hover:text-paper hover:underline'
const headingClass = 'mb-3 text-xs font-semibold uppercase tracking-wide text-paper/55'

export default function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className={`${wrap} grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-4`}>
        <div className="col-span-2 sm:col-span-2">
          <Link to="/" className="font-display text-2xl font-bold">
            Dispatch
          </Link>
          <p className="mt-2 max-w-xs text-sm text-paper/70">
            A better way to read the news.
          </p>
        </div>

        <div>
          <h4 className={headingClass}>Sections</h4>
          <ul className="space-y-2 text-sm">
            {sectionLinks.map((section) => (
              <li key={section.id}>
                <Link to={`/?section=${section.id}`} className={linkClass}>
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClass}>More</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/blog" className={linkClass}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${wrap} flex flex-col gap-1.5 border-t border-paper/15 py-5 text-xs text-paper/60 sm:flex-row sm:justify-between`}
      >
        <p>
          Article content courtesy of{' '}
          
            <a href="https://open-platform.theguardian.com/" target="_blank" rel="noreferrer" className="font-semibold text-paper hover:underline">
              the Guardian Open Platform
            </a>
          
          .
        </p>
        <p>&copy; {new Date().getFullYear()} Dispatch</p>
      </div>
    </footer>
  )
}