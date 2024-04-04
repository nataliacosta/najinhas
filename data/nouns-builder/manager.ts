import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { MANAGER_CONTRACT } from "constants/addresses";

const { manager } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type DAOAddresses = {
  metadata: `0x${string}`;
  auction: `0x${string}`;
  treasury: `0x${string}`;
  governor: `0x${string}`;
};

export const getAddresses = async ({
  tokenAddress,
}: {
  tokenAddress: `0x${string}`;
}): Promise<DAOAddresses> => {
  /*
  const { metadata, auction, treasury, governor } = await manager({
    address: MANAGER_CONTRACT,
  }).getAddresses(tokenAddress);
  */
  const metadata = "0x4582ed302912ecab6916f4b6ea0c0d32997936fd";
  const auction = "0x266e59b12ba1926f0844e25036c7c5bb686d6a53";
  const treasury = "0xb3e3ca5d1ea1566a4c616a55fa5be8335b0bdb83";
  const governor = "0xf026ff3457be1a30089b6bca9fe939b216bea043";
  
  return { metadata, auction, treasury, governor };
};
