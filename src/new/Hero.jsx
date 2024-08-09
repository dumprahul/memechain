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

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'white',
      color: 'black',
      padding: '20px',
      borderRadius: '8px',
      width: '80%',
      maxWidth: '600px',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '24px',
      cursor: 'pointer',
    },
    input: {
      fontFamily: 'Bread Coffee, sans-serif',
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '4px',
      width: '100%',
    },
    submitButton: {
      fontFamily: 'Bread Coffee, sans-serif',
      backgroundColor: '#f5f589',
      color: 'black',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    label: {
      fontFamily: 'Bread Coffee, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    heading: {
      fontFamily: 'Bread Coffee, sans-serif',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
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
      {modalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button style={modalStyles.closeButton} onClick={closeModal}>✕</button>
            <h2 style={modalStyles.heading}>Propose Your Meme</h2>
            <form style={modalStyles.form} onSubmit={handleSubmit}>
              <label style={modalStyles.label}>
                Enter meme token:
                <input
                  type="text"
                  style={modalStyles.input}
                  value={memeToken}
                  onChange={(e) => setMemeToken(e.target.value)}
                />
              </label>
              <label style={modalStyles.label}>
                Enter meme category:
                <input
                  type="text"
                  style={modalStyles.input}
                  value={memeCategory}
                  onChange={(e) => setMemeCategory(e.target.value)}
                />
              </label>
              <label style={modalStyles.label}>
                Enter meme description:
                <textarea
                  style={modalStyles.input}
                  rows="4"
                  value={memeDescription}
                  onChange={(e) => setMemeDescription(e.target.value)}
                ></textarea>
              </label>
              <label style={modalStyles.label}>
                Give a token picture:
                <input
                  type="file"
                  style={modalStyles.input}
                  onChange={(e) => setTokenPicture(e.target.files[0])}
                />
              </label>
              <button type="submit" style={modalStyles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
