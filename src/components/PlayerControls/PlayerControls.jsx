import React from "react";

const PlayerControls = ({ onPrevious, onPlayPause, onNext, isPlaying }) => (
    <div className="player-controls">
        <button onClick={onPrevious} type="button">
            <span className="material-symbols-rounded">skip_previous</span>
        </button>

        <button onClick={onPlayPause} type="button" className="main-control">
            <span className="material-symbols-rounded">
                {isPlaying ? "pause" : "play_arrow"}
            </span>
        </button>

        <button onClick={onNext} type="button">
            <span className="material-symbols-rounded">skip_next</span>
        </button>
    </div>
);

export default PlayerControls;
