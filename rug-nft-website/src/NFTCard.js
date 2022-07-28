import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NFTCard = ( {nft, setBigNft} ) => {

  return (
    <div className='card'>
    <img src={nft.meta.content[0].url} className="nft-images" onClick={(e)=>{setBigNft(e.target.src)}}/>
    <p>{nft.meta.name}</p>
    <Link className='submit-button' to="/form"><button className='mint-button'>Mint Your Rug</button></Link>
    </div>
  )
}

export default NFTCard
