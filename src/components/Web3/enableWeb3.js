export function enableWeb3() {
  try{
    window.ethereum.enable();
  }catch(err){
    console.log("Web3 Error : ", err);
  }
}
