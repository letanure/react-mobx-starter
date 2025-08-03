import { IconX } from "@tabler/icons-react"
import { type ReactNode, useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "./Button"
import { IconButton } from "./IconButton"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: "primary" | "secondary" | "danger"
  }>
  closable?: boolean
}

const ANIMATION_DURATION = 200

export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  closable = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleClose = useCallback(() => {
    setExiting(true)
    setTimeout(() => {
      setMounted(false)
      onClose()
    }, ANIMATION_DURATION)
  }, [onClose])

  useEffect(() => {
    if (open && !mounted) {
      setMounted(true)
      setExiting(false)
    }

    if (!open && mounted) {
      setExiting(true)
      setTimeout(() => {
        setMounted(false)
      }, ANIMATION_DURATION)
    }
  }, [open, mounted])

  useEffect(() => {
    if (!mounted) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) handleClose()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [mounted, closable, handleClose])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transition-all duration-200 ${
          exiting ? "animate-scale-out" : "animate-scale-in"
        }`}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between p-4">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {closable && (
              <IconButton
                icon={IconX}
                onClick={handleClose}
                size="medium"
                title="Close"
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">{children}</div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex justify-end gap-2 p-4">
            {actions.map((action, index) => (
              <Button
                key={`${action.label}-${index}`}
                label={action.label}
                onClick={action.onClick}
                variant={action.variant || "secondary"}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
