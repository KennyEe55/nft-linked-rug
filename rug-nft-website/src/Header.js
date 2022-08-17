import { Container, FormControl, Navbar, Image} from "react-bootstrap";
import rug from "./rug.png"
import React, { useEffect, useRef, useContext } from "react";
import Web3Modal from "web3modal";
import { Contract, utils, providers } from "ethers";
import NFTContext from "./nftContext";
import './Header.css'
import { RUG_CONTRACT_ADDRESS, abi } from './constant';

const Header = () => {
    const web3ModalRef = useRef();
    const { setWalletAddress, setWalletConnected, walletConnected, setLoading } = useContext(NFTContext);

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

  return (
    <Navbar className="navbar">
        <Container>
            <Navbar.Brand>
                <Image src={rug} alt="ruggies" 
                style=
                {{width: "50px",
                  height: "50px",
                  alignContent: "left"}} ></Image>
            </Navbar.Brand>
            <Navbar.Text className='search'>
            <FormControl 
            style={{width: 500}}
            placeholder="Search your NFT"
            className='m-auto'
            />
            </Navbar.Text>
            <button
            className="connect-wallet"
            style={{
              alignItems: "end",
              marginLeft: "20px"}}
            onClick={connectWallet}>{walletConnected ? 'Wallet Connected' : 'Connect Your Wallet'}</button>
        </Container>
        </Navbar>
  )
}

export default Header