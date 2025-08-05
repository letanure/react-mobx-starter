interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ onClick, children, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  )
}
