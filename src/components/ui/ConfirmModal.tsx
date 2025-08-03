import { Modal } from "./Modal"
import { Text } from "./Text"

// Types
interface ConfirmAction {
  label: string
  onClick: () => void
  variant?: "primary" | "danger" | "secondary"
}

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
  actions?: ConfirmAction[]
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  actions,
}: ConfirmModalProps) {
  // Event handlers
  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  // defaults to confirm cacel if no action provided
  const modalActions = actions || [
    {
      label: cancelText,
      onClick: onClose,
      variant: "secondary" as const,
    },
    {
      label: confirmText,
      onClick: handleConfirm,
      variant:
        variant === "danger" ? ("danger" as const) : ("primary" as const),
    },
  ]

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      actions={modalActions.map((action) => ({
        label: action.label,
        onClick: () => {
          action.onClick()
          if (action.onClick !== onClose) {
            onClose()
          }
        },
        variant: action.variant || "primary",
      }))}
      closable={false}
    >
      <Text as="p" color="muted">
        {message}
      </Text>
    </Modal>
  )
}
