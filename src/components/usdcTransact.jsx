import { useEffect,useState} from 'react';
import { ethers } from 'ethers';

const USDCTransfer = () => {
    const [receipientAddress, setReceipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [txStatus, setTxStatus] = useState('');
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    //USDC contract address on Ethereum sepolia
    const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    // You can replace it with the network that is needed.

    // ERC20 ABI for transfer function
    const abi = [
        "function transfer(address to, uint amount) returns (bool)"
    ];

    useEffect(() => {
        if (window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);
        } else {
          alert("Please install MetaMask!");
        }
      }, []);

 const connectWallet = async () => {
    try {
      // 
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };
    const handleSendTokens = async () => {
        if(!receipientAddress || !amount) {
            setTxStatus("Please enter receipient address and amount");
            return;
        }
        try {
            //Connect to ethereum provider (Metamask)
            
            // const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const usdcContract = new ethers.Contract(usdcAddress, abi, signer);

            //Convert amount to the correct decimal format (6 decimals for USDC)
            const amountInUnits = ethers.utils.parseUnits(amount, 6);

            //Send USDC tokens
            const tx = await usdcContract.transfer(receipientAddress, amountInUnits);
            setTxStatus('Transaction pending...');

            //Wait for the transaction to be mined
            await tx.wait();
            setTxStatus(`Transaction successful: transaction Hash: ${tx.hash}`);
        }catch (error) {
            console.error(error);
            setTxStatus(`Transaction failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Send USDC Tokens</h2>
            {account ? (
        <div>
          <p>Connected Wallet: {account}</p>
          {/* <p>USDC Balance: {balance ? balance : "Loading..."}</p> */}
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}

            <input
                type='text'
                placeholder='Receipient Address'
                value={receipientAddress}
                onChange={(e) =>setReceipientAddress(e.target.value)}
                />
            <input
                type='number'
                placeholder='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSendTokens}>Send USDC</button>
                {txStatus && <p>{txStatus}</p>}
        </div>
    );
}

export default USDCTransfer;