'use client'

import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '@/context/PlayerContext'
import { formatTime } from '@/lib/utils'
import { 
  PlayIcon, 
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/solid'

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [autoplay, setAutoplay] = useState(false)

  const {
    currentSong,
    isPlaying,
    nextSong,
    previousSong,
    togglePlayPause,
    playFromQueue,
    queue
  } = usePlayer()

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (autoplay) {
      nextSong()
    }
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    setIsMuted(value === 0)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0
    }
  }

  const handlePlayPause = () => {
    if (!currentSong && queue.length > 0) {
      // If no song is playing but queue has songs, play first song in queue
      playFromQueue(queue[0])
    } else {
      togglePlayPause()
    }
  }

  // Add space bar control
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input or textarea
      if (e.code === 'Space' && 
          document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault() // Prevent page scroll
        handlePlayPause() // Use handlePlayPause instead of togglePlayPause
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handlePlayPause]) // Include handlePlayPause in dependencies

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-surface/95 backdrop-blur-lg border-t border-gray-800">
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-800 relative">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative group"
            style={{ width: currentSong ? `${(currentTime / duration) * 100 || 0}%` : '0%' }}
          >
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 
                         bg-white rounded-full opacity-0 group-hover:opacity-100 
                         transition-opacity shadow-lg" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 sm:h-20">
            {/* Song Info */}
            <div className="flex items-center gap-3 w-full sm:w-64">
              {currentSong ? (
                <>
                  <img 
                    src={currentSong.imgpath || ''} 
                    alt={currentSong.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{currentSong.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{currentSong.singer}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface-active flex items-center justify-center">
                    <MusicalNoteIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-400">No song playing</h3>
                    <p className="text-sm text-gray-500">Add songs to queue</p>
                  </div>
                </div>
              )}
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 flex-1">
              <button
                onClick={previousSong}
                className={`p-2 transition-colors ${
                  currentSong 
                    ? 'hover:text-blue-500 text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                disabled={!currentSong}
                title="Previous"
              >
                <BackwardIcon className="w-6 h-6" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`p-3 rounded-xl transition-all ${
                  currentSong || queue.length > 0
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105' 
                    : 'bg-gray-800 cursor-not-allowed'
                }`}
                disabled={!currentSong && queue.length === 0}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </button>

              <button
                onClick={nextSong}
                className={`p-2 transition-colors ${
                  currentSong 
                    ? 'hover:text-blue-500 text-white' 
                    : 'text-gray-600 cursor-not-allowed'
                }`}
                disabled={!currentSong}
                title="Next"
              >
                <ForwardIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Volume & Options */}
            <div className="flex items-center gap-2 sm:w-64 justify-end">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>

              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`hidden sm:block p-2 rounded-lg transition-colors ${
                  autoplay ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                }`}
                title={autoplay ? 'Disable autoplay' : 'Enable autoplay'}
              >
                <PlayIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`hidden sm:block p-2 rounded-lg transition-colors ${
                  isLooping ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                }`}
                title={isLooping ? 'Disable loop' : 'Enable loop'}
              >
                <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsShuffling(!isShuffling)}
                className={`hidden sm:block p-2 rounded-lg transition-colors ${
                  isShuffling ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                }`}
                title={isShuffling ? 'Disable shuffle' : 'Enable shuffle'}
              >
                <ArrowsRightLeftIcon className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-20 accent-blue-500"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.audiopath}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        loop={isLooping}
      />
    </div>
  )
}
