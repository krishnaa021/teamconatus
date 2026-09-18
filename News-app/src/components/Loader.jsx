export default function Loader({ label = 'Loading articles…' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-meta" role="status">
      <span
        className="h-5 w-5 animate-spin rounded-full border-[3px] border-rule border-t-navy"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  )
}
