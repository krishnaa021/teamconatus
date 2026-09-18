import { Link } from 'react-router-dom'
import { wrap } from '../lib/layout.js'

const CONTACT_EMAIL = 'krishnayadav8856@gmail.com'

export default function Contact() {
  return (
    <div className={`${wrap} max-w-[720px] pb-16 pt-10`}>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-navy hover:underline">
        &larr; Back to Dispatch
      </Link>

      <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-navy">
        Get in touch
      </span>
      <h1 className="mb-4 text-3xl">Contact</h1>
      <p className="mb-6 text-ink-soft">
        Questions, feedback, or spotted a bug? Reach out any time.
      </p>

        <a href={`mailto:${CONTACT_EMAIL}`}
        className="text-lg font-semibold text-blue hover:underline"></a>
      
        {CONTACT_EMAIL}
      
    </div>
  )
}