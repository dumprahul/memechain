'use client';
import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Navbar from '../../components/Navbar';
import { useSearchParams } from 'next/navigation';

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [textBoxes, setTextBoxes] = useState([]);
  const [font, setFont] = useState("Bread Coffee");
  const [fontSize, setFontSize] = useState("40");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [stickers, setStickers] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for controlling the modal

  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl"); // Get the imageUrl from query parameters

  const stickerOptions = [
    "/stickers/blunt.png",
    "/stickers/doge.png",
    "/stickers/laser.png",
    "/stickers/sunglass.png",
    "/stickers/vibecat.png",
  ];

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteText = (index) => {
    setTextBoxes(textBoxes.filter((_, i) => i !== index));
  };

  const handleDeleteSticker = (index) => {
    setStickers(stickers.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setShowModal(true); // Show the modal when submit is clicked
  };
  

  const handleModalSubmit = () => {
    console.log("Meme submitted!");
    setShowModal(false); // Close the modal after submission
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal without submission
  };

  const addSticker = (stickerSrc) => {
    setStickers([...stickers, { src: stickerSrc, x: 0, y: 0 }]);
  };

  const addTextBox = () => {
    setTextBoxes([
      ...textBoxes,
      {
        text: "",
        x: 0,
        y: 0,
        font: font,
        fontSize: fontSize,
        color: textColor,
      },
    ]);
  };

  const updateTextBox = (index, updatedBox) => {
    const updatedTextBoxes = textBoxes.map((box, i) =>
      i === index ? updatedBox : box
    );
    setTextBoxes(updatedTextBoxes);
  };

  return (
    <div>
      <Navbar />
      <div className="pt-8 flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100" style={{ backgroundColor: '#f5f589' }}>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center text-black">
          MEME BUILDER ⚒️🔥
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-4">
          <label htmlFor="file-upload" className="btn btn-secondary px-4 py-2 text-sm md:text-base">
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={addTextBox}
            className="btn btn-primary px-4 py-2 text-sm md:text-base"
          >
            Add Text
          </button>

          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="btn  btn-primary  px-4 py-2 text-sm md:text-base"
          >
            <option value="Arial">Arial</option>
            <option value="Bread Coffee">Bread Coffee</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="btn btn-primary px-4 py-2 text-sm md:text-base"
          >
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
          </select>

          <select
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="btn  btn-primary  px-4 py-2 text-sm md:text-base"
          >
            <option value="#FFFFFF">White</option>
            <option value="#000000">Black</option>
            <option value="#FF0000">Red</option>
            <option value="#00FF00">Green</option>
            <option value="#0000FF">Blue</option>
          </select>

          <select
            onChange={(e) => addSticker(e.target.value)}
            className="btn btn-primary px-4 py-2 text-sm md:text-base"
          >
            <option value="">Select a sticker</option>
            {stickerOptions.map((stickerPath, index) => (
              <option key={index} value={stickerPath}>
                Sticker {index + 1}
              </option>
            ))}
          </select>

          {image && (
            <button
              onClick={handleSubmit}
              className="btn  btn-primary  px-4 py-2 text-sm md:text-base"
            >
              Submit Meme
            </button>
          )}
        </div>

        {/* Meme Layout Container */}
        <div
          className="relative border-2 border-gray-300 p-4 md:p-8 rounded-lg bg-white flex items-center justify-center"
          style={{
            width: '1000px',
            height: '400px'
          }}
        > 
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                id="uploadedImage"
                src={image}
                alt="Meme"
                className="max-w-full max-h-full border-4 border-gray-500 rounded-md"
              />
              {textBoxes.map((box, index) => (
                <Rnd
                  key={index}
                  bounds="parent"
                  position={{ x: box.x, y: box.y }}
                  onDragStop={(e, d) =>
                    updateTextBox(index, { ...box, x: d.x, y: d.y })
                  }
                  className="absolute"
                  style={{
                    fontFamily: box.font,
                    fontSize: `${box.fontSize}px`,
                    color: box.color,
                    border: '2px dashed rgba(255, 255, 255, 0.5)',
                    padding: '8px',
                  }}
                >
                  <div>
                    <input
                      type="text"
                      value={box.text}
                      onChange={(e) =>
                        updateTextBox(index, { ...box, text: e.target.value })
                      }
                      style={{
                        fontFamily: box.font,
                        fontSize: `${box.fontSize}px`,
                        color: box.color,
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleDeleteText(index)}
                      className="btn btn-outline btn-secondary"
                    >
                      X
                    </button>
                  </div>
                </Rnd>
              ))}
              {stickers.map((sticker, index) => (
                <Rnd
                  key={index}
                  bounds="parent"
                  position={{ x: sticker.x, y: sticker.y }}
                  onDragStop={(e, d) =>
                    setStickers(
                      stickers.map((sticker, i) =>
                        i === index ? { ...sticker, x: d.x, y: d.y } : sticker
                      )
                    )
                  }
                  className="absolute"
                >
                  <div>
                    <img
                      src={sticker.src}
                      alt="Sticker"
                      className="max-w-[100px] max-h-[100px]"
                    />
                    <button
                      onClick={() => handleDeleteSticker(index)}
                      className="btn btn-outline btn-secondary"
                    >
                      X
                    </button>
                  </div>
                </Rnd>
              ))}
            </div>
          ) : (
            <p className="text-center">Upload an image to start editing your meme</p>
          )}
        </div>

        {/* Modal for form submission */}
        {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative bg-white p-32 rounded-lg shadow-lg w-max">
                  <button
                    onClick={handleModalCancel}
                    className="absolute top-4 right-4 text-black text-3xl font-bold"
                    style={{ width: '40px', height: '40px' }}
                  >
                    &times;
                  </button>
                  <div className="flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold mb-6 text-black">
                      Your Template has been created on-chain!
                    </h2>
                    <button
                              type="button"
                              className="btn btn-primary mt-4 w-full bg-black text-black"
                              style={{ backgroundColor: "#000", color: "#fff" }}
                              onClick={() => {
                                if (proposalMetadata.tokenImageUrl) {
                                  window.open(proposalMetadata.tokenImageUrl, "_blank");
                                }
                              }}
                            >
                              {proposalMetadata.tokenImageUrl ? "Metadata Pinned in IPFS ✅ Click here to view 🎉" : "Minting your Token on IPFS....."}
                    </button>
                    <button
                              type="button"
                              className="btn btn-primary mt-4 w-full bg-black text-black"
                              style={{ backgroundColor: "#000", color: "#fff" }}
                              onClick={() => {
                                if (txHash) {
                                  const explorerUrl = `https://explorer-aurachain-kooclv2ptj.t.conduit.xyz/tx/${txHash}`;
                                  window.open(explorerUrl, "_blank");
                                }
                              }}
                            >
                              {txHash 
                                ? `Transaction Confirmed ✅ Click here to view on explore 🎉`
                                : "Your Transaction is getting placed....."}
                    </button>
                    <button
                              type="button"
                              className="btn btn-primary mt-4 w-full bg-black text-black"
                              style={{ backgroundColor: "#000", color: "#fff" }}
                              onClick={() => {
                  
                              }}
                            > Share On WarpCast!       
                    </button>
                  </div>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default MemeEditor;
