var TamaNFT = artifacts.require("./TamaNFT.sol");

module.exports = async function(deployer) {
  await deployer.deploy(TamaNFT, "1631014346");
};
