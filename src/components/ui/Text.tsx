interface TextProps {
  variant?: "body" | "muted" | "center"
  children: React.ReactNode
}

export function Text({ variant = "body", children }: TextProps) {
  const styles = {
    body: "",
    muted: "text-gray-500",
    center: "text-center text-gray-500",
  }

  return <div className={styles[variant]}>{children}</div>
}
