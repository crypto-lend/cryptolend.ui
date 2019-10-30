import Web3 from 'web3';
import 'whatwg-fetch';

let web3, provider;

function setupWeb3(){
    return new Promise(function(resolve, reject){

        if(typeof window.web3 !== 'undefined'){
            web3 = new Web3(window.web3.currentProvider);
            provider = web3.currentProvider;
            console.log(web3.version);
            resolve({web3, provider});
            // web3.version.getNetwork(function(err, networkId){
            //     console.log('Metamask Active');
            //     resolve({web3, provider, networkId});
            // })
        } else {
            let url = "http://localhost:8545";

            fetch(url)
                .then(res => {
                    console.log('local node active');
                }).catch(error => {
                    if(error.readyState === 4 && (error.status === 400 || error.status === 200)){
                        console.log('success');
                    } else {
                        console.log('The endpoint is not active. Falling back to Infura readOnly mode')
                        url = 'https://ropsten.infura.io/BW6Y98TxAjFjImkmjVnG'
                    }
                })
                .then(res => {
                    provider = new Web3.providers.HttpProvider(url)
                    web3 = new Web3(provider);
                    console.log(web3)
                    web3.version.getNetwork(function(err, networkId){
                        // ready = true
                        resolve({web3, provider, networkId})
                    })
                })

        }
    })
}

export function getWeb3(){
  window.ethereum.enable()
    if (typeof window.web3 !== 'undefined'){
      return setupWeb3()
    } else {
      return new Promise(function(resolve,reject){
        web3.version.getNetwork(function(err, networkId){
          resolve({web3, provider, networkId})
        })
      })
    }
  }

  export async function checkAddress(hash){
    let { web3 } = await getWeb3()
    return web3.isAddress(hash)
  }

  export async function getAccounts() {
    let { web3 } = await getWeb3()
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accounts) => {
        if(err) reject(err)
        resolve(accounts)
      })
    })
  }

  export default getWeb3

  export { setupWeb3 }
