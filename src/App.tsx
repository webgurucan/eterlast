import React, { useCallback, useState } from 'react';
import './App.css';
import enableWeb3 from './web3enable';
import { ethers } from 'ethers';
import abi from './web3/config/abi/rapsAbi.json';
import axios from "axios";

function App() {
  const _contractAddress:string = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"; // Smart contract address
  const [slectedAddress, setSelectedAddress]= useState("0x00");
  const [chainId, setChainId]= useState("0x00");
  const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(_contractAddress, abi, signer);

  const FAKE_URI_URL = `https://jsonplaceholder.typicode.com/users`;


  const enable = () => {
    const address = enableWeb3();
    setSelectedAddress(address.address);
    setChainId(address.chainId)
  }

  const getNFTData = async () => {
    const { data } = await axios.get<any[]>(FAKE_URI_URL);
    return data;
  };

  const callContractMethods = useCallback(async () =>{
      try{
        let response = await contract.mintNFTs(4); //Mint 8 NFTs
        getNFTData().then((response) => {
          console.log(response);
        })
        .catch((error) => {
          //TODO: You should do something when there are errors
          console.log("Nothing to show");
        });
        
      } catch(err) {
        
        //console.log(require("./web3/nfts/nft.json"));

        getNFTData().then((response) => {
          console.log(response);
        })
        .catch((error) => {
          //TODO: You should do something when there are errors
          console.log("Nothing to show");
        });
      }
  },[])

  return (
    <div className="App">
      <p>{slectedAddress}</p>
      <p>Network: {chainId == "0x3" ? "Ropesten" : "Other Network"}</p>
      <div>
        <button onClick={enable}>Enable Web3</button>
      </div>
      <div>
        <button onClick={callContractMethods} disabled={chainId == "0x00"}>Mint</button>
      </div>
    </div>
  );
}

export default App;
