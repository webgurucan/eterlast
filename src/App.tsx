import { FC, useCallback, useState, useEffect } from "react";
import "./App.css";
import enableWeb3 from "./web3enable";
import { ethers } from "ethers";
import abi from "./web3/config/abi/rapsAbi.json";
import axios from "axios";
import CForm from "./CForm";
import { IFormInput } from "./IFormInput";

const App: FC = () => {
  const contractAddress: string = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"; // Smart contract address, Fake One
  const ropstenUrl: string = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const FAKE_URI_URL: string = `https://jsonplaceholder.typicode.com/users`;

  const [slectedAddress, setSelectedAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("0x00");
  const [nftRequests, setNftRequests] = useState<IFormInput[]>([]);
  const [nftRequestCount, setNftRequestCount] = useState<number>(0);
  const provider = new ethers.providers.JsonRpcProvider(ropstenUrl);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const connectWallet = () => {
    const addressInfo = enableWeb3();
    setSelectedAddress(addressInfo.address);
    setChainId(addressInfo.chainId);
  };

  const getNFTData = async () => {
    const { data } = await axios.get<any[]>(FAKE_URI_URL);
    return data;
  };

  const showNFTData = async () => {
    getNFTData()
      .then((response) => {
        let result: object = {
          creator_wallet_id: slectedAddress,
          creator_network: chainId === "0x3" ? "Ropesten" : "Other Network",
          assets: response,
        };
        console.log("Response from Server");
        console.log(result);
      })
      .catch((error) => {
        //TODO: You should do something when there are errors
        console.log("Nothing to show");
      });
  };

  const callContractMethods = useCallback(async () => {
    try {
      //Method 2: Calling fake minting with detailed info
      let result: object = {
        creator_wallet_id: slectedAddress,
        creator_network: chainId === "0x3" ? "Ropesten" : "Other Network",
        assets: nftRequests,
      };
      console.log("Call function with data");
      console.log(result);

      //Method 1: Calling mintNFTs with count, assuming all data stored in pinata (IPFS)
      await contract.mintNFTs(4); //Mint 4 NFTs

      //show data
      showNFTData();
    } catch (err) {
      //At the moment, it will be called since mintNFT will be failed since wrong smart contract Address
      showNFTData();
    }
  }, [nftRequests, slectedAddress, chainId]);

  const onAddStore = (data: IFormInput) => {
    let reqList: IFormInput[] = nftRequests;
    reqList.push(data);
    setNftRequests(reqList);
    setNftRequestCount(reqList.length);
  };

  return (
    <div className="App">
      <p>Minter Address: {slectedAddress}</p>
      <p>Network: {chainId === "0x3" ? "Ropesten" : "-"}</p>
      <div className="connect-wallet-container">
        <button onClick={connectWallet} disabled={chainId !== "0x00"}>
          Connect Wallet
        </button>
      </div>

      <div>
        <strong>NFT Request Count</strong>: {nftRequestCount}
      </div>
      <CForm onComplete={onAddStore} />

      <div className="mint-btn-container">
        <button onClick={callContractMethods} disabled={chainId === "0x00"}>
          Mint
        </button>
      </div>
    </div>
  );
};

export default App;
