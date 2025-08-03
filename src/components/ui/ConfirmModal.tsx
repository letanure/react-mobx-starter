import { Modal } from "./Modal"
import { Text } from "./Text"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
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
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      actions={[
        {
          label: cancelText,
          onClick: onClose,
          variant: "secondary",
        },
        {
          label: confirmText,
          onClick: handleConfirm,
          variant: variant === "danger" ? "danger" : "primary",
        },
      ]}
      closable={false}
    >
      <Text as="p" className="text-gray-700">
        {message}
      </Text>
    </Modal>
  )
}
