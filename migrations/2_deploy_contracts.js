const Marketplace = artifacts.require("Market");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};
