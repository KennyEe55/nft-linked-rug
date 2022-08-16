import './App.css';
import React, {  useContext } from "react";
import NFTContainer from './NFTContainer';
import Header from './Header';
import NFTContext from "./nftContext";
import SelectedRug from './SelectedRug';


function App() {
  const { walletAddress} = useContext(NFTContext)

  return (
      <div className="App">
        <Header />
        <div className='account'>
          <p>Account: {walletAddress}</p>
        </div>
        <SelectedRug />
        <NFTContainer />
      </div>
  );
}

export default App;
