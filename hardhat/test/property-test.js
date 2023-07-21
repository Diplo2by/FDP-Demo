const { ethers } = require("hardhat")

describe('Property Listing', () => {
    it('Should list and retrieve Patient details', async function () {
        const Property = await ethers.getContractFactory('Property');
        const pro = await Property.deploy();

        //console.log(await pro.getAddress() )

        const [_, signer] = await ethers.getSigners()
        const senderAddress = signer.address

        await pro.listNewProperty(senderAddress, "Darshan", "xyz", "house", "KA", "blr")
        await pro.listNewProperty(senderAddress, "Steven", "123", "farm", "MH", "mum")
        await pro.listNewProperty(senderAddress, "Harish", "y13", "business", "ND", "Del")

        console.log(Number(await pro.getPropertyCount()))
        console.log(await pro.getAllRecords())

    })
})