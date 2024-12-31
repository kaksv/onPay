import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Wallet() {

    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState(null);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const loadProvider = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        };
        loadProvider();
    }, [])

    const connectWallet = async () => {
        if(!window.ethereum) {
            alert("Install Metamask or evm compatible wallet");
            return;
        }
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
    };

    const updateBalance = async (account) => {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    }

    const sendTokens = async (receipient, amount) => {
        const tokenAddress = "	0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; //USDC contract address on sepolia testnet.
        const tokenAbi = [{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}];
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());

        try {
            const tx = await tokenContract.transfer(receipient, ethers.utils.parseUnits(amount, 6)); // 6 decimal places since these are stable coins
            await tx.wait();
            alert("Tokens sent successfully");
        }catch (error) {
            console.error("Error sending tokens:", error);
            alert("Transaction failed!");
        }
    }
  return (
    <div>
        <h1>On pay Wallet</h1>
        {!account ? (
            <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
            <div>
                <p>Account: {account}</p>
                <p>Balance: {balance}</p>
            </div>
        )}
    </div>
  )
}

export default Wallet

