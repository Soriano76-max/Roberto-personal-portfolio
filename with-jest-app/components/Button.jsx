// components/Button.jsx (refactored)
export default function Button({ label, onClick }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {label}
    </button>
  )
}