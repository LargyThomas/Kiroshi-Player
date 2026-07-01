import React from 'react';
import "./styles/App.css";
import AudioPlayer from './components/player/AudioPlayer';

function App() {
  return <div className="container">
      <AudioPlayer audioSrc='/assets/audio/alex-morgan-dixieland-jazz-sunny-cafe-556692.mp3' />
    </div>
}

export default App
