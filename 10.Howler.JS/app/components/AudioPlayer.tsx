"use client"

import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward, Disc, CirclePlay, Minus, Plus } from 'lucide-react';

interface Track {
  src: string;
  nom: string;
}

const tracks: Track[] = [
  { src: '/audio/audio-1.mp3', nom: 'Instrumental 1' },
  { src: '/audio/audio-2.mp3', nom: 'Instrumental 2' },
  { src: '/audio/audio-3.mp3', nom: 'Instrumental 3' },
  { src: '/audio/audio-4.mp3', nom: 'Instrumental 4' },
];

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const newHowl = new Howl({
      src: [tracks[currentTrackIndex].src],
      onend: handleNextTrack,
      volume: volume,
    });

    setHowl(newHowl);
    setIsPlaying(false);

    return () => {
      newHowl.unload();
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (howl) {
      howl.volume(volume);
    }
  }, [volume, howl]);

  const handlePlayPause = () => {
    if (howl) {
      if (isPlaying) {
        howl.pause();
      } else {
        howl.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const adjustVolume = (delta: number) => {
    setVolume((prevVolume) => {
      const newVolume = Math.min(Math.max(prevVolume + delta, 0), 1);
      return newVolume;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white text-white rounded-xl shadow-lg">
      <div className="relative w-full h-full rounded-xl flex flex-col items-center justify-between p-4">
        <div className="border p-4 rounded-md bg-[#f1f1f1] text-gray-400">
          <ul className="space-y-2">
            {tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => handleTrackSelect(index)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  currentTrackIndex === index ? 'text-gray-900' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {currentTrackIndex === index ? <CirclePlay size={24} /> : <Disc size={24} />}
                  <span>{track.nom}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-6 rounded-full border-4 border-gray-600 flex items-center justify-center bg-gray-300">
          <div className="w-[150px] h-[150px] flex items-center justify-center relative">
            <button
              onClick={handlePrevTrack}
              className="absolute left-2 text-gray-800 hover:text-gray-900 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-all focus:outline-none"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>

            <button
              onClick={handleNextTrack}
              className="absolute right-2 text-gray-800 hover:text-gray-900 transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={24} />
            </button>

            <button
              onClick={() => adjustVolume(-0.1)}
              className="absolute bottom-2 text-gray-800 hover:text-gray-900 transition-colors"
              aria-label="Decrease volume"
            >
              <Minus size={24} />
            </button>

            <button
              onClick={() => adjustVolume(0.1)}
              className="absolute top-2 text-gray-800 hover:text-gray-900 transition-colors"
              aria-label="Increase volume"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
