import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ file, showVolume = true }) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Initialize volume as a number (e.g., 1 for 100%)
    const [duration, setDuration] = useState(0); // Initialize duration as a number (e.g., 0)
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlayPause = (e) => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            setDuration(audio.duration); // Set duration as a number
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const volume = parseFloat(e.target.value); // Ensure volume is parsed as a number
        audioRef.current.volume = volume;
        setVolume(volume);
    };

    const handleTimeUpdate = (e) => {
        const audio = audioRef.current;
        setDuration(audio.duration); // Update duration as a number
        setCurrentTime(e.target.currentTime);
    };

    const hadleLoadedMetaData = (e) => {
        setDuration(e.target.duration); // Set duration as a number
    };

    const handleSeekChange = (e) => {
        const time = parseFloat(e.target.value); // Ensure time is parsed as a number
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <audio
                src={file.url}
                ref={audioRef}
                controls
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={hadleLoadedMetaData}
                className="hidden"
            />
            <button onClick={togglePlayPause}>
                {isPlaying ? (
                    <PauseCircleIcon className="w-4 text-gray-400" />
                ) : (
                    <PlayCircleIcon className="w-4 text-gray-400" />
                )}
            </button>
            {showVolume && (
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            )}
            <input
                type="range"
                className="flex-1"
                min="0"
                max={duration} // Use duration directly (which is now a number)
                step="0.01"
                value={currentTime}
                onChange={handleSeekChange}
            />
        </div>
    );
}
