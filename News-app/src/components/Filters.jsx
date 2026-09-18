
export const SECTIONS = [
  { id: '', label: 'All' },
  { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'sport', label: 'Sports' },
  { id: 'environment', label: 'Environment' },
  { id: 'culture', label: 'Culture' },
]

export default function Filters({ activeSection, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by section">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id || 'all'}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={
              'rounded-full border px-3.5 py-1.5 text-sm ' +
              (isActive
                ? 'border-navy bg-navy text-paper'
                : 'border-rule bg-paper text-ink-soft hover:border-navy hover:text-navy')
            }
            onClick={() => onSelect(section.id)}
          >
            {section.label}
          </button>
        )
      })}
    </div>
  )
}
