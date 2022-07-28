import React from 'react'
import NFTCard from './NFTCard'

const NFTContainer = ( { nfts, setBigNft, bigNft }) => {
  return (
    <div className='nft-container'>
        {nfts.map( (nft,index) => {
            return <NFTCard nft={nft} key={index} setBigNft={setBigNft} bigNft={bigNft}/>
        })}
    </div>
  )
}

export default NFTContainer