import { createContext, useState, useEffect,   } from "react";


const NFTContext = createContext();

export const NFTProvider = ({ children, walletAddress  }) => {
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState("");

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
        <NFTContext.Provider value={{nfts, selectedNft, setSelectedNft }}>
            {children}
        </NFTContext.Provider>
    )
}

export default NFTContext;