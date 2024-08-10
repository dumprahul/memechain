import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { baseSepolia, defineAlchemyChain } from "@account-kit/infra";
import { defineChain } from "viem";
import { QueryClient } from "@tanstack/react-query";
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
const alchemyAuraChain = defineAlchemyChain({
  chain: auraChain,
  rpcBaseUrl: "",
});
const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [{ type: "passkey" }, { type: "injected" }],
    ],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig(
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    chain: alchemyAuraChain,
    chains: [{ chain: alchemyAuraChain }, { chain: baseSepolia }],
    ssr: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
