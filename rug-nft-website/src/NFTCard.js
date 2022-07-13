import React from 'react'

const NFTCard = ( {nft} ) => {
  return (
    <div className=''>
        <img src={nft.metadata.image} />
        <button>Rug Mint</button>
    </div>
  )
}

export default NFTCard