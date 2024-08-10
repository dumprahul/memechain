import { encodeFunctionData } from "viem";
import { MEMECAST_ABI } from "./constants";
export default function getCreateMemeProposalData(
  name: string,
  symbol: string,
  metadataUrl: string
) {
  return encodeFunctionData({
    abi: MEMECAST_ABI,
    functionName: "createMemeCategory",
    args: [name, symbol, metadataUrl],
  });
}
