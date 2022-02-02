const enableWeb3 = ()=> {
    window.ethereum.enable(accoutns => {
        //alert(accoutns[0])
    })
    return {address: window.ethereum.selectedAddress, chainId: window.ethereum.chainId};
}
export default enableWeb3;
