import { Container, FormControl, Navbar, Button, Image} from "react-bootstrap";
import rug from "./rug.png"
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";

const Header = ({ setWalletAddress }) => {
    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);

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
    <Navbar bg="dark" variant='dark'>
        <Container>
            <Navbar.Brand>
                <Image src={rug} alt="ruggies" fluid ></Image>
            </Navbar.Brand>
            <Navbar.Text className='search'>
            <FormControl 
            style={{width: 500}}
            placeholder="Search a product"
            className='m-auto'
            />
            </Navbar.Text>
            <Button 
            style={{
              alignItems: "end",
              marginLeft: "20px"}}
            onClick={connectWallet}>{walletConnected ? 'Wallet Connected' : 'Connect Your Wallet'}</Button>
        </Container>
        </Navbar>
  )
}

export default Header