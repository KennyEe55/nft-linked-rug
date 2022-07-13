import './App.css';
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import NFTContainer from './NFTContainer';
import axios from 'axios';


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
      window.alert("Change the network to Rinkeby")
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

/*const getNFTData = async () => {
    if(!walletAddress) return;
    const response = await fetch (`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20&include_orders=false`);
    const data = await response.json(); 
    console.log(data)
    setNfts(data.assets)
  }*/

  const getNFTData = async () => {
  const apiKey = "DVOzepJlDMdUVLeYi1bMRNV8kVnw57rE";
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
  // replace with the wallet address you want to query for NFTs
  const ownerAddr = walletAddress;
  var config = {
    method: 'get',
    url: `${baseURL}?owner=${ownerAddr}`
  };
  axios(config)
  .then(response => setNfts(response.data.ownedNfts))
  .catch(error => console.log(error))
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
