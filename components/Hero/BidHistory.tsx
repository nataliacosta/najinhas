import { Bid } from "@/services/nouns-builder/auction";
import { utils } from "ethers";
import ExternalLink from "../ExternalLink";
import Image from "next/image";
import { ETHERSCAN_BASEURL } from "constants/urls";
import { WalletInfo } from "../WalletInfo";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalWrapper from "../ModalWrapper";
import BidHistoryModal from "../BidHistoryModal";

function BidRow({ bid, fontSize }: { bid: Bid; fontSize?: string; }) {
    if (!fontSize) {
        fontSize = "1"
    }
    return (
        <div
            className={
                "flex flex-row justify-between items-center w-full py-3 sm:border-b border-skin-stroke "
            }
        >
            <WalletInfo address={bid.bidder} />
            <ExternalLink href={`${ETHERSCAN_BASEURL}/tx/${bid.transactionHash}`}>
                <div className="flex flex-row gap-2 items-center hover:opacity-70 transition-opacity">
                    <h6 className="text-skin-base">Ξ {utils.formatEther(bid.bidAmount || "0")}</h6>
                    <Image src="/link.svg" width={24} height={24} alt="view" className=" " />
                </div>
            </ExternalLink>
        </div>
    );
}

export default function BidHistory({
    bids,
    numToShow,
    title,
    imgsrc,
    tokenName
}: {
    bids?: Bid[];
    numToShow: number;
    title?: string;
    imgsrc: string;
    tokenName: string;
}) {
    return (
        <div className="mt-5">
            <div className="text-lg text-skin-muted">
                {title}
            </div>
            <BidList bids={bids} numToShow={numToShow} />
            {(bids?.length ?? 0) > numToShow && (
                <div className="flex flex-col items-center mt-5">
                    <BidHistoryModal bids={bids} imgsrc={imgsrc} tokenName={tokenName} />
                </div>
            )}
        </div>
    );
}

export function BidList({
    bids,
    numToShow
}: {
    bids?: Bid[];
    numToShow: number;
}) {
    return (
        <div className="flex flex-col items-center">
            {bids?.slice(0, numToShow).map((bid, i) => {
                return <BidRow bid={bid} key={i} />;
            })}
        </div>
    )
}