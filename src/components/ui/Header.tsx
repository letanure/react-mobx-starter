interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-3 px-6 py-4">
      <h1 className="text-xl font-semibold text-ci-text">{title}</h1>
    </header>
  )
}
