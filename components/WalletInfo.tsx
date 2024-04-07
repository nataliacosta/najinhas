import { Fragment, useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { getAddress, size, zeroAddress } from "viem";
import useEnsName from "@/hooks/fetch/useEnsName";
import UserAvatar from "./UserAvatar";

export const WalletInfo = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName(address);
  const [theme] = useTheme();

  if (!address) return <Fragment />;

  const name = () => {
    if (ensName?.ensName) {
      const name = ensName?.ensName;
      return name;
    } else {
      return shortenAddress(address ? getAddress(address) : ethers.constants.AddressZero, 4);
    }
  };

  return (
    <div className="flex items-center">
    <div className="flex items-center mt-2">
        <UserAvatar className="h-6 rounded-full mr-2" address={address} />
        <div className="text-skin-base ">
          {name()}
        </div>
    </div>
    </div>
  );
};
