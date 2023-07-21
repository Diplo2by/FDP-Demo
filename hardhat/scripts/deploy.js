const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Property = await hre.ethers.getContractFactory("Property");
  const prop = await Property.deploy()
  const propAdd = await prop.getAddress()
  console.log("Property contract Deployed to: ", propAdd)

  fs.writeFileSync('../config.js', `
  export const propertyAddress = "${propAdd}";
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });