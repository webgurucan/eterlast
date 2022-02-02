import {FC, useCallback, useState } from 'react';
import './App.css';
import enableWeb3 from './web3enable';
import { ethers } from 'ethers';
import abi from './web3/config/abi/rapsAbi.json';
import axios from "axios";

const App: FC = () => {
  const contractAddress:string = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"; // Smart contract address, Fake One
  const ropstenUrl:string = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  const FAKE_URI_URL:string = `https://jsonplaceholder.typicode.com/users`;

  
  const [slectedAddress, setSelectedAddress]= useState("0x00");
  const [chainId, setChainId]= useState("0x00");
  const provider = new ethers.providers.JsonRpcProvider(ropstenUrl);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);


  const connectWallet = () => {
    const addressInfo = enableWeb3();
    setSelectedAddress(addressInfo.address);
    setChainId(addressInfo.chainId)
  }

  const getNFTData = async () => {
    const { data } = await axios.get<any[]>(FAKE_URI_URL);
    return data;
  };

  const showNFTData = async() => {
    getNFTData().then((response) => {
      let result:object = {
        "creator_wallet_id": slectedAddress,
        "creator_network": chainId === "0x3" ? "Ropesten" : "Other Network",
        "assets": response
      }
      console.log(result);
    })
    .catch((error) => {
      //TODO: You should do something when there are errors
      console.log("Nothing to show");
    });
  }

  const callContractMethods = useCallback(async () =>{
      try{
        await contract.mintNFTs(4); //Mint 4 NFTs
        showNFTData();
        
      } catch(err) {
        //At the moment, it will be called since mintNFT will be failed since wrong smart contract Address
        showNFTData();
      }
  },[])

  return (
    <div className="App">
      <p>{slectedAddress}</p>
      <p>Network: {chainId === "0x3" ? "Ropesten" : "Other Network"}</p>
      <div>
        <button onClick={connectWallet} disabled={chainId !== "0x00"}>Connect Wallet</button>
      </div>
      <div>
        <button onClick={callContractMethods} disabled={chainId === "0x00"}>Mint</button>
      </div>
    </div>
  );
}

export default App;