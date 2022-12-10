async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const StreaX = await ethers.getContractFactory("StreaXToken");
  const StreaXDep= await StreaX.deploy("StreaX","SRX");

  console.log("Token address:", StreaXDep.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });