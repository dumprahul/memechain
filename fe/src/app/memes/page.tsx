'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../Navbar'; // Import the Navbar component

export default function Memes() {
  const [cards, setCards] = useState<any>([]);

  // Define images and texts for each button
  const deadpoolCards = [
    { title: 'Deadpool 1', imageUrl: "/memes/d1.jpg" },
    { title: 'Deadpool 2', imageUrl: "/memes/d1.jpg" },
    { title: 'Deadpool 3', imageUrl: "/memes/d1.jpg" },
    { title: 'Create Meme', imageUrl: "/memes/white-bg.jpg" },
  ];

  const wolverineCards = [
    { title: 'Wolverine 1', imageUrl: "/memes/w1.jpg" },
    { title: 'Wolverine 2', imageUrl: "/memes/w1.jpg" },
    { title: 'Wolverine 3', imageUrl: "/memes/w1.jpg" },
    { title: 'Create Meme', imageUrl:  "/memes/white-bg.jpg" },
  ];

  const hawkTuatCards = [
    { title: 'Hawk-Tuat 1', imageUrl: "/memes/h1.jpg" },
    { title: 'Hawk-Tuat 2', imageUrl: "/memes/h1.jpg" },
    { title: 'Create Meme', imageUrl: "/memes/white-bg.jpg" },
  ];

  const drakeCards = [
    { title: 'Create Meme', imageUrl: "/memes/white-bg.jpg" },
  ];

  const handleButtonClick = (cards: any) => {
    setCards(cards);
  };

  const handleCardClick = (imageUrl: any) => {
  };

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with padding-top to accommodate the fixed Navbar */}
      <div className="pt-20 flex flex-col items-center h-screen bg-[#f5f589] py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">
            MEMES AND TEMPLATES 🛠️💣
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-black">
            Edit or Create memes on your own with MemeCast!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className="btn btn-default text-white hover:bg-red-600 py-2 px-4 rounded"
            onClick={() => handleButtonClick(deadpoolCards)}
          >
            Deadpool
          </button>
          <button
            className="btn btn-default text-white hover:bg-yellow-400 py-2 px-4 rounded"
            onClick={() => handleButtonClick(wolverineCards)}
          >
            Wolverine
          </button>
          <button
            className="btn btn-default text-white hover:bg-slate-800 py-2 px-4 rounded"
            onClick={() => handleButtonClick(hawkTuatCards)}
          >
            Hawk-Tuat
          </button>
          <button
            className="btn btn-default text-white hover:bg-orange-400 py-2 px-4 rounded"
            onClick={() => handleButtonClick(drakeCards)}
          >
            Drake
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 overflow-y-auto py-4 w-full max-w-screen-lg">
          {cards.map((card: any, index: number) => (
            <button 
              key={index}
              className="card bg-base-100 image-full w-full shadow-xl border border-black flex flex-col items-center justify-center"
              onClick={() => handleCardClick(card.imageUrl)} // Update to handle click
            >
              <figure><Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover"
                /></figure>
              
              <div className="card-body flex flex-col items-center justify-center p-4">
                <h2 className="card-title text-lg text-center mb-4">
                  {card.title}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
