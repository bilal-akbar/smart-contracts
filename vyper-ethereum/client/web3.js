const Web3 = require('web3');

const fs = require('fs');

const CROWDFUNDING_ADDRESS = '0xe4DcBe7645C9aD2692F36f3428f7A623E6712f49';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));


const CrowdfundingAbi = JSON.parse(fs.readFileSync('../build/contracts/CrowdFunding.json')).abi;
const CrowdfundingInstance = new web3.eth.Contract(CrowdfundingAbi, CROWDFUNDING_ADDRESS);

const STATES = ["Fundraising", "Expired", "Successful"];

const getAllProjects = async () => {
  try {
    const result = [];
    const count = await CrowdfundingInstance.methods.getProjectsCount().call();
    
    for(let i=0; i < count; i++){
      const project = await CrowdfundingInstance.methods.getProjectByIndex(i).call();
      result.push({
        id: i,
        starter: '',
        title: project['0'],
        desc: project['1'],
        deadline: new Date(project['4']*1000).toLocaleString(),
        currentState: STATES[project['5']],
        currentAmount: project['2'],
        goalAmount: project['3']
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
    let t = await CrowdfundingInstance.methods.createNewProject(params.title, params.desc, web3.utils.toWei(params.goal, 'ether'), params.days).send({
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
    let t = await CrowdfundingInstance.methods.contribute(params.project).send({
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