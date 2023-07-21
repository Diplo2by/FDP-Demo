import React from 'react'
import { useState } from 'react';
import { State, City } from 'country-state-city';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { propertyAddress } from "../../config"
import Propertyabi from "../../hardhat/artifacts/contracts/Property.sol/Property.json"
import Link from 'next/link';

const Form = () => {
    const states = State.getStatesOfCountry('IN');
    const [stateId, setStateId] = useState(0);
    const cities = City.getCitiesOfState('IN', stateId);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            listProperty(e.target.name.value, e.target.city.value, e.target.state.value, e.target.ptype.value)
        } catch (error) {
            console.log(error)
        }
    }

    async function listProperty(name, city, state, type) {
        const web3modal = new Web3Modal();
        const conn = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(conn);
        const signer = provider.getSigner();
        const add = await signer.getAddress()
        const propertContract = new ethers.Contract(propertyAddress, Propertyabi.abi, signer);
        let txn = await propertContract.listNewProperty(add, name, "xyz", type, state, city);
        console.log(txn)
    }

    return (
        <div className='flex flex-col items-center gap-y-2 justify-center'>
            <h1 className='text-xl font-bold text-center mt-3'>Enter your property Details</h1>
            <form className='flex flex-col w-[25%] justify-center mx-auto' onSubmit={handleSubmit} >
                <label htmlFor="Name"> Name</label>
                <input type="text" name="name" id="name" className=' text-black' />
                <label htmlFor="ptype">Property Type</label>
                <select name="ptype" id="ptype" className=' text-black'>
                    <option value="house">Residential</option>
                    <option value="farm">Agricultural</option>
                    <option value="business">Commercial</option>
                </select>
                <label htmlFor="address">Address</label>
                <input type="text" name="Address" id="Address" className=' text-black' />
                <label htmlFor="state">State</label>
                <select name="state" id="state" className=' text-black' onChange={(e) => {
                    console.log(e.target.value);
                    setStateId(e.target.value);
                }} >
                    {
                        states.map((state) => (
                            <option id={state.name} value={state.isoCode} key={state.isoCode}>{state.name}  </option>
                        ))
                    }
                </select>
                <label htmlFor="city">City</label>
                <select name="city" id="city" className=' text-black' onChange={(e) => {
                    console.log(e.target.value)
                }}>
                    {
                        cities.map((city) => (
                            <option value={city.name} key={city.name}>{city.name}</option>
                        ))
                    }
                </select>
                <input className='rounded-sm bg-white text-black p-2 mt-2 hover:cursor-pointer' type="submit" value="submit" >
                </input>
            </form>
            <Link href="/records">
                <button className='rounded-sm bg-white text-black p-3'>
                    Show Records
                </button>
            </Link>
        </div>
    )
}

export default Form