import React, { useRef, useState } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const handleSeek = (e) => {
        const newTime = Number(e.target.value);

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }

        setCurrentTime(newTime);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;

        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;

        setDuration(audioRef.current.duration);
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const formatDuration = (durationSeconds) => {
        if (!durationSeconds || Number.isNaN(durationSeconds)) {
            return "0:00";
        }

        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");

        return `${minutes}:${formattedSeconds}`;
    };

    return (
        <div className="player-card">
            <img src="/assets/covers/Unknown-3.jpg" alt="Cover Image" />

            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
            />

            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div className="track-duration">
                <p>{formatDuration(currentTime)}</p>
                <p>{formatDuration(duration)}</p>
            </div>

            <button onClick={handlePlayPause}>
                <span className="material-symbols-rounded">
                    {isPlaying ? "pause" : "play_arrow"}
                </span>
            </button>
        </div>
    );
};

export default AudioPlayer;