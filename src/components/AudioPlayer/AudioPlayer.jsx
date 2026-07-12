import React from "react";
import "./AudioPlayer.css";
import Cover from "../Cover/Cover";
import TrackInfo from "../TrackInfo/TrackInfo";
import PlayerControls from "../PlayerControls/PlayerControls";
import ProgressBar from "../ProgressBar/ProgressBar";
import Playlist from "../Playlist/Playlist";
import useAudioPlayer from "../../hooks/useAudioPlayer";

const AudioPlayer = () => {
    const {
        audioRef,
        tracks,
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
    } = useAudioPlayer();

    if (!currentTrack) {
        return <div className="player-layout">Aucune piste disponible.</div>;
    }

    return (
        <div className="player-layout">
            <div className="player-card">
                <Cover image={currentTrack.cover} alt="Cover Image" />

                <TrackInfo title={currentTrack.title} artist={currentTrack.artist} />

                <ProgressBar value={currentTime} max={duration || 0} onChange={handleSeek} />

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

                <PlayerControls
                    onPrevious={handlePreviousTrack}
                    onPlayPause={handlePlayPause}
                    onNext={handleNextTrack}
                    isPlaying={isPlaying}
                />
            </div>

            <Playlist
                name="Ma playlist"
                description="Clique sur une piste pour la jouer"
                creationDate="09/07/2026"
                trackCount={tracks.length}
                totalDuration={totalDuration}
                isPublic
                tracks={tracks}
                activeTrackIndex={currentTrackIndex}
                onTrackClick={handleTrackSelect}
                onTrackDelete={handleTrackDelete}
                formatDuration={formatDuration}
            />
        </div>
    );
};

export default AudioPlayer;
