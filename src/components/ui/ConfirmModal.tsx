import { Modal } from "./Modal"
import { Text } from "./Text"

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
  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  // Use custom actions if provided, otherwise use default confirm/cancel
  const modalActions = actions || [
    {
      label: cancelText,
      onClick: onClose,
      variant: "secondary" as const,
    },
    {
      label: confirmText,
      onClick: handleConfirm,
      variant: (variant === "danger" ? "danger" : "primary") as const,
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
      <Text as="p" className="text-gray-700">
        {message}
      </Text>
    </Modal>
  )
}
