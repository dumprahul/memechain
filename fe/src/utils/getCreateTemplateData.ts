import { encodeFunctionData } from "viem";
import { MEMECAST_ABI } from "./constants";
export default function getCreateTemplateData(
  cateoryId: string,
  metadataUrl: string
) {
  return encodeFunctionData({
    abi: MEMECAST_ABI,
    functionName: "createTemplate",
    args: [BigInt(cateoryId), metadataUrl],
  });
}
