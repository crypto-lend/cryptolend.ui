const abi = (message) => {console.log(message);}


export const StandardTokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

export const LoanBookABI = [{
  "contractName": "LoanContract",
  "abi": [],
  "metadata": "{\"compiler\":{\"version\":\"0.5.0+commit.1d4f565a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"project:/contracts/libs/LoanMethods.sol\":\"LoanContract\"},\"evmVersion\":\"byzantium\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/libs/LoanMethods.sol\":{\"keccak256\":\"0xc7b5165369ed05f8b366c4547555600b02942258fce8de3209de18cd8c349664\",\"urls\":[\"bzzr://d4a27d4949875982546cec319df6802b3068ecfd19ae7bf0fc18669ce35ca524\"]}},\"version\":1}",
  "bytecode": "0x6080604052348015600f57600080fd5b50603580601d6000396000f3fe6080604052600080fdfea165627a7a72305820b0c2b052952449ce60e26f2ff7e74ed4e9b9bd2e3d3c7b2d0f9adbd2ea6decba0029",
  "deployedBytecode": "0x6080604052600080fdfea165627a7a72305820b0c2b052952449ce60e26f2ff7e74ed4e9b9bd2e3d3c7b2d0f9adbd2ea6decba0029",
  "sourceMap": "1160:90:17:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1160:90:17;;;;;;;",
  "deployedSourceMap": "1160:90:17:-;;;;;",
  "source": "/**\r\n* MIT License\r\n*\r\n* Copyright (c) 2019 Finocial\r\n*\r\n* Permission is hereby granted, free of charge, to any person obtaining a copy\r\n* of this software and associated documentation files (the \"Software\"), to deal\r\n* in the Software without restriction, including without limitation the rights\r\n* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\n* copies of the Software, and to permit persons to whom the Software is\r\n* furnished to do so, subject to the following conditions:\r\n*\r\n* The above copyright notice and this permission notice shall be included in all\r\n* copies or substantial portions of the Software.\r\n*\r\n* THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\n* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\n* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\n* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\n* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\n* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\n* SOFTWARE.\r\n*/\r\npragma solidity ^0.5.0;\r\n\r\ncontract LoanContract {\r\n  // This library is used to calculation , some data retreival\r\n}\r\n",
  "sourcePath": "C:\\Users\\ranap\\Workspace\\cryptolend.eth\\contracts\\libs\\LoanMethods.sol",
  "ast": {
    "absolutePath": "project:/contracts/libs/LoanMethods.sol",
    "exportedSymbols": {
      "LoanContract": [
        3473
      ]
    },
    "id": 3474,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3472,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "1133:23:17"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 3473,
        "linearizedBaseContracts": [
          3473
        ],
        "name": "LoanContract",
        "nodeType": "ContractDefinition",
        "nodes": [],
        "scope": 3474,
        "src": "1160:90:17"
      }
    ],
    "src": "1133:119:17"
  },
  "legacyAST": {
    "attributes": {
      "absolutePath": "project:/contracts/libs/LoanMethods.sol",
      "exportedSymbols": {
        "LoanContract": [
          3473
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "^",
            "0.5",
            ".0"
          ]
        },
        "id": 3472,
        "name": "PragmaDirective",
        "src": "1133:23:17"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "contract",
          "documentation": null,
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            3473
          ],
          "name": "LoanContract",
          "nodes": [
            null
          ],
          "scope": 3474
        },
        "id": 3473,
        "name": "ContractDefinition",
        "src": "1160:90:17"
      }
    ],
    "id": 3474,
    "name": "SourceUnit",
    "src": "1133:119:17"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.0+commit.1d4f565a.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.4.3",
  "updatedAt": "2021-10-04T16:21:26.362Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}];

export const LoanContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_loanAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "_duration",
				"type": "uint128"
			},
			{
				"internalType": "address",
				"name": "_borrower",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_lender",
				"type": "address"
			},
			{
				"internalType": "enum LoanContract.LoanStatus",
				"name": "_loanstatus",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CollateralClaimedByLender",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CollateralSentToLenderForDefaultedRepayment",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CollateralTransferReturnedToBorrower",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CollateralTransferToLoanFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CollateralTransferToLoanSuccessful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "FundTransferToBorrowerSuccessful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "FundTransferToLoanSuccessful",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LoanContractUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LoanRepaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "LoanStarted",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "LoanBookAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptLoanOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "approveLoanRequest",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_repaymentNumber",
				"type": "uint256"
			}
		],
		"name": "checkRepaymentStatus",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_repaymentNumber",
				"type": "uint256"
			}
		],
		"name": "claimCollateralOnDefault",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentRepaymentNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLoanData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_loanAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "_duration",
				"type": "uint128"
			},
			{
				"internalType": "uint256",
				"name": "_interestRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "createdOn",
				"type": "uint256"
			},
			{
				"internalType": "enum LoanContract.LoanStatus",
				"name": "_loanStatus",
				"type": "uint8"
			},
			{
				"internalType": "bytes32[3][]",
				"name": "_collateralsMetadata",
				"type": "bytes32[3][]"
			},
			{
				"internalType": "address",
				"name": "_collateralAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_collateralAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum LoanContract.CollateralStatus",
				"name": "_collateralStatus",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_borrower",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_lender",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "repaymentNumber",
				"type": "uint256"
			}
		],
		"name": "getRepaymentAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "monthlyInterest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "liquidateCollateral",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "repayLoan",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "returnCollateralToBorrower",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32[3][]",
				"name": "_collateralsMetadata",
				"type": "bytes32[3][]"
			}
		],
		"name": "setCollateralMetaData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_collateral",
				"type": "address"
			}
		],
		"name": "transferCollateralToLoan",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "transferFundsToLoanContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
];

export const LoanBookAddress = "0xcaB9d43922E44003AEf19CdfeD7E93879B5418e5";

export default abi;
