'use client'
import { useState, useCallback } from 'react'
import * as Toast from '@radix-ui/react-toast'
import styles from './toast.module.css' 

export const useToast = () => {
  const [open, setOpen] = useState(false)
  const [toastContent, setToastContent] = useState({
    title: '',
    description: '',
    duration: 3000,
  })

  const showToast = useCallback(
    ({
      title,
      description,
      duration,
    }: {
      title: string
      description: string
      duration: number
    }) => {
      setToastContent({ title, description, duration })
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, duration)
    },
    []
  )

  // Componente para renderizar el Toast con los estilos aplicados
  const ToastComponent = () => (
    <Toast.Provider>
      <Toast.Root open={open} onOpenChange={setOpen} className={styles.ToastRoot}>
        <Toast.Title className={styles.ToastTitle}>{toastContent.title}</Toast.Title>
        <Toast.Description className={styles.ToastDescription}>
          {toastContent.description}
        </Toast.Description>
        <Toast.Action altText="Cerrar" onClick={() => setOpen(false)} className={styles.ToastAction}>
          Cerrar
        </Toast.Action>
        <Toast.Close className={styles.ToastClose} onClick={() => setOpen(false)} />
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  )

  return { showToast, ToastComponent }
}
