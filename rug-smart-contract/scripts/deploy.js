const hre = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const RugPayment = await hre.ethers.getContractFactory("RugPayment");
  const rugpayment = await RugPayment.deploy();

  await rugpayment.deployed();

  console.log("RugPayment deployed to:", rugpayment.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
