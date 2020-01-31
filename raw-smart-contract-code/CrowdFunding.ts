import { SmartContract, SerializableValueObject, Address, Fixed, MapStorage, constant, Integer, Blockchain, receive, Hash256, send, Transfer } from '@neo-one/smart-contract';

interface Project extends SerializableValueObject {
  readonly title: string;
  readonly description: string;
  readonly raised: Fixed<8>;
  readonly goal: Fixed<8>;
  readonly state: number;
  readonly deadline: Integer;
  readonly owner: Address;

}

export class CrowdFunding extends SmartContract {
  private readonly projects = MapStorage.for<number, Project>();
  private readonly contributions = MapStorage.for<[number, Address], Fixed<8>>();

  private projectIndex: number = 0;


  public createNewProject(_title: string, _description: string, _goal: Fixed<8>, _days: number, _owner: Address) {
    if (Address.isCaller(_owner)) {
      this.projects.set(this.projectIndex, { title: _title, description: _description, raised: 0, goal: _goal, state: 0, deadline: Blockchain.currentBlockTime + (_days * 86400), owner: _owner });
      this.projectIndex++;
    }
  }

  @constant
  public getProjectsCount(): number {
    return this.projectIndex;
  }

  @constant
  public getProjectByIndex(index: number): Project | undefined {
    if (index <= this.projectIndex) {
      return this.projects.get(index);
    }
    return undefined;
  }

  @receive
  public contribute(index: number) {

    const project = this.projects.get(index);

    if (project !== undefined && project.state === 0) {

      const { references, outputs } = Blockchain.currentTransaction;
      if (references.length === 0) {
        throw new Error('Invalid mintTokens');
      }
      const account = references[0].address;

      let amount = 0;
      for (const output of outputs) {
        if (output.address.equals(this.address)) {
          if (!output.asset.equals(Hash256.NEO)) {
            throw new Error('Invalid Value Type');
          }

          amount += output.value;
        }
      }

      this.projects.set(index, { ...project, raised: project.raised + amount });
      this.contributions.set([index, account], amount);
      this.projectStatus(index);
    }

    else {
      throw new Error('Invalid ProjectID or Project State');
    }

  }

  @send
  public payOut(index: number, transfer: Transfer){

    const project = this.projects.get(index);

    if (project == undefined){
      throw new Error('Project does not exist');
    }

    if (!transfer.asset.equals(Hash256.NEO)) {
      throw new Error('Expected transfer asset to be NEO');
    }
    const amount = transfer.amount;

    if (project.state === 2 && project.raised < amount && transfer.to === project.owner) {
      throw new Error(`Transfer amount must be greater than to balance. Amount: ${amount}. Balance: ${project.raised}`);
    }
    this.projects.set(index, { ...project, raised: 0 });
  }

  private projectStatus(index: number) {

    const project = this.projects.get(index);
    if (project !== undefined && project.state === 0) {
      if (project.raised >= project.goal) {
        this.projects.set(index, { ...project, state: 2 });
      }

      else if ((Blockchain.currentBlockTime >= project.deadline)) {
        this.projects.set(index, { ...project, state: 1 });
      }

    }

  }

}
