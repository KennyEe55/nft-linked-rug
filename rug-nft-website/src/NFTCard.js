import React, { useContext } from 'react';
import NFTContext from './nftContext';

const NFTCard = ( { nft } ) => {
  const { setSelectedNft } = useContext(NFTContext);
  return (
    <div className='card'>
    <img src={nft.meta.content[0].url} className="nft-images" onClick={(e)=>{setSelectedNft(e.target.src)}}/>
    <p>{nft.meta.name}</p>
    </div>
  )
}

export default NFTCard
