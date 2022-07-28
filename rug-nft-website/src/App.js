import './App.css';
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import NFTContainer from './NFTContainer';
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
        <Header setWalletAddress={setWalletAddress}/>
        <div className='account'>
          <p>Account: {walletAddress}</p>
        </div>
        <div className='selected-nft'>
          <img src={bigNft} className='big-nft'/>
        </div>
        <NFTContainer nfts={nfts} setBigNft={setBigNft}/>
      </div>
  );
}

export default App;
