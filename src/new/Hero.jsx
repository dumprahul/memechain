import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-bold mb-4">Propose Your Meme</h2>
        <form className="flex flex-col gap-4">
          <label>
            Enter meme token:
            <input type="text" className="modal-input" />
          </label>
          <label>
            Enter meme category:
            <input type="text" className="modal-input" />
          </label>
          <label>
            Enter meme description:
            <textarea className="modal-input" rows="4"></textarea>
          </label>
          <label>
            Give a token picture:
            <input type="file" className="modal-input" />
          </label>
          <button type="submit" className="modal-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const Hero = () => {
  const [showPropose, setShowPropose] = useState(false);
  const [showOldContent, setShowOldContent] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setShowOldContent(false); // Hide old content
    setTimeout(() => setShowPropose(true), 500); // Delay to allow old content to fade out
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f5f589]">
      {/* Old Content */}
      {showOldContent && (
        <div className="flex flex-col justify-center items-center transition-opacity duration-700 ease-out transform scale-100 opacity-100">
          <h1 className="text-8xl font-bold" style={{ fontFamily: 'Bread Coffee' }} id="font">
            AURA 🔥 CHAIN ⛓️
          </h1>
          <p className="text-center text-2xl max-w-2xl mt-2" style={{ fontFamily: 'Bread Coffee' }} id="font">
            Get your memes attested on-chain and get rewards!
          </p>
          <button
            className="btn mt-5"
            style={{ fontFamily: 'Bread Coffee' }}
            onClick={handleClick}
          >
            LESSSGOOOO! 🧿
          </button>
        </div>
      )}

      {/* New Content */}
      {showPropose && (
        <div
          className="flex flex-col justify-center items-center mt-10 transition-opacity duration-700 ease-in-out transform scale-110 opacity-100"
          style={{ opacity: showPropose ? 1 : 0, transform: showPropose ? 'scale(1)' : 'scale(0.9)' }}
        >
          <h2 className="text-8xl font-bold mb-4" style={{ fontFamily: 'Bread Coffee' }} id="font">
            🏹 PROPOSE A MEME 🚀
          </h2>

          <p className="text-center text-xl max-w-2xl mt-2" style={{ fontFamily: 'Bread Coffee' }} id="font">
            Create your own meme token and propose a meme to DAO 🎉 !
          </p>

          <button
            className="btn mt-5"
            style={{ fontFamily: 'Bread Coffee' }}
            onClick={openModal}
          >
            LF Propose !
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default Hero;
