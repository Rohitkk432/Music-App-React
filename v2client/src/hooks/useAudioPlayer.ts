'use client'

import { useState, useEffect, useRef } from 'react'

interface UseAudioPlayerProps {
  src?: string
  onEnded?: () => void
}

export function useAudioPlayer({ src, onEnded }: UseAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      onEnded?.()
    })

    audio.volume = volume
    
    return () => {
      audio.pause()
      audio.remove()
    }
  }, [src, onEnded, volume])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seek = (time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const adjustVolume = (value: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = value
    setVolume(value)
  }

  return {
    isPlaying,
    duration,
    currentTime,
    volume,
    togglePlay,
    seek,
    adjustVolume
  }
} 