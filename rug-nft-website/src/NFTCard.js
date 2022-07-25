import React from 'react'

const NFTCard = ( {nft} ) => {

  return (
    <div className='card'>
    <img src={nft.meta.content[0].url} />
    <p>{nft.meta.name}</p>
    <button className='mint-button'>Mint Your Rug</button>
    </div>
  )
}

export default NFTCard
