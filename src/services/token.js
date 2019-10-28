import { fetchMinedTransactionReceipt } from './Web3Service';
import { StandardTokenABI } from '../components/Web3/abi';

export const ExecuteTokenApproval = (params) => {
  console.log('=======>',params);

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const ERC20 = web3.eth.contract(StandardTokenABI).at(params.ERC20Token);

        ERC20.approve(params.loanContractAddress, params.tokenAmount,{
            from: web3.eth.accounts[0]
            }, async (err, transactionHash) => {
                if(!err){
                    console.log(transactionHash);
                    const receipt = await fetchMinedTransactionReceipt(transactionHash);
                    resolve(receipt);
                } else {
                    reject(err);
                }
          });
    });
}
