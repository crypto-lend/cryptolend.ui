import {padLeft} from 'web3-utils';
import { LoanBookABI, LoanBookAddress, StandardTokenABI, LoanContractABI } from '../components/Web3/abi';

export const WatchLoanBookEvents = (event) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);

        
        LoanBook[event]({ 
            from: web3.eth.accounts[0]
            }).watch((err, receipt) => {
                if(!err){
                    console.log(receipt);
                    web3.eth.getTransactionReceipt(receipt.transactionHash, (err, result) =>{
                        if(!err){                            
                            resolve(padLeft(web3.toHex(web3.toBigNumber(result.logs[0].topics[2])), 32));
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject(err);
                }

                LoanBook[event]({ 
                    from: web3.eth.accounts[0]
                }).stopWatching();
          });
    });
}

export const WatchERC20Events = (event, ERC20Address) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const ERC20Instance = web3.eth.contract(StandardTokenABI).at(ERC20Address);

        
        ERC20Instance[event]({ 
            from: web3.eth.accounts[0]
            }).watch((err, receipt) => {
                if(!err){
                    console.log(receipt);
                    resolve(receipt);
                } else {
                    reject(err);
                }

                ERC20Instance[event]({ 
                    from: web3.eth.accounts[0]
                    }).stopWatching();
          });
    });
}

export const WatchLoanContractEvents = (event, loanContractAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanInstance = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        
        LoanInstance[event]({ 
            from: web3.eth.accounts[0]
            }).watch((err, receipt) => {
                if(!err){
                    console.log(receipt.args);
                    resolve(receipt.args);
                } else {
                    reject(err);
                }

                LoanInstance[event]({ 
                    from: web3.eth.accounts[0]
                    }).stopWatching();
          });
    });
}
