# Eterlast Test Project

It will mint 4 NFTs when you click "mint" button.
It assumes that all NFT metadata has been deployed on IPFS such as pinata, and it calls the smart contract function with the count of NFTs to mint. The smart contract will increase the IDs and mint it

## Functions
1. Connect your wallet
2. Display your address and net you connected
3. Mint 4 NFTs
4. Get NFT info by fake API call

## How to run
1. npm install
2. npm start
3. access http://localhost:3000

## Note
1. At the moment, it mints 4 NFTs. It assumes all URIs has been deployed on IPFS already.
2. It calls fake APIs to get NFT info minted
https://jsonplaceholder.typicode.com/users
