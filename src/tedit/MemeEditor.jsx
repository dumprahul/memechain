import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [textBoxes, setTextBoxes] = useState([]); // State to manage multiple text boxes
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('40');
  const [textColor, setTextColor] = useState('#FFFFFF'); // Default to white
  const [stickers, setStickers] = useState([]); // State to manage multiple stickers

  const stickerOptions = [
    'src/assets/stickers/blunt_1_optimized.png', // Replace with actual sticker paths
    'src/assets/stickers/dogedog.png',
    'src/assets/stickers/laser.png',
    'src/assets/stickers/sunglass.png',
    'src/assets/stickers/vibecat.jpg',
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageElement = document.getElementById('uploadedImage');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    ctx.drawImage(imageElement, 0, 0);

    textBoxes.forEach((box) => {
      ctx.font = `${box.fontSize}px ${box.font}`;
      ctx.fillStyle = box.color;
      ctx.textAlign = 'center';
      ctx.fillText(box.text, box.x, box.y + parseInt(box.fontSize));
    });

    stickers.forEach(sticker => {
      const stickerImage = new Image();
      stickerImage.src = sticker.src;
      stickerImage.onload = () => {
        ctx.drawImage(stickerImage, sticker.x, sticker.y);
      };
    });

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
    }, 1000); // Small delay to ensure all elements are drawn
  };

  const handleDeleteText = (index) => {
    setTextBoxes(textBoxes.filter((_, i) => i !== index));
  };

  const handleDeleteSticker = (index) => {
    setStickers(stickers.filter((_, i) => i !== index));
  };

  const addSticker = (stickerSrc) => {
    setStickers([...stickers, { src: stickerSrc, x: 0, y: 0 }]);
  };

  const addTextBox = () => {
    setTextBoxes([
      ...textBoxes,
      {
        text: '',
        x: 0,
        y: 0,
        font: font,
        fontSize: fontSize,
        color: textColor,
      },
    ]);
  };

  const updateTextBox = (index, updatedBox) => {
    const updatedTextBoxes = textBoxes.map((box, i) => (i === index ? updatedBox : box));
    setTextBoxes(updatedTextBoxes);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex border-2 border-gray-300 p-8 rounded-lg w-[900px] h-[600px]">
        <div className="w-2/3 flex items-center justify-center">
          {image ? (
            <div className="relative">
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
                    border: '2px dashed rgba(255, 255, 255, 0.5)', // Transparent border for dragging
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
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
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
                    setStickers(stickers.map((s, i) =>
                      i === index ? { ...s, x: d.x, y: d.y } : s
                    ))
                  }
                  className="absolute"
                  style={{
                    border: '2px dashed rgba(255, 255, 255, 0.5)', // Transparent border for dragging
                    padding: '8px',
                  }}
                >
                  <img src={sticker.src} alt="Sticker" className="max-w-full max-h-full" />
                  <button
                    onClick={() => handleDeleteSticker(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  >
                    X
                  </button>
                </Rnd>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No image uploaded yet</div>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-start justify-start ml-8 space-y-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

          <button
            onClick={addTextBox}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Text
          </button>

          <div className="flex flex-col space-y-4">
            {/* Font Dropdown */}
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>

            {/* Font Size Dropdown */}
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            >
             <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>

            {/* Color Dropdown */}
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            >
              <option value="#FFFFFF">White</option>
              <option value="#000000">Black</option>
              <option value="#FF0000">Red</option>
              <option value="#00FF00">Green</option>
              <option value="#0000FF">Blue</option>
            </select>

            {/* Sticker Dropdown */}
            <select
              onChange={(e) => addSticker(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            >
              <option value="">Select a sticker</option>
              {stickerOptions.map((stickerPath, index) => (
                <option key={index} value={stickerPath}>
                  Sticker {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            {/* Download Button */}
            {image && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download Meme
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;
