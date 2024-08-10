import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local images
import d1 from '../assets/memes/d1.jpg';
import w1 from '../assets/memes/w1.jpg';
import h1 from '../assets/memes/h1.jpg';
import wbg from '../assets/memes/white-bg.jpg';

const Memes = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Define images and texts for each button
  const deadpoolCards = [
    { title: 'Deadpool 1', imageUrl: d1 },
    { title: 'Deadpool 2', imageUrl: d1 },
    { title: 'Deadpool 3', imageUrl: d1 },
    { title: 'Create Meme', imageUrl: wbg },
  ];

  const wolverineCards = [
    { title: 'Wolverine 1', imageUrl: w1 },
    { title: 'Wolverine 2', imageUrl: w1 },
    { title: 'Wolverine 3', imageUrl: w1 },
    { title: 'Create Meme', imageUrl: wbg },
  ];

  const hawkTuatCards = [
    { title: 'Hawk-Tuat 1', imageUrl: h1 },
    { title: 'Hawk-Tuat 2', imageUrl: h1 },
    { title: 'Create Meme', imageUrl: wbg },
  ];

  const drakeCards = [
    { title: 'Create Meme', imageUrl: wbg },
  ];

  const handleButtonClick = (cards) => {
    setCards(cards);
  };

  const handleCardClick = (imageUrl) => {
    navigate(`/meme-editor?image=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#f5f589] py-10">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: 'Bread Coffee' }} id='font'>
          MEMES AND TEMPLATES
        </h1>
        <p className="text-center text-2xl max-w-2xl" style={{ fontFamily: 'Bread Coffee' }} id='font'>
          Edit or Create memes on your own with MemeCast!
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-8 mt-10">
        <button
          className="btn"
          style={{ fontFamily: 'Bread Coffee' }}
          onClick={() => handleButtonClick(deadpoolCards)}
        >
          Deadpool
        </button>
        <button
          className="btn"
          style={{ fontFamily: 'Bread Coffee' }}
          onClick={() => handleButtonClick(wolverineCards)}
        >
          Wolverine
        </button>
        <button
          className="btn"
          style={{ fontFamily: 'Bread Coffee' }}
          onClick={() => handleButtonClick(hawkTuatCards)}
        >
          Hawk-Tuat
        </button>
        <button
          className="btn"
          style={{ fontFamily: 'Bread Coffee' }}
          onClick={() => handleButtonClick(drakeCards)}
        >
          Drake
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-4 py-4">
        {cards.map((card, index) => (
          <button 
            key={index}
            className="card bg-base-100 image-full w-80 shadow-xl border border-black flex flex-col items-center justify-center"
            onClick={() => handleCardClick(card.imageUrl)} // Update to handle click
          >
            <figure>
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-60 object-cover"
              />
            </figure>
            <div className="card-body flex flex-col items-center justify-center p-4">
              <h2 className="card-title text-center mb-4" style={{ fontFamily: 'Bread Coffee' }}>
                {card.title}
              </h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Memes;
