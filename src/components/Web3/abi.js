const abi = (message) => {console.log(message);}


export const StandardTokenABI = [
    {
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "decimals",
          "type": "uint8"
        },
        {
          "name": "totalSupply",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event",
      "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event",
      "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x06fdde03"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x95d89b41"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x313ce567"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x18160ddd"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa9059cbb"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x70a08231"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x23b872dd"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x095ea7b3"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xdd62ed3e"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xd73dd623"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x66188463"
    }
  ];

export const LoanBookABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "updateCollateralPrice",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x29ac6328"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3f4ba83a"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isPauser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x46fbf68e"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getCollateralPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x51a40994"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x5c975abb"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renouncePauser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6ef8d66d"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "addPauser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x82dc1ec4"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x8456cb59"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_ltvRatio",
        "type": "uint256"
      }
    ],
    "name": "updateCollateralLTVRatio",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x8c4d5c44"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "removeCollateral",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc99d3a06"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "loans",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe1ec3c68"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "collaterals",
    "outputs": [
      {
        "name": "price",
        "type": "uint256"
      },
      {
        "name": "ltvRatio",
        "type": "uint256"
      },
      {
        "name": "isActive",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xeeb97d3b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_price",
        "type": "uint256"
      },
      {
        "name": "_ltvRatio",
        "type": "uint256"
      }
    ],
    "name": "addNewCollateral",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf73acf6a"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "lender",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "loanContractAddres",
        "type": "address"
      }
    ],
    "name": "LoanOfferCreated",
    "type": "event",
    "signature": "0xf2dd22623d1f0c13d7184cace6860bd1fe866b1190878d24897d4b82ee81b538"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "loanContractAddress",
        "type": "address"
      }
    ],
    "name": "LoanRequestCreated",
    "type": "event",
    "signature": "0x003723ec1bd18c630a9b78df5a027251bdf27c7688c85a5784cc2b507d9c21eb"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event",
    "signature": "0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event",
    "signature": "0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "account",
        "type": "address"
      }
    ],
    "name": "PauserAdded",
    "type": "event",
    "signature": "0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "account",
        "type": "address"
      }
    ],
    "name": "PauserRemoved",
    "type": "event",
    "signature": "0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_loanAmount",
        "type": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint128"
      },
      {
        "name": "_collateralsMetadata",
        "type": "bytes32[3][]"
      }
    ],
    "name": "createNewLoanOffer",
    "outputs": [
      {
        "name": "_loanContractAddress",
        "type": "address"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x15c94168"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_loanAmount",
        "type": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint128"
      },
      {
        "name": "_collateralsMetadata",
        "type": "bytes32[3][]"
      }
    ],
    "name": "createNewLoanRequest",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x9f667672"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllLoans",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa5bfd16a"
  }
];


export const LoanContractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "LoanBookAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_loanAmount",
        "type": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint128"
      },
      {
        "name": "_borrower",
        "type": "address"
      },
      {
        "name": "_lender",
        "type": "address"
      },
      {
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "LoanStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
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
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LoanContractUpdated",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
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
    "constant": true,
    "inputs": [],
    "name": "getLoanData",
    "outputs": [
      {
        "name": "_loanAmount",
        "type": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint128"
      },
      {
        "name": "_interestRate",
        "type": "uint256"
      },
      {
        "name": "_createdOn",
        "type": "uint256"
      },
      {
        "name": "_startedOn",
        "type": "uint256"
      },
      {
        "name": "_loanStatus",
        "type": "uint8"
      },
      {
        "name": "_collateralAddress",
        "type": "address"
      },
      {
        "name": "_collateralAmount",
        "type": "uint256"
      },
      {
        "name": "_collateralPrice",
        "type": "uint256"
      },
      {
        "name": "_collateralStatus",
        "type": "uint8"
      },
      {
        "name": "_borrower",
        "type": "address"
      },
      {
        "name": "_lender",
        "type": "address"
      },
      {
        "name": "_liquidatedAmount",
        "type": "uint256"
      },
      {
        "name": "_collateralsMetadata",
        "type": "bytes32[3][]"
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
    "inputs": [
      {
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
        "name": "_repaymentNumber",
        "type": "uint256"
      }
    ],
    "name": "checkRepaymentStatus",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentRepaymentNumber",
    "outputs": [
      {
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
    "name": "getRepaymentAmount",
    "outputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "monthlyInterest",
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
    "name": "repayLoan",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
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
        "name": "_repaymentNumber",
        "type": "uint256"
      }
    ],
    "name": "claimCollateralOnDefault",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const LoanBookAddress = "0x062FBE29BB8B6e0896c4b623D7674BE9119D6c8e";

export default abi;
