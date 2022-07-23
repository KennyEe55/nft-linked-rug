import './App.css';
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import NFTContainer from './NFTContainer';


function App() {
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [nfts, setNfts] = useState([]);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
    }
    if(needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider; 
  }

  const connectWallet = async() => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err)
    }
  }

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

  const renderButton = () => {
    if(!walletConnected) {
      return (
        <button onClick={connectWallet} className="button">
          Connect Your Wallet
        </button>
      )
    } 
    return (
      <div>Wallet Connected!</div>
    )
  }
  

  return (
    <div className="App">
      <body>
      <div className='account'>
        Account: {walletAddress}
        </div>
      {renderButton()}
      <NFTContainer nfts={nfts} />
      </body>
    </div>
    
  );
}

export default App;
