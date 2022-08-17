import React, { useRef } from 'react';
import NFTCard from './NFTCard';
import CartContext from "./nftContext";
import { useContext } from 'react';
import { useDraggable } from "react-use-draggable-scroll";

const NFTContainer = () => {
  const ref = useRef();
  const { events } = useDraggable(ref);
  const { nfts } = useContext(CartContext);
  return (
    <div className='nft-container' {...events} ref={ref}>
        {nfts.map( (nft,index) => {
            return <NFTCard nft={nft} key={index} />
        })}
    </div>
  )
}

export default NFTContainer