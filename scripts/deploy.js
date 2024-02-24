const hrdhat = require("hardhat");

async function startFunction() {
  const security = await hrdhat.ethers.getContractFactory("SecurityManagement");
  const securityAssessment = await security.deploy();
  await securityAssessment.deployed();

  console.log(`Contract deployed to ${securityAssessment.address}  `);
}
startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
