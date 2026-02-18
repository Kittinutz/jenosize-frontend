export default function Button({
  onClick = () => {},
  children,
  type,
}: {
  children?: string | React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 w-fit py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  )
}
