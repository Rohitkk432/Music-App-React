'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  }[type]

  return (
    <div
      className={cn(
        'fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg',
        'flex items-center gap-3 min-w-[300px] max-w-[400px] z-[100]',
        'animate-slide-down transition-all duration-300',
        {
          'bg-green-50 text-green-800 border border-green-200': type === 'success',
          'bg-red-50 text-red-800 border border-red-200': type === 'error',
          'bg-blue-50 text-blue-800 border border-blue-200': type === 'info',
        }
      )}
      role="alert"
    >
      <Icon 
        className={cn('w-5 h-5 flex-shrink-0', {
          'text-green-500': type === 'success',
          'text-red-500': type === 'error',
          'text-blue-500': type === 'info',
        })} 
      />
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button 
        onClick={onClose}
        className={cn(
          'text-gray-400 hover:text-gray-600 transition-colors',
          'rounded-full p-0.5 hover:bg-gray-100'
        )}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  )
} 