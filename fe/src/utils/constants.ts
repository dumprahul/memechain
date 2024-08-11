import { defineAlchemyChain } from "@account-kit/infra";
import { defineChain } from "viem";

export const MEMECAST_ADDRESS = "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37";
const auraChain = defineChain({
  id: 88759,
  name: "Aura Chain",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-aurachain-kooclv2ptj.t.conduit.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout Explorer",
      url: "https://explorer-aurachain-kooclv2ptj.t.conduit.xyz/",
    },
  },
  contracts: {},
});
export const alchemyAuraChain = defineAlchemyChain({
  chain: auraChain,
  rpcBaseUrl: "",
});

export const MEMECAST_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
    ],
    name: "MemeCategoryDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "templateId",
        type: "uint256",
      },
    ],
    name: "TemplateDoesNotExist",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AuraClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_memeCategoryId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "address",
            name: "proposedBy",
            type: "address",
          },
          {
            internalType: "address",
            name: "memeTokenAddress",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct Memecast.MemeCategory",
        name: "memeCategory",
        type: "tuple",
      },
    ],
    name: "MemeCategoryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "memeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_memeCategoryId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "templateId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct Memecast.Meme",
        name: "meme",
        type: "tuple",
      },
    ],
    name: "MemeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MemeTokensClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "templateId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_memeCategoryId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct Memecast.Template",
        name: "template",
        type: "tuple",
      },
    ],
    name: "TemplateCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_memeCategoryId",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_tokenAmount",
        type: "uint256[]",
      },
    ],
    name: "_claimAuraAndMemeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "aura",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "categories",
    outputs: [
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        internalType: "address",
        name: "proposedBy",
        type: "address",
      },
      {
        internalType: "address",
        name: "memeTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "categoriesCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "templateId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "createMeme",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "createMemeCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "createTemplate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getAuraBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
    ],
    name: "memeTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "memes",
    outputs: [
      {
        internalType: "uint256",
        name: "memeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "templateId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "memesCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_auraContract",
        type: "address",
      },
    ],
    name: "setAuraContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "templates",
    outputs: [
      {
        internalType: "uint256",
        name: "templateId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_memeCategoryId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "templatesCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
