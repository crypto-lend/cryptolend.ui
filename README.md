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

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Author

 [Dev](https://github.com/devilla)

