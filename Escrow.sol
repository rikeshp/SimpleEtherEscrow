pragma solidity >=0.4.22;

contract Escrow {
    
    // escrow logic is based on steps layed out here: https://thelendersnetwork.com/what-is-escrow/
    
    address payable buyer;
    address payable seller;
    address payable escrowAgent;   
            
    uint amount;
    
    bool deposited;
    bool received;
    bool sent;
    
    
    constructor (address payable _seller, address payable _buyer) public {
        buyer = _buyer;
        seller = _seller;
        escrowAgent = msg.sender;
        sent = false;
        deposited = false;
        received = false; 
    }
    
    function deposit() public payable {
        require (msg.sender == buyer);
        require (msg.value > 0.000000 ether);
        
        deposited = true;
    }
   
    function itemSent() public {
        // buyer is required to deposit funds before seller sends out item
        require (msg.sender == seller && deposited); 
        
        sent = true;
    }
   
    function itemRecieved() public {
       require (msg.sender == buyer);
       received = true;
    }
   
    function paySeller() public {
        //pay seller only if buyer has confirmed to have recieved the item
        require (msg.sender == buyer || msg.sender == escrowAgent);
        require (received);
        
        escrowAgent.transfer(address(this).balance / 100); // pay fee to escrow agent
        
        seller.transfer(address(this).balance); // pay contract balance to seller
    } 
    
    function refundBuyer() public {
        // if seller is unable to send item, or refuses to send item, then refund buyer
        require(msg.sender == seller || msg.sender == escrowAgent);
        
        // only refund buyer if they have already deposited and the item has not been sent nor recieved
        require (sent == false && received == false && deposited);
        
        buyer.transfer(address(this).balance);
    }
  
}