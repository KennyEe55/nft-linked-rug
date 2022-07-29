import './App.css';
import React, {  useState, useRef, useContext } from "react";
import NFTContainer from './NFTContainer';
import Header from './Header';
import { NFTProvider } from "./nftContext";
import SelectedRug from './SelectedRug';


function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <NFTProvider walletAddress={walletAddress}>
      <div className="App">
        <Header setWalletAddress={setWalletAddress}/>
        <div className='account'>
          <p>Account: {walletAddress}</p>
        </div>
        <SelectedRug />
        <NFTContainer />
      </div>
      </NFTProvider>
  );
}

export default App;
