import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [showPropose, setShowPropose] = useState(false);
  const [showOldContent, setShowOldContent] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [memeToken, setMemeToken] = useState('');
  const [memeCategory, setMemeCategory] = useState('');
  const [memeDescription, setMemeDescription] = useState('');
  const [tokenPicture, setTokenPicture] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowOldContent(false);
    setTimeout(() => setShowPropose(true), 500);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', { memeToken, memeCategory, memeDescription, tokenPicture });
    closeModal(); // Close the modal after submitting
    navigate('/memes'); // Redirect to Memes page
  };

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
        <div className="propose-container" id="font">
          <h2 className="propose-heading">
            🏹 PROPOSE A MEME 🚀
          </h2>

          <p className="propose-description">
            Create your own meme token and propose a meme to DAO 🎉
          </p>

          <div className="button-grid">
            <button className="btn btn-default" onClick={() => navigate('/memes')} style={{ fontFamily: 'Bread Coffee' }} >View Memes</button>
            <button className="btn btn-default" onClick={openModal} style={{ fontFamily: 'Bread Coffee' }} >Proposed Memes</button>
            <button className="btn btn-default" onClick={() => navigate('/meme-editor')} style={{ fontFamily: 'Bread Coffee' }} >Create Template</button>
            <button className="btn btn-default" onClick={() => navigate('/meme-editor')} style={{ fontFamily: 'Bread Coffee' }} >Create Meme</button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>✕</button>
            <h2 className="modal-heading">Propose Your Meme</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-label">
                Enter meme token:
                <input
                  type="text"
                  className="modal-input"
                  value={memeToken}
                  onChange={(e) => setMemeToken(e.target.value)}
                />
              </label>
              <label className="modal-label">
                Enter meme category:
                <input
                  type="text"
                  className="modal-input"
                  value={memeCategory}
                  onChange={(e) => setMemeCategory(e.target.value)}
                />
              </label>
              <label className="modal-label">
                Enter meme description:
                <textarea
                  className="modal-input"
                  rows="4"
                  value={memeDescription}
                  onChange={(e) => setMemeDescription(e.target.value)}
                ></textarea>
              </label>
              <label className="modal-label">
                Give a token picture:
                <input
                  type="file"
                  className="modal-input"
                  onChange={(e) => setTokenPicture(e.target.files[0])}
                />
              </label>
              <button type="submit" className="modal-submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
