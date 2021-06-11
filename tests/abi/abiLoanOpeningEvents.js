export default [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "loanToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPrincipal",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newCollateral",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "interestRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "interestDuration",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collateralToLoanRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentMargin",
          "type": "uint256"
        }
      ],
      "name": "Borrow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegated",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "name": "DelegatedManagerSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "loanId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "collateralToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "loanToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "positionSize",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "borrowedAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "interestRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "settlementDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "entryPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "entryLeverage",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentLeverage",
          "type": "uint256"
        }
      ],
      "name": "Trade",
      "type": "event"
    }
  ];
