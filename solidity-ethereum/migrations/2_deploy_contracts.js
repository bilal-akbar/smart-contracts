const CrowdFunding = artifacts.require("CrowdFunding");
const Project = artifacts.require("Project");

module.exports = function(deployer) {
  deployer.deploy(Project);
  deployer.link(Project, CrowdFunding);
  deployer.deploy(CrowdFunding);
};