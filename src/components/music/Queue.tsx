'use client'

import { useState } from 'react'
import { usePlayer } from '@/context/PlayerContext'
import { 
  XMarkIcon, 
  QueueListIcon, 
  PlayIcon,
  MusicalNoteIcon 
} from '@heroicons/react/24/solid'

export default function Queue() {
  const { queue, currentSong, removeFromQueue, clearQueue, playFromQueue } = usePlayer()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Queue Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-32 z-20 p-3.5 
                 bg-gradient-to-r from-blue-500 to-purple-500 
                 hover:from-blue-600 hover:to-purple-600
                 rounded-xl shadow-lg shadow-blue-500/20
                 transition-all duration-300 hover:scale-105"
        title="Open queue"
      >
        <QueueListIcon className="w-6 h-6" />
        {queue.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 
                        bg-red-500 rounded-full text-sm 
                        flex items-center justify-center
                        border-2 border-background">
            {queue.length}
          </span>
        )}
      </button>

      {/* Queue Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl max-h-[80vh] 
                       bg-surface border border-gray-800 rounded-2xl 
                       shadow-2xl shadow-blue-500/10
                       flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 
                         border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-surface-active">
                  <QueueListIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Queue</h2>
                  <p className="text-sm text-gray-400">
                    {queue.length} {queue.length === 1 ? 'song' : 'songs'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {queue.length > 0 && (
                  <button
                    onClick={() => clearQueue()}
                    className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 
                           bg-surface-hover hover:bg-surface-active
                           rounded-lg transition-all duration-300"
                    title="Clear queue"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white 
                         bg-surface-hover hover:bg-surface-active
                         rounded-lg transition-all duration-300"
                  title="Close"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Queue List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {queue.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl 
                               bg-surface-active flex items-center justify-center">
                    <MusicalNoteIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 mb-2">
                    Your queue is empty
                  </p>
                  <p className="text-sm text-gray-500">
                    Add songs to start playing
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {queue.map((song) => (
                    <div 
                      key={song.id}
                      className={`flex items-center justify-between p-3 
                               rounded-xl transition-all duration-300 group
                               hover:scale-[1.01] border border-gray-800/50
                               ${currentSong?.id === song.id 
                                 ? 'bg-blue-500/10 border-blue-500/20' 
                                 : 'bg-surface hover:bg-surface-hover'}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative group/play">
                          <img 
                            src={song.imgpath || ''} 
                            alt={song.title}
                            className="w-10 h-10 rounded-lg object-cover shadow-lg 
                                     transition-transform duration-300
                                     group-hover/play:scale-105"
                          />
                          <button
                            onClick={() => playFromQueue(song)}
                            className="absolute inset-0 flex items-center justify-center 
                                     bg-surface opacity-0 group-hover/play:opacity-90 
                                     transition-all duration-300 rounded-lg
                                     ring-2 ring-accent-blue/0 group-hover/play:ring-accent-blue"
                            title="Play"
                          >
                            <PlayIcon className="w-5 h-5 transform scale-90 
                                             group-hover/play:scale-100 transition-transform" />
                          </button>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm truncate">
                            {song.title}
                          </h3>
                          <p className="text-xs text-gray-400 truncate">
                            {song.singer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:block">
                          {song.duration}
                        </span>
                        <button
                          onClick={() => removeFromQueue(song.id.toString())}
                          className="p-2 text-gray-400 hover:text-red-400 
                                   hover:bg-surface-active rounded-lg
                                   transition-all duration-300"
                          title="Remove from queue"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
