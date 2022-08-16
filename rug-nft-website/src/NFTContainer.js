import React from 'react';
import NFTCard from './NFTCard';
import CartContext from "./nftContext";
import { useContext } from 'react';

const NFTContainer = () => {
  const { nfts } = useContext(CartContext);
  return (
    <div className='nft-container'>
        {nfts.map( (nft,index) => {
            return <NFTCard nft={nft} key={index} />
        })}
    </div>
  )
}

export default NFTContainer