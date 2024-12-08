'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel'
}: ConfirmModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                                   bg-surface p-6 shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                  </div>
                  <Dialog.Title as="h3" className="text-lg font-medium">
                    {title}
                  </Dialog.Title>
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  {message}
                </p>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium rounded-lg 
                             bg-surface-active hover:bg-surface-hover 
                             transition-colors"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium rounded-lg 
                             bg-red-500 hover:bg-red-600 
                             transition-colors"
                    onClick={() => {
                      onConfirm()
                      onClose()
                    }}
                  >
                    {confirmText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 