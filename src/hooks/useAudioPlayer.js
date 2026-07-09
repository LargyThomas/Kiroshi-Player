import { useEffect, useRef, useState } from "react";
import tracks from "../data/tracks";

const useAudioPlayer = () => {
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

    const handleSeek = (event) => {
        const newTime = Number(event.target.value);

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

    return {
        audioRef,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        handleSeek,
        handleTimeUpdate,
        handleLoadedMetadata,
        handlePlayPause,
        handlePreviousTrack,
        handleNextTrack,
        handleEnded,
        formatDuration,
    };
};

export default useAudioPlayer;
