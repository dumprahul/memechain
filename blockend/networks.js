require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}

const networks = {
 
  baseSepolia: {
    url:
      "https://base-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.BASESCAN_API_KEY || "UNSET",
    chainId: 84532,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    chainlinkVerifier: "",
  },
  auraChain:{
    url:
    "https://rpc-aurachain-kooclv2ptj.t.conduit.xyz",
  gasPrice: undefined,
  nonce: undefined,
  accounts,
  verifyApiKey: "UNSET",
  chainId: 88759,
  confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
  nativeCurrencySymbol: "ETH",
  memeCastDeployment:""
  }
  
};

module.exports = {
  networks,
};
