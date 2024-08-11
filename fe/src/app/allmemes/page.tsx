"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar"; // Import the Navbar component
import { useRouter } from "next/navigation"; // Import useRouter

export default function Memes() {
  const router = useRouter(); // Initialize the router
  const [allCards, setAllCards] = useState<any[]>([]);
  const [displayedCards, setDisplayedCards] = useState<any[]>([]);

  // Define images and texts for each category
  const deadpoolCards = [
    { title: "Deadpool 1", imageUrl: "/memes/d1.jpg", category: "Deadpool" },
    { title: "Deadpool 2", imageUrl: "/memes/d2.jpg", category: "Deadpool" },
    { title: "Deadpool 3", imageUrl: "/memes/d3.jpg", category: "Deadpool" },
  ];

  const wolverineCards = [
    { title: "Wolverine 1", imageUrl: "/memes/w1.jpg", category: "Wolverine" },
    { title: "Wolverine 2", imageUrl: "/memes/w2.jpg", category: "Wolverine" },
    { title: "Wolverine 3", imageUrl: "/memes/w3.jpg", category: "Wolverine" },
    { title: "Wolverine 4", imageUrl: "/memes/w4.jpg", category: "Wolverine" },
  ];

  const hawkTuatCards = [
    { title: "Hawk-Tuat 1", imageUrl: "/memes/h1.jpg", category: "Hawk-Tuat" },
    { title: "Hawk-Tuat 2", imageUrl: "/memes/h2.jpg", category: "Hawk-Tuat" },
  ];

  const drakeCards = [
    { title: "Drake 1", imageUrl: "/memes/dk1.jpg", category: "Drake" },
  ];

  // Combine all categories into a single list
  const combinedCards = [
    ...deadpoolCards,
    ...wolverineCards,
    ...hawkTuatCards,
    ...drakeCards,
  ];

  useEffect(() => {
    // Shuffle and pick a random set of cards
    const shuffledCards = combinedCards
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setAllCards(shuffledCards);
    setDisplayedCards(shuffledCards);
  }, []);

  const handleButtonClick = (category: string) => {
    if (category === "All") {
      setDisplayedCards(allCards);
    } else {
      setDisplayedCards(allCards.filter((card) => card.category === category));
    }
  };

  const handleCardClick = (imageUrl: string) => {
    // Handle card click event here
  };

  const handleBackClick = () => {
    router.push("/"); // Redirect to Hero.jsx
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-[#f5f589] py-6">
        <div className="flex justify-between lg:space-x-24 md:space-x-12 sapce-x-6 items-center mb-6">
          <button
            onClick={handleBackClick}
            className="md:ml-8 ml-4 my-2  rounded-full"
          >
            <svg
              fill="#000000"
              height="70"
              width="70"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 219.151 219.151"
              className="lg:w-[100%] md:w-[80%] w-[60%]"
            >
              <g>
                <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z" />
                <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z" />
              </g>
            </svg>
          </button>
          <div className="text-center mr-8">
            <h1 className=" text-4xl md:text-6xl text-center font-bold mb-4 text-black ">
              MEMES 😎
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto text-black">
              Check out the funniest memes in Farcaster! 😄
            </p>
          </div>
          <div className="ml-8 w-[70px] h-[70px]"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className="btn btn-secondary text-white hover:bg-red-600 py-2 px-4 rounded"
            onClick={() => handleButtonClick("Deadpool")}
          >
            Deadpool
          </button>
          <button
            className="btn btn-secondary text-white hover:bg-yellow-400 py-2 px-4 rounded"
            onClick={() => handleButtonClick("Wolverine")}
          >
            Wolverine
          </button>
          <button
            className="btn btn-secondary text-white hover:bg-slate-800 py-2 px-4 rounded"
            onClick={() => handleButtonClick("Hawk-Tuat")}
          >
            Hawk-Tuat
          </button>
          <button
            className="btn btn-secondary text-white hover:bg-orange-400 py-2 px-4 rounded"
            onClick={() => handleButtonClick("Drake")}
          >
            Drake
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 overflow-y-auto py-4 w-full max-w-screen-lg">
          {displayedCards.map((card: any, index: number) => (
            <button
              key={index}
              className="bg-gray-600 image-full w-full shadow-xl border border-black flex flex-col items-center justify-center"
              onClick={() => handleCardClick(card.imageUrl)} // Update to handle click
            >
              <figure>
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover"
                />
              </figure>

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
