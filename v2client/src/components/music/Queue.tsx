'use client'

import { useState } from 'react'
import { usePlayer } from '@/context/PlayerContext'
import { 
  XMarkIcon, 
  QueueListIcon, 
  PlayIcon 
} from '@heroicons/react/24/solid'

export default function Queue() {
  const { queue, currentSong, removeFromQueue, clearQueue, playFromQueue } = usePlayer()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Queue Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-32 z-40 p-3 bg-blue-600 hover:bg-blue-700 
                 rounded-full shadow-lg transition-colors group"
        title="Open queue"
      >
        <QueueListIcon className="w-6 h-6" />
        {queue.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 
                        rounded-full text-sm flex items-center justify-center">
            {queue.length}
          </span>
        )}
      </button>

      {/* Queue Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 
                     flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[80vh] 
                       flex flex-col shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <QueueListIcon className="w-5 h-5 text-gray-400" />
                <h2 className="font-semibold text-lg">Queue</h2>
                <span className="text-sm text-gray-400">
                  {queue.length} songs
                </span>
              </div>
              <div className="flex items-center gap-4">
                {queue.length > 0 && (
                  <button
                    onClick={clearQueue}
                    className="text-sm text-red-500 hover:text-red-400"
                    title="Clear queue"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                  title="Close"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Queue List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {queue.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    Your queue is empty
                  </p>
                ) : (
                  queue.map((song) => (
                    <div 
                      key={song.id}
                      className={`flex items-center justify-between p-2 rounded-lg
                               ${currentSong?.id === song.id ? 'bg-blue-600/20' : 'hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative group">
                          <img 
                            src={song.imgpath} 
                            alt={song.title}
                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                          />
                          <button
                            onClick={() => playFromQueue(song)}
                            className="absolute inset-0 flex items-center justify-center 
                                   bg-black/50 opacity-0 group-hover:opacity-100 
                                   transition-opacity rounded"
                            title="Play"
                          >
                            <PlayIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm truncate">{song.title}</h3>
                          <p className="text-sm text-gray-400 truncate">{song.singer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-4">
                        <span className="text-sm text-gray-400">
                          {song.duration}
                        </span>
                        <button
                          onClick={() => removeFromQueue(song.id.toString())}
                          className="p-1 hover:text-red-500 transition-colors"
                          title="Remove from queue"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
