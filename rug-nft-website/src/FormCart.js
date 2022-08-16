import React, { useContext } from 'react';
import NFTContext from './nftContext';
import './FormCart.css';

const FormCart = () => {
    const { selectedNft } = useContext(NFTContext);

  return (
    <div className="imgs">
        <h3>Nft Image</h3>
        <input src={selectedNft} name="img" className='nft-image' type="image" />
    </div> 

  )
}

export default FormCart