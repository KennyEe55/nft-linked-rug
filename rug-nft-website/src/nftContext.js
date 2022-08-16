import { createContext, useState, useEffect } from "react";


const NFTContext = createContext();

export const NFTProvider = ({ children  }) => {
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [dimensions, setDimensions] = useState("")
    const [price, setPrice] = useState("0");
    const [walletConnected, setWalletConnected] = useState(false);
    const [loading, setLoading] = useState(false);


    const getNFTData = async () => {
        if(!walletAddress) return;
        const response = await fetch (`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`);
        const data = await response.json(); 
        console.log(data)
        setNfts(data.items)
    };
    useEffect(() => {
        getNFTData();
      }, [walletAddress])
     
    return (
        <NFTContext.Provider value={{
        nfts, selectedNft, 
        setSelectedNft, setWalletAddress,
        walletAddress, dimensions, 
        setDimensions, 
        price, setPrice,
        walletConnected, setWalletConnected,
        loading, setLoading
         }}>
            {children}
        </NFTContext.Provider>
    )
}

export default NFTContext;