import React from "react";
import { Trash } from "lucide-react";
import "./Playlist.css";

const Playlist = ({
    name,
    description,
    creationDate,
    trackCount,
    totalDuration,
    isPublic,
    tracks,
    activeTrackIndex,
    onTrackClick,
    onTrackDelete,
    formatDuration,
}) => {
    return (
        <div className="playlist">
            <div className="playlist-header">
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <span className={`playlist-badge ${isPublic ? "public" : "private"}`}>
                    {isPublic ? "Public" : "Privé"}
                </span>
            </div>

            <div className="playlist-meta">
                <p>Date de création : {creationDate}</p>
                <p>Nombre de musiques : {trackCount}</p>
                <p>Durée totale : {totalDuration}</p>
            </div>

            <div className="playlist-tracks">
                {tracks.length === 0 ? (
                    <p className="empty-playlist">Aucune piste dans la playlist.</p>
                ) : (
                    tracks.map((track, index) => (
                        <div
                            key={track.id ?? `${track.title}-${index}`}
                            className={`playlist-track ${index === activeTrackIndex ? "active" : ""}`}
                            onClick={() => onTrackClick(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    onTrackClick(index);
                                }
                            }}
                        >
                            <div className="track-main">
                                <span className="track-number">{index + 1}</span>
                                <div>
                                    <span className="track-title">{track.title}</span>
                                    <span className="track-artist">{track.artist}</span>
                                </div>
                            </div>

                            <div className="track-actions">
                                <span className="track-duration">
                                    {track.duration > 0 ? formatDuration(track.duration) : "--:--"}
                                </span>
                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onTrackDelete(index);
                                    }}
                                    aria-label="Supprimer la piste"
                                >
                                    <Trash size={18} color="#ff4757"/>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Playlist;
