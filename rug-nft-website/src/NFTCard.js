import React from 'react'

const NFTCard = ( {nft} ) => {

  return (
    <div className='card'>
    <img src={nft.meta.content[0].url} />
    </div>
  )
}

export default NFTCard
