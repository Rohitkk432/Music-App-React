'use client'

import { useToast } from '@/context/ToastContext'
import { addToQueue } from '@/lib/api'

export function QueueButton({ songId, userId }: { songId: string; userId: string }) {
  const { showToast } = useToast()

  const handleAddToQueue = async () => {
    try {
      await addToQueue(userId, songId)
      showToast('Added to queue', 'success')
    } catch (error) {
      showToast('Failed to add to queue', 'error')
    }
  }

  return (
    <button 
      onClick={handleAddToQueue}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Add to Queue
    </button>
  )
} 