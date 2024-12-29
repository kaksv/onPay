import React from 'react'
import onpay from '../assets/onpaylogo1.png'
import Modal from '../modals/Modal';
import {useState } from 'react';


function Hero() {
    const [open, setOpen] = useState(false)
  return (

<section className="">
  <div className="h-screen bg-[#111111] ">
    <main
      className="flex items-center justify-center px-8 pt-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6  "
     >
     <div className=" bg-[#eaeaea] px-2 rounded-t-md rounded-bl-md mb-4">

      <div className=' justify-center items-center'>
        <img src={onpay} alt='the logo' className='justify-items-center object-center mt-4 mx-auto'
        width={100}
        height={100}
        />

        <p className="mb-2 leading-relaxed text-gray-500 text-center text-sm">
          Seamless cross border payments.
        </p>

        <span className="relative flex justify-center">
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

                {/* <Modal open={open} onClose={() => setOpen(false)}>
                    <div className='text-center w-56'>
                    Close
                    <div className='mx-auto my-4 w-48'>
                        <h3 className='text-lg font-black text-gray-800'>
                            Copy address
                        </h3>
                        <p className='text-sm text-gray-500'> 
                            Are you sure this is the correct Address? 
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <button className='btn btn-danger w-full'>Delete</button>
                        <button className='btn btn-danger w-full' onClick={() => setOpen(false)}>Cancel</button>
                            
                    </div>
                    </div>
                </Modal> */}
                
                
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
                    <select
                        name="HeadlineAct"
                        id="select"
                        className=" py-2 mt-1.5 w-full rounded-lg border-gray-300 focus:outline-none hover:bg-gray-50 sm:text-sm "
                    >
                        <option value="">USDC starknet</option>
                        <option value="JM">USDC Base</option>
                        <option value="SRV">USDC Lisk</option>
                        <option value="JH">USDC Celo</option>
                        <option value="BBK">USDT TRON</option>
                        <option value="AK">USDT Celo</option>
                        <option value="BG">USDT Ethereum</option>
                        <option value="EC">USDT Base</option>
                    </select>
                </div>
            </div>
        </div>
        {/* Wallet address */}
        <label
            // htmlFor="Username"
            className="mb-4 relative block p-2 bg-white rounded-md border border-gray-200 shadow-sm focus-within:border-[#747474]  focus-within:ring-[#747373]"
            >
            <input
                type="text"
                id="Username"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
            />

            <span
                className=" px-1.5 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white rounded-md p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                Wallet Address
            </span>
        </label>

        {/* confirmation button */}
        <button
         className={`w-full flex items-center justify-center p-3 md:p-4 bg-[#111111] rounded-full mb-4 text-white font-bold `}
          >
            Confirm
        </button>

       
     </div>
    </main>
  </div>
</section>
  );  
}

export default Hero;