import type React from "react"
import { createContext, useCallback, useContext, useState } from "react"
import {
  ConfirmModal,
  type ConfirmModalProps,
  Modal,
  type ModalProps,
} from "@/components/custom-ui/Modal"

interface ModalState {
  id: string
  component: React.ReactNode
  props: Partial<ModalProps>
}

interface ConfirmModalState {
  id: string
  props: ConfirmModalProps
}

interface ModalContextType {
  openModal: (
    id: string,
    component: React.ReactNode,
    props?: Partial<ModalProps>,
  ) => void
  closeModal: (id: string) => void
  confirm: (
    props: Omit<ConfirmModalProps, "isOpen" | "onConfirm" | "onCancel">,
  ) => Promise<boolean>
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState[]>([])
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(
    null,
  )

  const openModal = useCallback(
    (
      id: string,
      component: React.ReactNode,
      props: Partial<ModalProps> = {},
    ) => {
      setModals((prev) => {
        const filtered = prev.filter((modal) => modal.id !== id)
        return [...filtered, { id, component, props }]
      })
    },
    [],
  )

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id))
  }, [])

  const confirm = useCallback(
    (
      props: Omit<ConfirmModalProps, "isOpen" | "onConfirm" | "onCancel">,
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        const id = Math.random().toString(36).substring(2, 9)

        setConfirmModal({
          id,
          props: {
            ...props,
            isOpen: true,
            onConfirm: () => {
              setConfirmModal(null)
              resolve(true)
            },
            onCancel: () => {
              setConfirmModal(null)
              resolve(false)
            },
          },
        })
      })
    },
    [],
  )

  return (
    <ModalContext.Provider value={{ openModal, closeModal, confirm }}>
      {children}

      {modals.map((modal) => (
        <Modal
          key={modal.id}
          isOpen={true}
          onClose={() => closeModal(modal.id)}
          {...modal.props}
        >
          {modal.component}
        </Modal>
      ))}

      {confirmModal && (
        <ConfirmModal key={confirmModal.id} {...confirmModal.props} />
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }

  const { openModal, closeModal, confirm } = context

  return {
    open: openModal,
    close: closeModal,
    confirm,

    // Helper methods for common patterns
    openForm: (
      id: string,
      form: React.ReactNode,
      props?: Partial<ModalProps>,
    ) => {
      openModal(id, form, { size: "md", ...props })
    },

    openLarge: (
      id: string,
      content: React.ReactNode,
      props?: Partial<ModalProps>,
    ) => {
      openModal(id, content, { size: "lg", ...props })
    },

    confirmDelete: (
      props?: Partial<
        Omit<ConfirmModalProps, "isOpen" | "onConfirm" | "onCancel">
      >,
    ) => {
      return confirm({
        titleKey: "common.confirmDelete",
        messageKey: "common.confirmDeleteMessage",
        variant: "destructive",
        confirmTextKey: "common.delete",
        ...props,
      })
    },
  }
}
