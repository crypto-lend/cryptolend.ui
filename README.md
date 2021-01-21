## Description

UI for interacting with Smart Contracts over ETH Lending Platform. 

## Smart contract interaction

Loan request

```    
const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);
LoanBook.createNewLoanRequest(params);
```


Loan Offer

```
const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);
LoanBook.createNewLoanOffer(params);
```

Get All loan data

```
const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);
LoanBook.getAllLoans(params);
})
```

Get collateral price

```
const LoanBook = web3.eth.contract(LoanBookABI).at(LoanBookAddress);
LoanBook.getCollateralPrice(params.collateralAddress);
```

Standard Token
```
const ERC20 = web3.eth.contract(StandardTokenABI).at(params.ERC20Token);
ERC20.approve(params.loanContractAddress, web3.toWei(params.tokenAmount));
```

### Available Scripts

Install dependencies:

`npm install`

Run DApp in browser:

`npm start`

## Author

 [Dev Yadav](https://github.com/devilla)

