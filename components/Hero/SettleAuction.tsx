import Image from "next/image";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  Address,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const SettleAuction = ({ auction }: { auction?: string }) => {
  const { config } = usePrepareContractWrite({
    address: auction as Address,
    abi: AuctionABI,
    functionName: "settleCurrentAndCreateNewAuction",
    enabled: !!auction,
  });
  const { write, data, isLoading: contractLoading } = useContractWrite(config);
  const { isLoading: transactionLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isLoading = contractLoading || transactionLoading;

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (isConnected) {
          write?.();
        } else {
          openConnectModal?.();
        }
      }}
      className="w-full bg-skin-button-accent hover:scale-110 hover:bg-skin-button-accent-hover text-skin-base font-bold h-12 mt-6 rounded-lg flex items-center justify-around"
    >
      {isLoading ? (
        <Image src="/spinner.svg" height={26} width={26} alt="spinner" />
      ) : (
        <span>Settle Auction</span>
      )}
    </button>
  );
};
