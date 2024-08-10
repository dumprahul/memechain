import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import {
  useUser,
  useAuthModal,
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { PinataSDK } from "pinata";
import { MEMECAST_ADDRESS } from "@/utils/constants";
import getCreateMemeProposalData from "@/utils/getCreateMemeProposalData";

type ProposalMetadata = {
  name: string;
  symbol: string;
  title: string;
  description: string;
  tokenImageUrl: string;
};

const Hero = () => {
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });

  const [proposalMetadata, setProposalMetadata] = useState<ProposalMetadata>({
    name: "",
    symbol: "",
    title: "",
    description: "",
    tokenImageUrl: "",
  });
  const [proposalMetadataUrl, setProposalMetadataUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const [txHash, setTxHash] = useState<string | null>(null);
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      console.log("Transaction sent: ", hash);
      setTxHash(hash);
    },
    onError: (error) => {
      console.log("ERROR");
      console.log(error);
    },
  });
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
    pinataGateway: "amethyst-impossible-ptarmigan-368.mypinata.cloud",
  });
  return (
    <div className="flex flex-col items-center h-screen bg-[#f5f589] px-4 py-8">
      <Navbar />
      {user == null && (
        <div className="flex-1 flex flex-col justify-center items-center transition-opacity duration-700 ease-out transform scale-100 opacity-100 max-w-screen-md mx-auto mb-16">
          <h1 className="text-3xl md:text-6xl font-bold text-black">
            MEME 🔥 CAST ⛓️
          </h1>
          <p className="text-lg md:text-2xl text-center mt-2 text-black">
            On-chain standard for memes in Farcaster
          </p>
          <button className="btn btn-primary mt-5" onClick={openAuthModal}>
            Connect Wallet To Get Started
          </button>
        </div>
      )}

      {user != null && (
        <div className="flex-1 flex flex-col justify-center items-center max-w-screen-md mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black text-center">
            🏹 Get Started with MemeCast 🚀
          </h2>
          <p className="s md:text-lg text-center mb-6 text-black">
            Propose, create, and view memes shared on the Farcaster Network
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link href={"/allmemes"} className="btn btn-primary">
              View Memes
            </Link>
            <button className="btn btn-primary" onClick={openModal}>
              Propose Memes
            </button>
            <Link href={"/templates"} className="btn btn-primary">
              Create Template
            </Link>
            <Link href={"/meme-editor"} className="btn btn-primary">
              Create Meme
            </Link>
          </div>
        </div>
      )}

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
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const upload = await pinata.upload.json(proposalMetadata);
                const metadataUrl =
                  "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                  upload.IpfsHash +
                  "?pinataGatewayToken=" +
                  process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY;

                setProposalMetadataUrl(metadataUrl);
                const data = getCreateMemeProposalData(
                  proposalMetadata.name,
                  proposalMetadata.symbol,
                  metadataUrl
                );
                sendUserOperation({
                  uo: {
                    target: MEMECAST_ADDRESS as `0x${string}`,
                    data: data,
                    value: BigInt("0"),
                  },
                });
              }}
            >
              <div className="flex space-x-3">
                {" "}
                <label className="block text-black">
                  Enter Meme Name:
                  <input
                    type="text"
                    className="modal-input mt-1 block w-full"
                    value={proposalMetadata.name}
                    onChange={(e) => {
                      setProposalMetadata({
                        ...proposalMetadata,
                        name: e.target.value,
                      });
                    }}
                  />
                </label>{" "}
                <label className="block text-black">
                  Enter Meme Symbol:
                  <input
                    type="text"
                    className="modal-input mt-1 block w-full"
                    value={proposalMetadata.symbol}
                    onChange={(e) => {
                      setProposalMetadata({
                        ...proposalMetadata,
                        symbol: e.target.value,
                      });
                    }}
                  />
                </label>
              </div>
              <label className="block text-black">
                Enter Proposal Title:
                <input
                  type="text"
                  className="modal-input mt-1 block w-full"
                  value={proposalMetadata.title}
                  onChange={(e) => {
                    setProposalMetadata({
                      ...proposalMetadata,
                      title: e.target.value,
                    });
                  }}
                />
              </label>
              <label className="block text-black">
                Enter Proposal Description:
                <textarea
                  className="modal-input mt-1 block w-full"
                  rows={4}
                  value={proposalMetadata.description}
                  onChange={(e) => {
                    setProposalMetadata({
                      ...proposalMetadata,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </label>
              <label className="block text-black">
                Upload Meme Token Image:
                <input
                  type="file"
                  className="modal-input mt-1 block w-full"
                  onChange={async (e) => {
                    if (e.target == null || e.target.files == null) return;
                    const file = e.target.files[0];

                    if (file != null) {
                      const upload = await pinata.upload.file(file);
                      console.log(
                        "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                          upload.IpfsHash +
                          "?pinataGatewayToken=" +
                          process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
                      );
                      setProposalMetadata({
                        ...proposalMetadata,
                        tokenImageUrl:
                          "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                          upload.IpfsHash +
                          "?pinataGatewayToken=" +
                          process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY,
                      });
                    }
                  }}
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
