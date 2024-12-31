import React, { useState, useEffect } from 'react'
import onpay from '../assets/onpaylogo1.png'
import { ethers } from 'ethers';
import tokenAbi from '../contracts/erc20Abi.mjs';



function Hero() {
   
    const [copyButtonState, setCopyButtonState] = useState('copy');
    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState(null);
    const [balance, setBalance] = useState('');
    const [receipientAddress, setReceipientAddress] = useState('');
    const [usdcBalance, setUsdcBalance] = useState(null);

    // const rpcEndPoint = 'https://sepolia.infura.io/v3/beec3ffec28f485fb9bf679eb19e5b6d';
    const sepoliaUsdcAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
 
    useEffect(() => {
        
            if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        
            }else {
                alert('Please install MetaMask');
                console.log('No wallet found');
            }
        
    }, []);

    const connectWallet = async () => {
        try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        updateUsdBalance(accounts[0]);
    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
    };

    const updateBalance = async (account) => {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account); //get Eth Balance
        setBalance(ethers.utils.formatEther(balance));

        
    }
    const updateUsdBalance = async (account) => {
        
            const usdcContract = new ethers.Contract(sepoliaUsdcAddress, tokenAbi, provider);
            const usdcBalanceRaw = await usdcContract.balanceOf(account);
            const usdcBalanceFormatted = ethers.utils.formatUnits(usdcBalanceRaw, 6);
            setUsdcBalance(usdcBalanceFormatted);
            console.log(usdcBalanceFormatted);
        

    };


    const copyToClipboard = () => {
        setCopyButtonState('copying');
        navigator.clipboard.writeText(account);
        
        setTimeout(() => {
            setCopyButtonState('copy');
        }, 2000);
    };

    // const sendTokens = async (receipient, amount) => {
    //     const tokenAddress = "	0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; //USDC contract address on sepolia testnet.
    //     const tokenAbi = [{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}];
    //     const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());

    //     const senderAddress = await provider.getSigner();
    //     const receipientAddress = 
    //     const senderBalance = await senderAddress.getBalance();
    //     try {
    //         const tx = await tokenContract.transfer(receipient, ethers.utils.parseUnits(amount, 6)); // 6 decimal places since these are stable coins
    //         await tx.wait();
    //         alert("Tokens sent successfully");
    //     }catch (error) {
    //         console.error("Error sending tokens:", error);
    //         alert("Transaction failed!");
    //     }
    // }


  return (

<section className="">
  <div className="h-screen bg-[#111111] ">
    <main
      className="flex items-center justify-center px-8 pt-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6  "
     >
     <div className=" bg-[#eaeaea] px-2 rounded-t-md rounded-bl-md mb-4">

      <div className=' justify-center items-center'>
        <div className='flex flex-row justify-between '>
        
        <img src={onpay} alt='the logo' className='justify-items-center object-center pt-2 mt-2 ml-4'
        width={100}
        height={100}
        />

{account ?  (
    <div className=' bg-white px-2  shadow-md rounded-md  mt-2'>
        <div className='flex flex-row justify-between'>
            <p className=" leading-relaxed text-gray-500 text-center text-sm mr-2">
            {account.slice(0, 3) + '...'
            + account.slice(39, 42)
            }
            {/* {useTextCount(account, 5)} */} 
            

            </p>
            <button 
                onClick={copyToClipboard}
                // type='button' 
                value='copy' 
                className='trailing-relaxed  text-center bg-gray-100 rounded-sm px-2 my-1 shadow-md  text-sm'
                >
                {copyButtonState}
            </button>
    </div> 
    <span className="relative flex justify-center ">
         <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
          >

         </div>
         </span>

      <div className='flex flex-row justify-between'>
            <p className=" leading-relaxed text-gray-500 text-center text-sm pr-1">
            {balance.slice(0, 5) + ' '} ETH
            </p>
            <div
            className='trailing-relaxed  text-center border border-gray-100 rounded-sm px-2 my-1   text-sm'
            >
                
            {usdcBalance.slice(0, 3) + ' '} USDC
            </div>
     </div>
    </div>
) : (
    
        <button onClick={connectWallet }  
        className='rounded-md bg-transparent border border-black hover:bg-gradient-to-r from-black via-gray-600 to-slate-400 px-4 py-2 text-sm  mt-2 mr-4  hover:text-white hover:border-none text-md focus:outline-none focus:ring active:text-opacity-75'>
                    Connect
                </button>
    
)}

        </div>

        <p className="mb-2 leading-relaxed text-gray-500 text-center text-sm">
          Seamless cross border payments.
        </p>

        <span className="relative flex justify-center ">
         <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
          >

         </div>
         </span>
       </div>  

      {/* Send and Receive */}
        <div>
        <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>

            <select id="Tab" className="w-full rounded-md border-gray-200">
            <option>Receive</option>
            <option select>Send</option>
            </select>
        </div>

        <div className="hidden sm:block">
            <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6">
            <button
                
                className="shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-black font-bold  "
                >              
                     Send                
                </button>

                <button
                onClick={()=>{}}
                className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                Receive
                </button>

             
                
                
            </nav>
            </div>
         </div>
       </div>
        {/* USDC/ USDT */}
         <div className='border-gray-200 py-2'>
            <div className='flex justify-center'>
                <div className='mt-4 mb-2'>
                    <label className="block text-xs font-medium text-gray-700"> You send. </label>

                    <input
                        type="number"
                        id="amount"
                        placeholder="1"
                        className="  focus:outline-none p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-md"
                    /> 
                </div>
                <div className='mt-8 mb-2 ml-3 ' >
                {/* <label htmlFor="network" className=" text-sm font-medium text-gray-900"> Network </label> */}
                    <select

                        name="network" defaultValue="USDCETH"
                        id="select"
                        className=" py-2 mt-2 w-full rounded-lg border-gray-300 focus:outline-none hover:bg-gray-50 sm:text-sm "
                        style={{
                            // color:'white',
                            // background:'#101010',
                            focus: '#111111'

                            
                        }}
                    >
                        <option value="STRK">USDC starknet</option>
                        <option value="BASE">USDC Base</option>
                        <option value="LISK">USDC Lisk</option>
                        <option value="cUSDC">USDC Celo</option>
                        <option value="USDCETH">USDC Ethereum</option>
                        <option value="USDTCELO">USDT Celo</option>
                        <option value="USDTETH">USDT Ethereum</option>
                        <option value="USDTBASE">USDT Base</option>
                    </select>
                </div>
            </div>
        </div>
        {/* Wallet address */}
           
            <input
                value={receipientAddress} onChange={(e) => setReceipientAddress(e.target.value)}
                type="text"
                id="address"
                className=" mb-4 px-2 py-1.5  w-full border border-white focus:border-gray focus:outline-none focus:ring-0 bg-white rounded-md   focus:ring-black focus-within:border-[#101010]  focus-within:ring-[#f4f4f4]"
                placeholder="Wallet Address"
            />
             

        {/* confirmation button */}
        <button
         onClick={()=>{}}
         className={`w-full flex items-center justify-center p-3 md:p-4 bg-[#111111] rounded-full mb-4 text-white font-bold `}
          >
            Send
        </button>

       
     </div>
    </main>
  </div>
</section>
  );  
}

export default Hero;

