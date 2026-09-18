export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="border-l-4 border-[#c70000] bg-paper-tint p-8 text-left" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          className="mt-3 rounded-sm bg-navy px-4 py-2 font-semibold text-paper hover:bg-blue"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  )
}
