import React from "react";
import "./styles/App.css";
import AudioPlayer from "./components/player/AudioPlayer";

function App() {
    return (
        <div className="container">
            <AudioPlayer />
        </div>
    );
}

export default App;