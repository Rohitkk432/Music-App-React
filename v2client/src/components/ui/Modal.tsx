'use client'

import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4
                  bg-black/90">
      <div 
        ref={modalRef}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md
                 border border-gray-700
                 shadow-2xl shadow-blue-500/10
                 transform transition-all duration-300
                 animate-in fade-in slide-in-from-bottom-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 
                       bg-clip-text text-transparent">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:text-gray-400 transition-colors duration-300
                     hover:bg-gray-800 rounded-lg"
            title="Close modal"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
