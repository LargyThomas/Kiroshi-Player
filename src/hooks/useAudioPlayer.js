import { useEffect, useRef, useState } from "react";
import initialTracks from "../data/tracks";

const useAudioPlayer = () => {
    const [tracks, setTracks] = useState(initialTracks);
    const [trackDurations, setTrackDurations] = useState({});
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const tracksWithDuration = tracks.map((track) => {
        const resolvedDuration = Number.isFinite(track.duration)
            ? track.duration
            : Number.isFinite(trackDurations[track.id])
                ? trackDurations[track.id]
                : 0;

        return {
            ...track,
            duration: resolvedDuration,
        };
    });

    const currentTrack = tracksWithDuration[currentTrackIndex] ?? tracksWithDuration[0] ?? null;

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

    useEffect(() => {
        const audioItems = [];

        tracks.forEach((track) => {
            const hasKnownDuration = Number.isFinite(track.duration) || Number.isFinite(trackDurations[track.id]);

            if (hasKnownDuration) return;

            const audio = new Audio(track.src);
            audio.preload = "metadata";

            const cleanup = () => {
                audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audio.removeEventListener("error", handleError);
                audio.src = "";
            };

            const handleLoadedMetadata = () => {
                const resolvedDuration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;

                setTrackDurations((previousDurations) => {
                    if (previousDurations[track.id] === resolvedDuration) {
                        return previousDurations;
                    }

                    return {
                        ...previousDurations,
                        [track.id]: resolvedDuration,
                    };
                });
                cleanup();
            };

            const handleError = () => {
                cleanup();
            };

            audio.addEventListener("loadedmetadata", handleLoadedMetadata);
            audio.addEventListener("error", handleError);
            audio.load();
            audioItems.push(cleanup);
        });

        return () => {
            audioItems.forEach((cleanup) => cleanup());
        };
    }, [tracks, trackDurations]);

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
            previousIndex === 0 ? tracksWithDuration.length - 1 : previousIndex - 1
        );

        resetPlayerTime();
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((previousIndex) =>
            previousIndex === tracksWithDuration.length - 1 ? 0 : previousIndex + 1
        );

        resetPlayerTime();
    };

    const handleTrackSelect = (index) => {
        if (index < 0 || index >= tracksWithDuration.length) return;

        setCurrentTrackIndex(index);
        resetPlayerTime();
        setIsPlaying(true);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    const handleTrackDelete = (index) => {
        setTracks((previousTracks) => {
            const nextTracks = previousTracks.filter((_, trackIndex) => trackIndex !== index);

            setCurrentTrackIndex((currentIndex) => {
                if (nextTracks.length === 0) return 0;
                if (index < currentIndex) return currentIndex - 1;
                if (index === currentIndex) return Math.min(currentIndex, nextTracks.length - 1);
                return currentIndex;
            });

            return nextTracks;
        });

        setCurrentTime(0);
        setDuration(0);
    };

    const handleEnded = () => {
        handleNextTrack();
    };

    const formatDuration = (durationSeconds) => {
        const safeDuration = Number(durationSeconds);

        if (!Number.isFinite(safeDuration) || safeDuration <= 0) {
            return "0:00";
        }

        const minutes = Math.floor(safeDuration / 60);
        const seconds = Math.floor(safeDuration % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");

        return `${minutes}:${formattedSeconds}`;
    };

    const totalDurationSeconds = tracksWithDuration.reduce(
        (accumulator, track) => accumulator + (track.duration || 0),
        0
    );

    const totalDuration = formatDuration(totalDurationSeconds);

    return {
        audioRef,
        tracks: tracksWithDuration,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        totalDuration,
        handleSeek,
        handleTimeUpdate,
        handleLoadedMetadata,
        handlePlayPause,
        handlePreviousTrack,
        handleNextTrack,
        handleTrackSelect,
        handleTrackDelete,
        handleEnded,
        formatDuration,
    };
};

export default useAudioPlayer;
