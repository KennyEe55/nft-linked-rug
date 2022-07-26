import React from 'react'
import { Link } from 'react-router-dom'

const NFTCard = ( {nft} ) => {

  return (
    <div className='card'>
<<<<<<< Updated upstream
    <img src={nft.meta.content[0].url} />
=======
    <img src={nft.meta.content[0].url} className="nft-images" />
    <p>{nft.meta.name}</p>
    <Link className='submit-button' to="/form"><button className='mint-button'>Mint Your Rug</button></Link>
>>>>>>> Stashed changes
    </div>
  )
}

export default NFTCard
