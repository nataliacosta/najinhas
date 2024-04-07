import { Fragment } from "react";
import { useEnsName } from "wagmi";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "./UserAvatar";

export const WalletInfo = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address });
  const [theme] = useTheme();

  if (!address) return <Fragment />;

  return (
    <div className="flex items-center">
    <div className="flex items-center mt-2">
        <UserAvatar className="h-6 rounded-full mr-2" address={address} />
        <div className="text-skin-base ">
        {ensName || shortenAddress(address)}
        </div>
    </div>
    </div>
  );
};
