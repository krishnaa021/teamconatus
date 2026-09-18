import { wrap } from '../lib/layout.js'

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-tint">
      <div
        className={`${wrap} flex flex-col gap-1.5 py-6 text-sm text-meta lg:flex-row lg:justify-between`}
      >
        <p>
          Built with React, Axios &amp; React Router. Article content courtesy of{' '}
          <a
            href="https://open-platform.theguardian.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-navy hover:underline"
          >
            the Guardian Open Platform
          </a>
          .
        </p>
        <p>&copy; {new Date().getFullYear()} Dispatch</p>
      </div>
    </footer>
  )
}
