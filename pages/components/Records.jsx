import React from 'react'
import { ethers } from "ethers";
import { propertyAddress } from "../../config"
import Property from "../../hardhat/artifacts/contracts/Property.sol/Property.json"

let properties;

async function loadProps() {
    const rpc = "http://localhost:8545"; // make it local variable later
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(propertyAddress, Property.abi, provider);
    const txn = await contract.getAllRecords();
    let values = txn.map((item) => {
        return item
    })
    console.log(values)
}
const Records = function () {
    return (
        <div className='flex justify-center'>
            <button onClick={loadProps} className='rounded-sm p-2 my-2 text-white bg-black'>Show records</button>
        </div>
    )
}

export default Records