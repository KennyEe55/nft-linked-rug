import React, { useContext } from 'react';
import NFTContext from './nftContext';

const FormCart = () => {
    const { selectedNft } = useContext(NFTContext);

  return (
    <div className="imgs">
        <h3>Nft Image</h3>
        <img src={selectedNft} name="img" className='form-control' />
    </div> 

  )
}

export default FormCart