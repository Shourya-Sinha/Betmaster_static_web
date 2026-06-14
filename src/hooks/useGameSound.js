import { useEffect, useRef, useState, useCallback } from 'react';

const SOUND_FILES = [
  '/sounds/better.mp3',
  '/sounds/websound.wav',
  '/sounds/good.mp3',
  '/sounds/loop3.mp3',
  '/sounds/game_music_loop.mp3',
  '/sounds/loop4.mp3'
];

export default function useGameSound() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const isMutedRef = useRef(true);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // ✅ Auto-play on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteracted && audioRef.current && audioReady) {
        setUserInteracted(true);
        
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            isMutedRef.current = false;
            console.log('🎵 Auto-playing on first interaction');
          })
          .catch((e) => {
            console.warn('Play failed:', e.message);
            // Still mark as interacted so user can manually play
          });
        
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [userInteracted, audioReady]);

  // Initialize audio
  useEffect(() => {
    let audio = null;

    try {
      audio = new Audio();
      audio.volume = 0.2;
      audio.preload = 'auto';
      audio.src = SOUND_FILES[0];
      audioRef.current = audio;

      audio.addEventListener('canplaythrough', () => {
        console.log('✅ Audio ready');
        setAudioReady(true);
        setLoadError(false);
      }, { once: true });

      audio.addEventListener('error', () => {
        console.warn('⚠️ Audio load error');
        setLoadError(true);
        setAudioReady(false);
      }, { once: true });

      audio.addEventListener('ended', () => {
        if (!audioRef.current) return;
        const next = Math.floor(Math.random() * SOUND_FILES.length);
        setCurrentTrack(next);
        audioRef.current.src = SOUND_FILES[next];
        if (!isMutedRef.current) {
          audioRef.current.play().catch(() => {});
        }
      });

    } catch (e) {
      console.warn('Audio not supported');
      setLoadError(true);
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.load();
      }
      audioRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      if (loadError) {
        audio.src = SOUND_FILES[currentTrack];
        audio.load();
        setLoadError(false);
      }

      audio.play()
        .then(() => {
          setIsMuted(false);
          isMutedRef.current = false;
          console.log('🔊 Playing');
        })
        .catch((e) => {
          console.warn('⚠️ Play prevented:', e.message);
        });
    } else {
      audio.pause();
      setIsMuted(true);
      isMutedRef.current = true;
      console.log('🔇 Paused');
    }
  }, [isMuted, loadError, currentTrack]);

  const skipTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const next = Math.floor(Math.random() * SOUND_FILES.length);
    setCurrentTrack(next);
    audio.src = SOUND_FILES[next];
    audio.load();

    if (!isMuted) {
      setTimeout(() => audio.play().catch(() => {}), 100);
    }
    console.log('⏭️ Track:', next + 1);
  }, [isMuted]);

  return {
    isMuted,
    toggleSound,
    audioReady,
    loadError,
    currentTrack,
    totalTracks: SOUND_FILES.length,
    skipTrack,
  };
}

// export default function useGameSound() {
//   const audioRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const [audioReady, setAudioReady] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(0);
//   const [loadError, setLoadError] = useState(false);
  
//   // ✅ Use ref for isMuted to avoid dependency warning
//   const isMutedRef = useRef(isMuted);
  
//   useEffect(() => {
//     isMutedRef.current = isMuted;
//   }, [isMuted]);

//   useEffect(() => {
//     let audio = null;

//     try {
//       audio = new Audio();
//       audio.volume = 0.2;
//       audio.preload = 'auto';
      
//       audio.src = SOUND_FILES[0];
//       audioRef.current = audio;

//       audio.addEventListener('canplaythrough', () => {
//         console.log('✅ Audio ready');
//         setAudioReady(true);
//         setLoadError(false);
//       }, { once: true });

//       audio.addEventListener('error', () => {
//         console.warn('⚠️ Audio load error, will retry on play');
//         setLoadError(true);
//         setAudioReady(false);
//       }, { once: true });

//       // ✅ Use ref instead of state to avoid stale closure
//       audio.addEventListener('ended', () => {
//         if (!audioRef.current) return;
        
//         const next = Math.floor(Math.random() * SOUND_FILES.length);
//         setCurrentTrack(next);
//         audioRef.current.src = SOUND_FILES[next];
        
//         if (!isMutedRef.current) {
//           audioRef.current.play().catch(() => {});
//         }
//       });

//     } catch (e) {
//       console.warn('Audio not supported');
//       setLoadError(true);
//     }

//     return () => {
//       if (audio) {
//         audio.pause();
//         audio.src = '';
//         audio.load();
//       }
//       audioRef.current = null;
//     };
//   }, []); // ✅ Empty dependency is fine - we use ref for isMuted

//   const toggleSound = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isMuted) {
//       if (loadError) {
//         audio.src = SOUND_FILES[currentTrack];
//         audio.load();
//         setLoadError(false);
//       }

//       audio.play()
//         .then(() => {
//           setIsMuted(false);
//           console.log('🔊 Playing');
//         })
//         .catch((e) => {
//           console.warn('⚠️ Play prevented:', e.message);
//         });
//     } else {
//       audio.pause();
//       setIsMuted(true);
//       console.log('🔇 Paused');
//     }
//   }, [isMuted, loadError, currentTrack]);

//   const skipTrack = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const next = Math.floor(Math.random() * SOUND_FILES.length);
//     setCurrentTrack(next);
//     audio.src = SOUND_FILES[next];
//     audio.load();

//     if (!isMuted) {
//       setTimeout(() => audio.play().catch(() => {}), 100);
//     }
//     console.log('⏭️ Track:', next + 1);
//   }, [isMuted]);

//   return {
//     isMuted,
//     toggleSound,
//     audioReady,
//     loadError,
//     currentTrack,
//     totalTracks: SOUND_FILES.length,
//     skipTrack,
//   };
// }
