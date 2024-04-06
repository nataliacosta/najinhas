import { Bid } from "@/services/nouns-builder/auction";
import { utils } from "ethers";
import ExternalLink from "../ExternalLink";
import Image from "next/image";
import { ETHERSCAN_BASEURL } from "constants/urls";
import { WalletInfo } from "../WalletInfo";

function BidRow({ bid }: { bid: Bid; }) {
    return (
        <div
            className={
                "flex flex-row justify-between items-center w-full py-3 sm:border-b border-skin-stroke "
            }
        >
            <WalletInfo address={bid.bidder} />
            <ExternalLink href={`${ETHERSCAN_BASEURL}/tx/${bid.transactionHash}`}>
                <div className="flex flex-row gap-2 items-center hover:opacity-70 transition-opacity">
                    <h6 className="text-primary/70">Ξ {utils.formatEther(bid.bidAmount || "0")}</h6>
                    <Image src="/link.svg" width={24} height={24} alt="view" className=" " />
                </div>
            </ExternalLink>
        </div>
    );
}

export default function BidHistory({
    bids
}: {
    bids?: Bid[];
}) {
    return (
        <div className="mt-5">
            <div className="text-lg text-skin-muted">
                Bid History
            </div>
            <div className="flex flex-col items-center">
                {bids?.map((bid, i) => {
                    return <BidRow bid={bid} key={i} />;
                })}
            </div>
        </div>
    );
}