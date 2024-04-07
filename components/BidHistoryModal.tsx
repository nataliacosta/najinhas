import { Bid } from "@/services/nouns-builder/auction";
import ModalWrapper from "./ModalWrapper";
import { Fragment, useState } from "react";
import Image from "next/image";
import { BidList } from "./Hero/BidHistory";

export default function BidHistoryModal({
    bids,
    imgsrc,
    tokenName
}: {
    bids?: Bid[];
    imgsrc: string;
    tokenName: string;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Fragment>
            <ModalWrapper
                className="w-full max-w-lg bg-skin-fill"
                open={modalOpen}
                setOpen={setModalOpen}
            >
                <div className="flex flex-row gap-4 items-center pb-4 justify-start">
                    <Image
                    src={imgsrc}
                    onLoad={() => setImageLoaded(true)}
                    height={60}
                    width={60}
                    alt="najinha"
                    className={`rounded-md object-scale-down relative z-20 w-100 ${
                        imageLoaded ? "visible" : "invisible"
                    }`}
                    priority />
                    <div className="flex flex-col items-start">
                        <p className="text-skin-base text-lg">Bids for</p>
                        <p className="text-skin-base text-xl">{tokenName}</p>
                    </div>
                    <div className="grow flex flex-col items-end self-start">
                        <Image src="/close.svg" width={24} height={24} alt="close" className="cursor-pointer" onClick={() => setModalOpen(false)}/>
                    </div>
                </div>
                <BidList bids={bids} numToShow={bids?.length || 0}
                />
            </ModalWrapper>
            <button
                className="bg-skin-button-accent text-skin-base rounded-xl px-4 py-3 w-full sm:w-auto mt-8 sm:mt-0"
                onClick={() => setModalOpen(true)}
            >
                View full bid history
            </button>
        </Fragment>
    )
}