import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import JoinRoomPage from './lib/pages/JoinRoomPage';
import LandingPage from './lib/pages/LandingPage';
import GameLoader from './lib/views/game/GameWrapper';
import GameWrapper from './lib/views/game/GameWrapper';


function App() {
  return <Router>
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route exact path='/room/join' element={<JoinRoomPage />} />
      <Route exact path='/load' element={<GameLoader />} />
      <Route exact path='/game' element={<GameWrapper />} />
    </Routes>
  </Router>
}

export default App;
