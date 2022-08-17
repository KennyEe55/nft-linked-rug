import React, { useContext, useEffect } from 'react';
import NFTContext from './nftContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ETH from './eth.png';

const SelectedRug = () => {

    const {selectedNft, setDimensions, price, setPrice, dimensions} = useContext(NFTContext);

    useEffect(() => {
    if(dimensions === "100cm x 100cm") {
      setPrice("0.25")
    } if(dimensions === "150cm x 100cm") {
      setPrice("0.32")
    }
    }, [dimensions])
    
  return (
    <div className='container pb-5'>
      <div className='row'>
      <div className='col-sm'>
        <h3>Customize Your Rug</h3>
        <img src={selectedNft} className="selected-img"/>
      </div>
      <div className='col-sm'>
        <div className='m-2'>
        <h4>Price</h4>
        <p>{price}<img src={ETH} className="eth"/></p>
        </div>
        <h4 className='m-2'>Rug Dimensions</h4>
        <Button className='m-2 p-3' variant='outline-primary' 
        value="100cm x 100cm" onClick={(e)=> {setDimensions(e.target.value)}}>
        100cm x 100cm
        </Button>
        <Button className='m-2 p-3' variant='outline-primary'
        value="150cm x 100cm" onClick={(e)=> {setDimensions(e.target.value)}}>
        150cm x 100cm
        </Button>
        <div className='py-3'>
        <Button href='#form' className='m-2 p-3' disabled={!dimensions || !selectedNft}>
          Mint Your Rug
        </Button>
        </div> 
      </div>
      </div>
    </div>
  )
}

export default SelectedRug