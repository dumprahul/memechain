import React, { useState } from 'react';
import Trial from './Trial'; // Make sure the path is correct based on your project structure
import Wcbox from './Wcbox'; // Make sure the path is correct based on your project structure

const VerticalText = () => {
  const [view, setView] = useState(null);
  const [wcboxVisible, setWcboxVisible] = useState(false);
  const [wcboxContent, setWcboxContent] = useState('');

  const handleButtonClick = (content) => {
    setWcboxContent(content);
    setWcboxVisible(true);
  };

  const closeWcbox = () => {
    setWcboxVisible(false);
    setWcboxContent('');
  };

  const renderCards = () => {
    const cardCount = view === 'memes' ? 4 : view === 'templates' ? 6 : 0;
    const buttonText = view === 'memes' ? 'Share Meme!' : 'Edit Template';

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: cardCount }).map((_, index) => (
          <Trial
            key={index}
            buttonText={buttonText}
            onButtonClick={() => handleButtonClick(buttonText)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex h-screen flex-col">
      <div className="flex justify-center items-center p-4">
        <div className="text-center mt-3">
          <span className="text-3xl">Memes and Templates</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <div className="flex space-x-5 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setView('memes')}
          >
            View Memes
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => setView('templates')}
          >
            View Templates
          </button>
        </div>
        <div className="w-full md:w-1/2">
          {renderCards()}
        </div>
      </div>
      {wcboxVisible && <Wcbox content={wcboxContent} onClose={closeWcbox} />}
    </div>
  );
};

export default VerticalText;
