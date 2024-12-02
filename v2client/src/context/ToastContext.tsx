'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Toast } from '@/components/ui/Toast'

type ToastType = 'success' | 'error' | 'info'

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string
    type: ToastType
    id: number
  } | null>(null)

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, id: Date.now() })
  }, [])

  const closeToast = useCallback(() => {
    setToast(null)
  }, [])

  // Listen for custom toast events
  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<{ message: string; type: ToastType }>) => {
      showToast(event.detail.message, event.detail.type)
    }

    window.addEventListener('toast' as any, handleToastEvent as EventListener)

    return () => {
      window.removeEventListener('toast' as any, handleToastEvent as EventListener)
    }
  }, [showToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 