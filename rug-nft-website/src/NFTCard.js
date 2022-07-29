import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NFTContext from './nftContext';

const NFTCard = ( {nft } ) => {
  const { setSelectedNft } = useContext(NFTContext);
  return (
    <div className='card'>
    <img src={nft.meta.content[0].url} className="nft-images" onClick={(e)=>{setSelectedNft(e.target.src)}}/>
    <p>{nft.meta.name}</p>
    <Link className='submit-button' to="/form"><button className='mint-button'>Mint Your Rug</button></Link>
    </div>
  )
}

export default NFTCard
