import React from "react";

const TrackInfo = ({ title, artist }) => (
    <div className="track-info">
        <h2>{title}</h2>
        <p>{artist}</p>
    </div>
);

export default TrackInfo;
