import { padLeft } from 'web3-utils';
import { fetchMinedTransactionReceipt } from './Web3Service';
import { LoanBookABI, LoanBookAddress } from '../components/Web3/abi';

export const GetLoans = () => {
    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);

        LoanBook.getAllLoans((err, loans) => {
            if(!err){
                console.log(loans);
                resolve(loans);
            } else {
                reject(err);
            }
        });
    })
}

export const CreateNewLoanRequest = (params) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);

        LoanBook.createNewLoanRequest(web3.toWei(params.principal), params.duration,
            [[web3.toHex(params.collateralAddress), web3.toHex(0), padLeft(web3.toHex(params.interest),64)]],{
            from: web3.eth.accounts[0]
            },async(err, transactionHash) => {
                if(!err){
                    console.log(transactionHash);
                    const receipt = await fetchMinedTransactionReceipt(transactionHash);
                    resolve(padLeft(web3.toHex(web3.toBigNumber(receipt.logs[0].topics[2])), 32));
                } else {
                    reject(err);
                }
          });
    });
}



export const CreateNewLoanOffer = (params) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);

        let collateralsMetadata = new Array();

        for(var i in params.collaterals){
            collateralsMetadata[i] =
                [ web3.toHex(params.collaterals[i].collateral),
                    padLeft(web3.toHex(params.collaterals[i].ltv),64),
                    padLeft(web3.toHex(params.collaterals[i].mpr),64)];
        }

        LoanBook.createNewLoanOffer(web3.toWei(params.principal), params.duration, collateralsMetadata, {
            from: web3.eth.accounts[0]
          }, async(err, transactionHash) => {
            if(!err){
                console.log(transactionHash);
                const receipt = await fetchMinedTransactionReceipt(transactionHash);
                // console.log(receipt.logs[0].topics[2])
                resolve(padLeft(web3.toHex(web3.toBigNumber(receipt.logs[0].topics[2])), 32));
            } else {
                reject(err);
            }
          });
    });
}

export const FetchCollateralPrice = (params) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);

        LoanBook.getCollateralPrice(params.collateralAddress, (err, price) => {
            if(!err){
                resolve(web3.fromWei(price.toNumber()));
            } else {
                reject(err);
            }
        });
    })

}
