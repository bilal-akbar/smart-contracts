const Web3 = require('web3');

const fs = require('fs');

const CROWDFUNDING_ADDRESS = '0x0fb0034671A74140c6f1E502EBAdD45397e5dE3C';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));


const CrowdfundingAbi = JSON.parse(fs.readFileSync('../build/contracts/Crowdfunding.json')).abi;
const ProjectAbi = JSON.parse(fs.readFileSync('../build/contracts/Project.json')).abi;
const CrowdfundingInstance = new web3.eth.Contract(CrowdfundingAbi, CROWDFUNDING_ADDRESS);

const STATES = ["Fundraising", "Expired", "Successful"];

const getAllProjects = async () => {
  try {
    const result = [];
    const projects = await CrowdfundingInstance.methods.returnAllProjects().call();

    for (let i = 0; i < projects.length; i++) {
      const projectAddress = projects[i];
      const projectInst = new web3.eth.Contract(ProjectAbi, projectAddress);
      const projectData = await projectInst.methods.getDetails().call();
      result.push({
        id: projectAddress,
        starter: projectData.projectStarter,
        title: projectData.projectTitle,
        desc: projectData.projectDesc,
        deadline: new Date(projectData.deadline * 1000).toLocaleString(),
        currentState: STATES[projectData.currentState],
        currentAmount: projectData.currentAmount,
        goalAmount: projectData.goalAmount
      });
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

const createNewProject = async (params) => {
  try{
    console.log(params);
    let t = await CrowdfundingInstance.methods.startProject(params.title, params.desc, params.days, web3.utils.toWei(params.goal, 'ether')).send({
      from: params.owner,
      gas: 3000000
    });
  }
  catch(e){
    console.log(e);
  }

  return true;
}

const donate = async (params) => {
  try{
    console.log(params);
    const projectInst = new web3.eth.Contract(ProjectAbi, params.project);
    let t = await projectInst.methods.contribute().send({
      from: params.donor,
      value: web3.utils.toWei(params.amount, 'ether'),
      gas: 3000000
    });
  }
  catch(e){
    console.log(e);
  }

  return true;
}

module.exports = {
  getAllProjects,
  createNewProject,
  donate
};