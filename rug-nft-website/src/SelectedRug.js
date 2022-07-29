import React, { useContext } from 'react';
import NFTContext from './nftContext';

const SelectedRug = () => {

    const {selectedNft} = useContext(NFTContext)
  return (
    <div>
        <h3>Your Selected NFT</h3>
        <img src={selectedNft} className="selected-img"/>
    </div>
  )
}

export default SelectedRug