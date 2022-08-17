import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useRef, useContext, useEffect } from 'react';
import NFTContext from './nftContext'; 
import "./form.css"
import ETH from "./eth.png"
import { Contract, utils, providers } from "ethers";
import { RUG_CONTRACT_ADDRESS, abi } from './constant';
import Web3Modal from "web3modal";


const Form = ( ) => {
const [loading, setLoading] = useState(false);
const form = useRef();
const web3ModalRef = useRef();
const { selectedNft, dimensions, price, walletConnected, walletAddress } = useContext(NFTContext); 

function sendEmail (e) {
    e.preventDefault();
    emailjs.sendForm('service_wvg8pw2', 'template_nitjx59', form.current, process.env.REACT_APP_API_KEY);
}


const getProviderOrSigner = async (needSigner = false) => {
    const prov = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(prov);
    console.log(web3Provider)
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
    }
    if(needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    console.log(web3Provider)
    return web3Provider; 
  }

  useEffect(() => {
    if(!walletConnected) {
     web3ModalRef.current = new Web3Modal({
       network: "goerli",
       providerOptions: {},
       disableInjectedProvider: false, 
     });
   }
    }, [walletConnected]);

const makePayment = async() => {
    try {
      if(price >= 0.20){
      console.log("Making Payment");
      const signer = await getProviderOrSigner(true);
      const rugContract = new Contract(RUG_CONTRACT_ADDRESS, abi, signer);
      const tx = await rugContract.payment({
        value: utils.parseEther(price),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("Your order has been confirmed!");
    } else {
      window.alert("Error: Value of ETH is too low! Please try again later. ")
    }
    } catch (err) {
      console.error(err)  
    }
  }; 
   
  return (
    <section id='form'>
    <div className='py-4'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                    <h4>Rug Info</h4>
                    </div>
                    <div className='card-body'>
                    <h5 className='ml-2'>Selected NFT:</h5>
                    <img src={selectedNft} className="rug-pic"/>
                    <p>Dimensions: {dimensions}</p>
                    <p>Subtotal: {price}<img src={ETH} className="eth"/></p>
                    </div>
                    </div> 
                    </div> 
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Basic Information</h4>
                        </div>
                        <div className='card-body'>
                            <form ref={form} className='row' onSubmit={sendEmail}>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>First Name</label>
                                        <input type="text" name="firstname" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Last Name</label>
                                        <input type="text" name="lastname" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Email address</label>
                                        <input type="text" name="email" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Phone number</label>
                                        <input type="text" name="phone" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='form-group mb-3'>
                                        <label>Full address</label>
                                        <input type="text" name="address" className='form-control' />
                                    </div> 
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Postal Code</label>
                                        <input type="text" name="postal-code" className='form-control' />
                                    </div> 
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Country</label>
                                        <input type="text" name="country" className='form-control' />
                                    </div> 
                                </div>
                                    <div className='invisible'>
                                        <label>NFT Image</label>
                                        <input type="text" name="img" className='invisible' defaultValue={`<img src="${selectedNft}"/>`} />
                                    </div> 
                                    <div className='invisible'>
                                        <label>NFT Dimensions</label>
                                        <input type="text" name="dimensions" className='invisible' defaultValue={dimensions} />
                                    </div>
                                    <div className='invisible'>
                                        <label>Wallet Address</label>
                                        <input type="text" name="walletAddress" className='invisible' defaultValue={walletAddress} />
                                </div>
                                <button type='submit' onClick={makePayment} className='btn btn-primary ml-3'>Confirm Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Form