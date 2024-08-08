import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('40');

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
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, textPosition.x, textPosition.y + parseInt(fontSize));

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex border-2 border-gray-300 p-8 rounded-lg w-[900px] h-[600px]">
        <div className="w-2/3 flex items-center justify-center">
          {image ? (
            <div className="relative">
              <img id="uploadedImage" src={image} alt="Meme" className="max-w-full max-h-full" />
              <Rnd
                bounds="parent"
                position={{ x: textPosition.x, y: textPosition.y }}
                onDragStop={(e, d) => setTextPosition({ x: d.x, y: d.y })}
                className={`absolute text-white`}
                style={{ fontFamily: font, fontSize: `${fontSize}px` }}
              >
                <div>{text}</div>
              </Rnd>
            </div>
          ) : (
            <div className="text-gray-400">No image uploaded yet</div>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-start justify-start ml-8 space-y-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your meme text"
            className="p-2 border border-gray-400 rounded w-full"
          />

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
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
            </select>
          </div>

          {image && (
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            >
              Download Meme
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;
