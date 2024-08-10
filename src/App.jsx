


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from '../src/new/Hero';
import Memes from '../src/new/Memes';
import MemeEditor from './new/tedit/MemeEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/memes" element={<Memes />} />
        <Route path="/meme-editor" element={<MemeEditor />} />
      </Routes>
    </Router>
  );
}


export default App;

























