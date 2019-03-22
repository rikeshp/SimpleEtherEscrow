let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545")); 
 
let compiledContract = solc.compile (fs.readFileSync ("Escrow.sol", "utf-8"), 1);


let abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "itemRecieved",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "itemSent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "paySeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "refundBuyer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_buyer",
				"type": "address"
			},
			{
				"name": "_seller",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]


let EscrowContractFactory = web3.eth.contract (abi); 
// Deploy Escrow on Ganache CLI with a deployment script and place the contract address below: 

let EscrowContractInstance = EscrowContractFactory.at ("0x8a8cefa7e3263258ce7572c09041472a2aa0ba78"); 
let accounts = web3.eth.accounts; 
let buyer = accounts[0];
let seller = accounts[1];
let escrowAgent = sender;

function buyerDeposit () { 
  var depositAmount = $("#amount").val (); 
  EscrowContractInstance.deposit (
    {
      from : buyer,
      gas : 200000
	  value: web3.utils.toEther(depositAmount, 'ether')
    }
  ); 
}

function itemSentConfirm () { 
  EscrowContractInstance.itemSent (
    {
      from : seller,
      gas : 200000
	}
  ); 
}

function itemRecievedConfirm () { 
  EscrowContractInstance.itemRecieved (
    {
      from : buyer,
      gas : 200000
	}
  ); 
}

function sellerPaid () { 
  EscrowContractInstance.paySeller (
    {
      from : buyer,
      gas : 200000
	}
  ); 
}

function buyerRefunded () { 
  EscrowContractInstance.refundBuyer (
    {
      from : seller,
      gas : 200000
	}
  ); 
}
