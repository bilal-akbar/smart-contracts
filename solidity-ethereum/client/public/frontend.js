
$(document).ready(function() {
    console.log('ready');
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        ethereum.enable();

        window.acccountAddress = window.web3.eth.accounts[0];

        $('#accountOwner').val(acccountAddress);
        $('.donorAddress').val(acccountAddress);

                

      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      window.web3 = new Web3(web3.currentProvider);
    } else {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });