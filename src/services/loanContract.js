import { fetchMinedTransactionReceipt } from './Web3Service';
import { LoanContractABI } from '../components/Web3/abi';

export const GetLoanDetails = (loanContractAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.getLoanData((err, loan) => {
            if(!err){
                resolve(loan);
            } else {
                reject(err);
            }
        });
    })
}

export const FinalizeCollateralTransfer = (loanContractAddress, collateralAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.transferCollateralToLoan(collateralAddress, {
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
    })
}


export const AcceptLoanOffer = (loanContractAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.acceptLoanOffer({
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
    })
}


export const TransferFundsToLoanContract = (loanContractAddress, loanAmount) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.transferFundsToLoanContract({
            from: web3.eth.accounts[0],
            value: web3.toWei(loanAmount)
            }, async (err, transactionHash) => {
                if(!err){
                    console.log(transactionHash);
                    const receipt = await fetchMinedTransactionReceipt(transactionHash);
                    resolve(receipt);
                } else {
                    reject(err);
                }
            });
    })
}

export const ApproveAndFundLoanRequest = (loanContractAddress, loanAmount) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.approveLoanRequest({
            from: web3.eth.accounts[0],
            value: web3.toWei(loanAmount)
            }, async (err, transactionHash) => {
                if(!err){
                    console.log(transactionHash);
                    const receipt = await fetchMinedTransactionReceipt(transactionHash);
                    resolve(receipt);
                } else {
                    reject(err);
                }
            });
    })
}

  export const GetRepaymentData = (loanContractAddress, repaymentNumber) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.getRepaymentAmount((err, repaymentData) => {
            if(!err){
                LoanContract.checkRepaymentStatus(repaymentNumber, (err, repayee) => {
                    if(!err){
                        resolve({
                            loanContractAddress: loanContractAddress,
                            repaymentNumber: repaymentNumber,
                            repayee: repayee,
                            totalRepaymentAmount: web3.fromWei(repaymentData[0].toNumber()),
                            monthlyInterest: web3.fromWei(repaymentData[1].toNumber())
                        });
                    } else {
                        reject(err);
                    }
                });
            } else {
                reject(err);
            }
        });

    })
}


export const RepayLoan = (loanContractAddress, repaymentAmount) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.repayLoan({
            from: web3.eth.accounts[0],
            value: web3.toWei(repaymentAmount)
            }, async (err, transactionHash) => {
                if(!err){
                    console.log(transactionHash);
                    const receipt = await fetchMinedTransactionReceipt(transactionHash);
                    resolve(receipt);
                } else {
                    reject(err);
                }
            });
    })
}

export const LiquidateLoanCollateral = (loanContractAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.liquidateCollateral({
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
    })
}


export const ClaimCollateralByBorrower = (loanContractAddress) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.returnCollateralToBorrower({
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
    })
}


export const ClaimCollateralByLender = (loanContractAddress, repaymentNumber) => {

    return new Promise((resolve, reject) => {

        const { web3 } = window;

        const LoanContract = web3.eth.contract(LoanContractABI).at(loanContractAddress);

        LoanContract.claimCollateralOnDefault(repaymentNumber, {
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
    })
}
