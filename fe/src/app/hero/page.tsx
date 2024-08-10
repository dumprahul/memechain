'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Navbar from '../Navbar';

const Hero = () => {
  const [showPropose, setShowPropose] = useState(false);
  const [showOldContent, setShowOldContent] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [memeToken, setMemeToken] = useState("");
  const [memeCategory, setMemeCategory] = useState("");
  const [memeDescription, setMemeDescription] = useState("");
  const [tokenPicture, setTokenPicture] = useState(null);

  const handleClick = () => {
    setShowOldContent(false);
    setTimeout(() => setShowPropose(true), 500);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", {
      memeToken,
      memeCategory,
      memeDescription,
      tokenPicture,
    });
    closeModal(); // Close the modal after submitting
    // You can also redirect here if needed
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f5f589] px-4 py-8">
      
      <Navbar />

      {/* Old Content */}
      {showOldContent && (
        <div className="flex flex-col justify-center items-center transition-opacity duration-700 ease-out transform scale-100 opacity-100 max-w-screen-md mx-auto mt-8">
          <h1 className="text-3xl md:text-6xl font-bold text-black">
            AURA 🔥 CHAIN ⛓️
          </h1>
          <p className="text-lg md:text-2xl text-center mt-2 text-black">
            Get your memes attested on-chain and get rewards!
          </p>
          <button className="btn btn-primary mt-5" onClick={handleClick}>
            LESSSGOOOO! 🧿
          </button>
        </div>
      )}

      {/* New Content */}
      {showPropose && (
        <div className="flex flex-col justify-center items-center max-w-screen-md mx-auto mt-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black text-center">
            🏹 Get Started with MemeCast 🚀
          </h2>
          <p className="md:text-lg text-center mb-6 text-black">
            Create your own meme token and propose a meme to DAO 🎉
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/allmemes" className="btn btn-primary">
              View Memes
            </Link>
            <button className="btn btn-primary" onClick={openModal}>
              Propose Memes
            </button>
            <Link href="/memes" className="btn btn-primary">
              Create Template
            </Link>
            <Link href="/meme-editor" className="btn btn-primary">
              Create Meme
            </Link>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Propose Your Meme
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-black">
                Enter meme token:
                <input
                  type="text"
                  className="modal-input mt-1 block w-full"
                  value={memeToken}
                  onChange={(e) => setMemeToken(e.target.value)}
                />
              </label>
              <label className="block text-black">
                Enter meme category:
                <input
                  type="text"
                  className="modal-input mt-1 block w-full"
                  value={memeCategory}
                  onChange={(e) => setMemeCategory(e.target.value)}
                />
              </label>
              <label className="block text-black">
                Enter meme description:
                <textarea
                  className="modal-input mt-1 block w-full"
                  rows="4"
                  value={memeDescription}
                  onChange={(e) => setMemeDescription(e.target.value)}
                ></textarea>
              </label>
              <label className="block text-black">
                Give a token picture:
                <input
                  type="file"
                  className="modal-input mt-1 block w-full"
                  onChange={(e) => setTokenPicture(e.target.files[0])}
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full"
                style={{ backgroundColor: "#f5f589", color: "#000" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
