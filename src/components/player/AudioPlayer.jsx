import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const tracks = [
    {
        title: "Unknown Dream",
        artist: "Fantasy Library",
        cover: "/assets/covers/chill music playlist cover.jpg",
        src: "/assets/audio/alex-morgan-dixieland-jazz-sunny-cafe-556692.mp3",
    },
    {
        title: "Forest Memory",
        artist: "Fantasy Library",
        cover: "/assets/covers/Unknown-2.jpg",
        src: "/assets/audio/alex-morgan-funky-corporate-presentation-556672.mp3",
    },
    {
        title: "Moonlight Path",
        artist: "Fantasy Library",
        cover: "/assets/covers/Unknown-3.jpg",
        src: "/assets/audio/alex-morgan-gypsy-jazz-study-session-556684.mp3",
    },
];

const AudioPlayer = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        if (!audioRef.current || !isPlaying) return;

        const playAudio = async () => {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.error("Impossible de lancer la musique :", error);
                setIsPlaying(false);
            }
        };

        playAudio();
    }, [currentTrackIndex, isPlaying]);

    const resetPlayerTime = () => {
        setCurrentTime(0);
        setDuration(0);
    };

    const playCurrentAudio = async () => {
        if (!audioRef.current) return;

        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("Impossible de lancer la musique :", error);
        }
    };

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
            playCurrentAudio();
        }
    };

    const handlePreviousTrack = () => {
        setCurrentTrackIndex((previousIndex) =>
            previousIndex === 0 ? tracks.length - 1 : previousIndex - 1
        );

        resetPlayerTime();
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((previousIndex) =>
            previousIndex === tracks.length - 1 ? 0 : previousIndex + 1
        );

        resetPlayerTime();
    };

    const handleEnded = () => {
        handleNextTrack();
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
            <img src={currentTrack.cover} alt="Cover Image" />

            <div className="track-info">
                <h2>{currentTrack.title}</h2>
                <p>{currentTrack.artist}</p>
            </div>

            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
            />

            <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            <div className="track-duration">
                <p>{formatDuration(currentTime)}</p>
                <p>{formatDuration(duration)}</p>
            </div>

            <div className="player-controls">
                <button onClick={handlePreviousTrack} type="button">
                    <span className="material-symbols-rounded">
                        skip_previous
                    </span>
                </button>

                <button
                    onClick={handlePlayPause}
                    type="button"
                    className="main-control"
                >
                    <span className="material-symbols-rounded">
                        {isPlaying ? "pause" : "play_arrow"}
                    </span>
                </button>

                <button onClick={handleNextTrack} type="button">
                    <span className="material-symbols-rounded">
                        skip_next
                    </span>
                </button>
            </div>
        </div>
    );
};

export default AudioPlayer;