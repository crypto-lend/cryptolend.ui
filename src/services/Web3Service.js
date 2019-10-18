import isEmpty from 'lodash/isEmpty';

export const fetchNetwork = () => {
  return new Promise((resolve, reject) => {
    const { web3 } = window;

    web3 && web3.version && web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
      } else {
        resolve(netId);
      }
    });
  });
};

export const fetchAccounts = () => {
  return new Promise((resolve, reject) => {
    const { web3 } = window;
    const ethAccounts = getAccounts();

    if (isEmpty(ethAccounts)) {
      web3 && web3.eth && web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(err);
        } else {
          resolve(accounts);
        }
      });
    } else {
      resolve(ethAccounts);
    }
  });
};

export function getAccounts() {
  try {
    const { web3 } = window;
    // throws if no account selected
    return web3.eth.accounts;
  } catch (e) {
    return [];
  }
}

export const fetchMinedTransactionReceipt = (transactionHash) => {

  return new Promise((resolve, reject) => {
    
    const { web3 } = window;

    var timer = setInterval(()=> {
      web3.eth.getTransactionReceipt(transactionHash, (err, receipt)=> {
        if(!err && receipt){
          clearInterval(timer);
          resolve(receipt);
        }
      });
    }, 2000)
   
  })
}


