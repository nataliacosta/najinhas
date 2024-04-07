import Image from "next/image";
import getNormalizedURI from "@/utils/getNormalizedURI";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { IPFS_GATEWAY } from "constants/urls";
import useEnsAvatar from "@/hooks/fetch/useEnsAvatar";
import { zeroAddress } from "viem";

export default function UserAvatar({
  address,
  className,
  diameter,
}: {
  address: `0x${string}`;
  className: string;
  diameter?: number;
}) {
  const { data: ensAvatar } = useEnsAvatar(address);

  if (ensAvatar?.ensAvatar)
    return (
        <Image alt="avatar" src={ensAvatar.ensAvatar} className={className} height={diameter || 24} width={diameter || 24}/>
    );
/*
  if (ensAvatar.includes("ipfs"))
    return (
      <Image
        src={getNormalizedURI(ensAvatar, {
          preferredIPFSGateway: IPFS_GATEWAY,
        })}
        className={className}
        alt="avatar"
        height={20}
        width={20}
      />
    );
*/
  return (
    <div className={className}>
      <Jazzicon diameter={diameter} seed={jsNumberForAddress(address ?? zeroAddress)} />
    </div>
  )
}
