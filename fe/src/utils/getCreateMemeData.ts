import { encodeFunctionData } from "viem";
import { MEMECAST_ABI } from "./constants";
export default function getCreateMemeData(
  templateId: string,
  cateoryId: string,
  metadataUrl: string
) {
  return encodeFunctionData({
    abi: MEMECAST_ABI,
    functionName: "createMeme",
    args: [BigInt(templateId),BigInt(cateoryId), metadataUrl],
  });
}
