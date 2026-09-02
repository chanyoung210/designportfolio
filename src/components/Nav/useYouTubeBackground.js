import { useEffect, useRef } from 'react'

const API_URL = 'https://www.youtube.com/iframe_api'

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve()
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    if (!document.querySelector(`script[src="${API_URL}"]`)) {
      const tag = document.createElement('script')
      tag.src = API_URL
      document.head.appendChild(tag)
    }
  })
}

// Autoplaying background music via the YouTube IFrame API. The iframe is
// rendered off-screen (not display:none, which pauses playback in some
// browsers) since only the audio matters here.
export function useYouTubeBackground(videoId, elementId, initialVolume = 10) {
  const playerRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then(() => {
      if (cancelled) return
      playerRef.current = new window.YT.Player(elementId, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(initialVolume)
            e.target.mute()
            e.target.playVideo()
          },
        },
      })
    })
    return () => {
      cancelled = true
      playerRef.current?.destroy?.()
    }
  }, [videoId, elementId])

  return playerRef
}
