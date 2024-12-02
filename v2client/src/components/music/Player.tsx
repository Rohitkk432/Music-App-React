'use client'

import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '@/context/PlayerContext'
import { 
  PlayIcon, PauseIcon, 
  BackwardIcon, ForwardIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/solid'
import { formatTime } from '@/lib/utils'

export default function Player() {
  const { 
    currentSong, 
    isPlaying,
    queue,
    nextSong, 
    previousSong,
    togglePlay,
    playFromQueue
  } = usePlayer()
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
      if (isPlaying && autoplay) {
        audioRef.current.play().catch(() => {
          console.log('Autoplay prevented')
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong, isLooping, autoplay])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value
      setVolume(value)
      setIsMuted(value === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 1
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handlePlayPause = () => {
    if (!currentSong && queue.length > 0) {
      // If no song is playing but queue has songs, play first song
      playFromQueue(queue[0])
    } else {
      togglePlay()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-800 relative">
          <div 
            className="h-full bg-blue-600 relative group transition-all"
            style={{ width: currentSong ? `${(currentTime / duration) * 100 || 0}%` : '0%' }}
          >
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 
                          bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 
                          transition-opacity" />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            title="Seek"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 py-2 sm:h-20">
            {/* Song Info - Left Side */}
            <div className="flex items-center gap-3 w-full sm:w-64">
              {currentSong ? (
                <>
                  <img 
                    src={currentSong.imgpath} 
                    alt={currentSong.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{currentSong.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{currentSong.singer}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded bg-gray-800 flex items-center justify-center">
                    <MusicalNoteIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-400">No song playing</h3>
                    <p className="text-sm text-gray-500">Add songs to queue</p>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Controls Row */}
            <div className="flex w-full items-center justify-between sm:hidden">
              {/* Time - Left */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Play Controls - Center */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={previousSong}
                  className={`p-1.5 transition-colors ${
                    currentSong 
                      ? 'hover:text-blue-500 text-white' 
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!currentSong}
                  title="Previous"
                >
                  <BackwardIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className={`p-2.5 rounded-full transition-colors ${
                    currentSong 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : queue.length > 0 
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 cursor-not-allowed'
                  }`}
                  disabled={!currentSong && queue.length === 0}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </button>

                <button 
                  onClick={nextSong}
                  className={`p-1.5 transition-colors ${
                    currentSong 
                      ? 'hover:text-blue-500 text-white' 
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!currentSong}
                  title="Next"
                >
                  <ForwardIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Options - Right */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`p-1.5 transition-colors ${
                    autoplay ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  title={autoplay ? 'Disable autoplay' : 'Enable autoplay'}
                >
                  <PlayIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`p-1.5 transition-colors ${
                    isLooping ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  title={isLooping ? 'Disable loop' : 'Enable loop'}
                >
                  <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsShuffling(!isShuffling)}
                  className={`p-1.5 transition-colors ${
                    isShuffling ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  title={isShuffling ? 'Disable shuffle' : 'Enable shuffle'}
                >
                  <ArrowsRightLeftIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-4 h-4" />
                  ) : (
                    <SpeakerWaveIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Controls - Rest remains the same */}
            <div className="hidden sm:flex flex-1 items-center justify-center gap-2 sm:gap-4">
              {/* Desktop Time - Left */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400 min-w-[120px] justify-end">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Main Controls - Center */}
              <div className="flex items-center gap-2 sm:gap-4 mx-auto">
                <button 
                  onClick={previousSong}
                  className={`p-1.5 sm:p-2 transition-colors ${
                    currentSong 
                      ? 'hover:text-blue-500 text-white' 
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!currentSong}
                  title="Previous"
                >
                  <BackwardIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className={`p-2.5 sm:p-3 rounded-full transition-colors ${
                    currentSong 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : queue.length > 0 
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 cursor-not-allowed'
                  }`}
                  disabled={!currentSong && queue.length === 0}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>

                <button 
                  onClick={nextSong}
                  className={`p-1.5 sm:p-2 transition-colors ${
                    currentSong 
                      ? 'hover:text-blue-500 text-white' 
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!currentSong}
                  title="Next"
                >
                  <ForwardIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Desktop Playback Options - Right */}
              <div className="hidden md:flex items-center gap-2 min-w-[120px]">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`p-1.5 rounded transition-colors ${
                    autoplay 
                      ? 'bg-blue-600/20 text-blue-500 border border-blue-500/50' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={autoplay ? 'Disable autoplay' : 'Enable autoplay'}
                >
                  <PlayIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`p-1.5 rounded transition-colors ${
                    isLooping 
                      ? 'bg-blue-600/20 text-blue-500 border border-blue-500/50' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={isLooping ? 'Disable loop' : 'Enable loop'}
                >
                  <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsShuffling(!isShuffling)}
                  className={`p-1.5 rounded transition-colors ${
                    isShuffling 
                      ? 'bg-blue-600/20 text-blue-500 border border-blue-500/50' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={isShuffling ? 'Disable shuffle' : 'Enable shuffle'}
                >
                  <ArrowsRightLeftIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="hidden sm:flex items-center gap-2 sm:w-64 justify-end">
              <div className="flex sm:hidden items-center gap-1">
                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`p-1.5 rounded transition-colors ${
                    isLooping 
                      ? 'text-blue-500' 
                      : 'text-gray-400'
                  }`}
                  title={isLooping ? 'Disable loop' : 'Enable loop'}
                >
                  <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-4 h-4" />
                  ) : (
                    <SpeakerWaveIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Desktop Volume */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-blue-500 transition-colors"
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

        <audio
          ref={audioRef}
          src={currentSong?.audiopath}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextSong}
          className="hidden"
        />
      </div>
    </div>
  )
}
