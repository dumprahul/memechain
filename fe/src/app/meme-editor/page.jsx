"use client";
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import getCreateMemeData from "@/utils/getCreateMemeData";
import { useChain, useSendUserOperation, useSmartAccountClient, useUser } from "@account-kit/react";
import createMeme from "@/utils/supabase/write/createMeme";
import { PinataSDK } from "pinata";
import { alchemyAuraChain } from "@/utils/constants";

const MemeEditor = () => {
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage]=useState(null)
  const [textBoxes, setTextBoxes] = useState([]);
  const [font, setFont] = useState("Bread Coffee");
  const [fontSize, setFontSize] = useState("40");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [stickers, setStickers] = useState([]);
  const [memeId, setMemeId]=useState('')
  const [memeUrl, setMemeUrl]=useState('')
  const [showModal, setShowModal] = useState(false); // State for controlling the modal
  const {chain, setChain}=useChain()
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl"); // Get the imageUrl from query parameters
  const [txhash, setTxHash]=useState('')
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async ({ hash, request }) => {
      console.log("Transaction sent: ", hash);
      setTxHash(hash);

      const { data } = await createMeme("1","1", memeUrl, "249577");
      console.log("Create Meme data");
      console.log(data);
    },
    onError: (error) => {
      console.log("ERROR");
      console.log(error);
    },
  });
  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: "amethyst-impossible-ptarmigan-368.mypinata.cloud",
  });
  const stickerOptions = [
    "/stickers/blunt.png",
    "/stickers/doge.png",
    "/stickers/laser.png",
    "/stickers/sunglass.png",
    "/stickers/vibecat.png",
  ];

  useEffect(() => {
    setImage(imageUrl);
    (async function (){
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "fileName", { type: blob.type });
      setUploadImage(file)
    })()
   
  }, [imageUrl]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadImage(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const imageElement = document.getElementById("uploadedImage");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

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
      ctx.textAlign = "center";
      ctx.fillText(
        box.text,
        box.x * scaleX,
        (box.y + parseInt(box.fontSize)) * scaleY
      );
    });

    stickers.forEach((sticker) => {
      const stickerImage = new Image();
      stickerImage.src = sticker.src;
      stickerImage.onload = () => {
        ctx.drawImage(
          stickerImage,
          sticker.x * scaleX,
          sticker.y * scaleY,
          stickerImage.width * scaleX,
          stickerImage.height * scaleY
        );
      };
    });

    setTimeout(() => {
      const link = document.createElement("a");
      link.download = "meme.png";
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

  const handleSubmit = async() => {
    setShowModal(true); // Show the modal when submit is clicked
    const upload = await pinata.upload.file(uploadImage);
    const fileUrl =
      "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
      upload.IpfsHash +
      "?pinataGatewayToken=" +
      process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY;
    console.log(fileUrl);
    setMemeUrl(fileUrl);
    // Trigger set template
    const data = getCreateMemeData("1","1", fileUrl);
    if (chain.id != alchemyAuraChain.id) {
      setChain({
        chain: alchemyAuraChain,
      });
    }
    sendUserOperation({
      uo: {
        target: MEMECAST_ADDRESS,
        data: data,
        value: BigInt("0"),
      },
    });
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

  const handleBackClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar />
      <div
        className="pt-16 flex flex-col items-center  min-h-screen p-4 bg-gray-100"
        style={{ backgroundColor: "#f5f589" }}
      >
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
              MEME BUILDER 🛠️
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto text-black">
              Create your own meme and share it to the world! 🌍
            </p>
          </div>
          <div className="ml-8 w-[70px] h-[70px]"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-4">
         

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

        </div>

        {/* Meme Layout Containerrr */}
        <div className="relative w-full lg:w-[70%] h-[400px] border-2 border-gray-300 p-4 md:p-8 rounded-lg bg-white flex items-center justify-center">
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
                    border: "2px dashed rgba(255, 255, 255, 0.5)",
                    padding: "8px",
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
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
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
            <p className="text-center text-lg md:text-xl text-gray-700">
              No image uploaded
            </p>
          )}
        </div>

        
        {image && (
            <button
              onClick={handleSubmit}
              className="btn  btn-secondary mt-8 px-4 py-2 text-sm md:text-base"
            >
              Submit Meme
            </button>
          )}
        {/* Modal for form submission */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-32 rounded-lg shadow-lg w-max">
              <button
                onClick={handleModalCancel}
                className="absolute top-4 right-4 text-black text-3xl font-bold"
                style={{ width: "40px", height: "40px" }}
              >
                &times;
              </button>
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl font-bold mb-6 text-black">
                  Creating Meme ⌛
                </h2>
                
                <button
                  type="button"
                  className="btn btn-primary mt-4 w-full bg-black text-black"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                  disabled={memeUrl == ""}
                  onClick={() => {
                    window.location.href = memeUrl;
                  }}
                >
                  {memeUrl != ""
                    ? `Pinned on IPFS✅ Click here to view template 📍`
                    : ""}
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-4 w-full bg-black text-black"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                  disabled={txhash == ""}
                  onClick={() => {
                    window.location.href =
                      "https://explorer-aurachain-kooclv2ptj.t.conduit.xyz/tx/" +
                      txhash;
                  }}
                >
                  {txhash != ""
                    ? `Transaction Success ✅ Click here to view 🔍`
                    : ""}
                </button>
               {memeId!="" && <Link
                  className="btn btn-primary mt-4 w-full bg-black text-black"
                  style={{ backgroundColor: "#000", color: "#fff" }}
                 href={"https://warpcast.com/~/compose?text=https://meme-cast.vercel.app/api/meme/"+memeId} 
                >
                 Cast on Warpcast
                </Link>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeEditor;
