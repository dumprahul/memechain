import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useLocation } from 'react-router-dom';

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [textBoxes, setTextBoxes] = useState([]);
  const [font, setFont] = useState('Bread Coffee');
  const [fontSize, setFontSize] = useState('40');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [stickers, setStickers] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const imageUrl = queryParams.get('image');
    if (imageUrl) {
      setImage(decodeURIComponent(imageUrl));
    }
  }, [location]);

  const stickerOptions = [
    'src/assets/stickers/blunt_1_optimized.png',
    'src/assets/stickers/dogedog_optimized.png',
    'src/assets/stickers/laser_1_optimized.png',
    'src/assets/stickers/sunglass_optimized.png',
    'src/assets/stickers/vibecat_op.jpg',
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
    const imageElement = document.getElementById('uploadedImage');
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const actualWidth = imageElement.naturalWidth;
    const actualHeight = imageElement.naturalHeight;
    canvas.width = actualWidth;
    canvas.height = actualHeight;

    ctx.drawImage(imageElement, 0, 0, actualWidth, actualHeight);

    const scaleX = actualWidth / imageElement.width;
    const scaleY = actualHeight / imageElement.height;

    textBoxes.forEach((box) => {
      ctx.font = `${box.fontSize * scaleX}px ${box.font}`;
      ctx.fillStyle = box.color;
      ctx.textAlign = 'center';
      ctx.fillText(box.text, box.x * scaleX, (box.y + parseInt(box.fontSize)) * scaleY);
    });

    stickers.forEach(sticker => {
      const stickerImage = new Image();
      stickerImage.src = sticker.src;
      stickerImage.onload = () => {
        ctx.drawImage(stickerImage, sticker.x * scaleX, sticker.y * scaleY, stickerImage.width * scaleX, stickerImage.height * scaleY);
      };
    });

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
    }, 1000);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100" style={{ backgroundColor: '#f5f589' }}>
      {/* Buttons Container */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center" style={{ fontFamily: 'Bread Coffee' }} id="font">
       LETSF MEME CASTTTT ⚒️🔥
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-4">
        <label htmlFor="file-upload" className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base" style={{ fontFamily: 'Bread Coffee' }}>
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button onClick={addTextBox} className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base" style={{ fontFamily: 'Bread Coffee' }}>
          Add Text
        </button>

        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base"
          style={{ fontFamily: 'Bread Coffee' }}
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
          className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base"
          style={{ fontFamily: 'Bread Coffee' }}
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
          className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base"
          style={{ fontFamily: 'Bread Coffee' }}
        >
          <option value="#FFFFFF">White</option>
          <option value="#000000">Black</option>
          <option value="#FF0000">Red</option>
          <option value="#00FF00">Green</option>
          <option value="#0000FF">Blue</option>
        </select>

        <select
          onChange={(e) => addSticker(e.target.value)}
          className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base"
          style={{ fontFamily: 'Bread Coffee' }}
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
            onClick={handleDownload}
            className="btn btn-neutral btn-secondary px-4 py-2 text-sm md:text-base"
          >
            Download Meme
          </button>
        )}
      </div>

      {/* Meme Layout Container */}
      <div className="relative w-full max-w-screen-lg h-96 md:h-[600px] border-2 border-gray-300 p-4 md:p-8 rounded-lg bg-white flex items-center justify-center">
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
                  setStickers(stickers.map((s, i) =>
                    i === index ? { ...s, x: d.x, y: d.y } : s
                  ))
                }
                className="absolute"
                style={{
                  border: '2px dashed rgba(255, 255, 255, 0.5)',
                  padding: '8px',
                }}
              >
                <img
                  src={sticker.src}
                  alt="sticker"
                  className="max-w-full max-h-full"
                />
                <button
                  onClick={() => handleDeleteSticker(index)}
                  className="btn btn-outline btn-secondary"
                >
                  X
                </button>
              </Rnd>
            ))}
          </div>
        ) : (
          <p className="text-lg">No image selected</p>
        )}
      </div>
    </div>
  );
};

export default MemeEditor;
