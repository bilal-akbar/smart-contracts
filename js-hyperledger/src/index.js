'use strict';

const { Contract } = require('fabric-contract-api');

class CrowdFunding extends Contract {

   STATES = { PROGRESS : 0, EXPIRED : 1, SUCCESSFULL : 2 }

  async getProjectsCount(ctx) {
    let countAsBytes = await ctx.stub.getState('project_index');
    if (!countAsBytes || countAsBytes.toString().length <= 0) {
      return 0;
    }
    return Number(countAsBytes.toString());
  }

  async createNewProject(ctx, ownerId, title, description, goal, days) {

    let count = await this.getProjectsCount(ctx);
    const project = {
      'ownerId' : ownerId,
      'title' : title,
      'description' : description,
      'raised' : 0,
      'goal' : goal,
      'deadline' : Date.now() + ( days * 86400),
      'state' : this.STATES.PROGRESS,
      'contributions' : {}
    }
    count++;
    await ctx.stub.putState(`project_${count}`, Buffer.from(JSON.stringify(project)));
    await ctx.stub.putState(`project_index`, Buffer.from(count));
  }

  async getProjectByIndex(ctx, projectId) {

    let projectAsBytes = await ctx.stub.getState(`project_${projectId}`);
    if (!projectAsBytes || projectAsBytes.toString().length <= 0) {
      throw new Error('Project with this Id does not exist');
    }

    let project = JSON.parse(projectAsBytes.toString());
      
    return JSON.stringify(project);

  }

  async contribute(ctx, projectId, accountId, amount){
    let project = JSON.parse(await this.getProjectByIndex(projectId));

    if(project.state !== this.STATES.PROGRESS){
      throw new Error('Project is not in fundraising state.');
    }
    project.contributions[accountId] = amount;
    project.raised = project.raised + amount;
    await ctx.stub.putState(`project_${count}`, Buffer.from(JSON.stringify(project)));
    await this.checkProjectStatus(ctx, projectId);

  }

  async checkProjectStatus(ctx, projectId){
    let project = JSON.parse(await this.getProjectByIndex(projectId));
    
    if(project.state !== this.STATES.PROGRESS){
      throw new Error('Project is not in fundraising state.');
    }

    if(project.raised >= project.goal){
      project.state = this.STATES.SUCCESSFULL;
      await ctx.stub.putState(`project_${count}`, Buffer.from(JSON.stringify(project)));
    }
    else if(Date.now() > project.deadline){
      project.state = this.STATES.EXPIRED;
      await ctx.stub.putState(`project_${count}`, Buffer.from(JSON.stringify(project)));
    }
  }

}

module.exports.contracts = [ CrowdFunding ];
