require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY = "";
const GOERLI_PRIVATE_KEY = "";
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    }
}
};
