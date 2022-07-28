import './App.css';
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import NFTContainer from './NFTContainer';
import { Route, Link } from 'react-router-dom';
import Form from './form';
import Header from './Header';


function App() {
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [bigNft, setBigNft] = useState([]);


const getNFTData = async () => {
    if(!walletAddress) return;
    const response = await fetch (`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`);
    const data = await response.json(); 
    console.log(data)
    setNfts(data.items)
}

  useEffect(() => {
    getNFTData();
  }, [walletAddress])
  


  useEffect(() => {
     if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false, 
      });
    }
     }, [walletConnected]);
  
  return (
      <div className="App">
        <Header walletAddress={walletAddress} setWalletAddress={setWalletAddress}/>
        <div className='account'>
          <p>Account: {walletAddress}</p>
        </div>
        <div className='big-nft'>
          <img src={bigNft} />
        </div>
        <NFTContainer nfts={nfts} setBigNft={setBigNft} bigNft={bigNft} />
      </div>
  );
}

export default App;
