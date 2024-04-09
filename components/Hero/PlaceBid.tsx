import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  Address,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const PlaceBid = ({
  highestBid,
  auction,
  tokenId,
}: {
  highestBid?: string;
  auction?: string;
  tokenId?: string;
}) => {
  const { address } = useAccount();
  const [bid, setBid] = useState("");
  const debouncedBid = useDebounce(bid, 500);
  const [theme] = useTheme();

  const { config, error } = usePrepareContractWrite({
    address: auction as Address,
    abi: AuctionABI,
    functionName: "createBid",
    args: [BigNumber.from(tokenId || 1)],
    overrides: {
      value: utils.parseEther(debouncedBid || "0"),
    },
    enabled: !!auction && !!debouncedBid,
  });
  const { write, data } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });
  
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const highestBidBN = BigNumber.from(highestBid);
  const amountIncrease = highestBidBN.div("10");
  const nextBidAmount = highestBidBN.add(amountIncrease);

  const getError = () => {
    if (!error?.message) return;
    const message = error?.message;

    if (message.includes("insufficient funds"))
      return "Error insufficent funds for bid";

    if (debouncedBid && debouncedBid < utils.formatEther(nextBidAmount))
      return "Error invalid bid";
  };
  console.log(nextBidAmount);
  return (
    <Fragment>
      <div className="mt-12 sm:mt-6 flex flex-col sm:flex-row">
        <input
          value={bid}
          type="number"
          onChange={(e) => setBid(e.target.value)}
          className="bg-skin-backdrop text-skin-base placeholder:text-skin-muted px-3 py-3 rounded-lg w-full text-2xl mr-2 focus:outline-none"
          placeholder={
            nextBidAmount ? `Ξ ${highestBid == "0x00" ? "0.0003" : utils.formatEther(nextBidAmount)} or more` : ""
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (isConnected) {
            write?.();
            } else {
              openConnectModal?.();
            }
          }}
          className="bg-skin-button-accent transition ease-in-out hover:scale-110 hover:bg-skin-button-accent-hover text-skin-base rounded-lg text-xl w-full sm:h-auto h-12 mt-4 sm:mt-0 sm:w-40 flex items-center justify-around"
        >
          {isLoading ? (
            <Image src="/spinner.svg" height={24} width={24} alt="spinner" />
          ) : (
            <span>{theme.strings.placeBid || "Place bid"}</span>
          )}
        </button>
      </div>
      {error && (
        <p className="w-96 h-auto break-words text-center mt-5 text-red-500">
          {getError()}
        </p>
      )}
    </Fragment>
  );
};
