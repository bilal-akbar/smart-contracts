
MAXVAL: constant(int128) = (2**127 -1)

struct Project:
    title: string[1000]
    description: string[1000]
    raised: wei_value
    goal: wei_value
    deadline: timestamp
    state: int128
    owner: address

projects: public(Project[MAXVAL])
contributions: map(int128, map(address, wei_value))
projectsCount: int128


@private
def payOut(_projectIndex: int128):
    assert self.projects[_projectIndex].state == 2
    send(self.projects[_projectIndex].owner, self.projects[_projectIndex].raised)
        
@private
def refund(_projectIndex: int128, donor : address):
    assert self.projects[_projectIndex].state == 1
    assert self.contributions[_projectIndex][donor] > 0
    send(donor, self.contributions[_projectIndex][donor])
    

@private
def projectStatus(_projectIndex: int128):
    if self.projects[_projectIndex].raised >= self.projects[_projectIndex].goal:
        self.projects[_projectIndex].state = 2
        self.payOut(_projectIndex)
    elif block.timestamp > self.projects[_projectIndex].deadline:
        self.projects[_projectIndex].state = 1

@public
def createNewProject(_title: string[1000], _description: string[1000], _goal: wei_value, _days: uint256):
    self.projects[self.projectsCount] = Project({title: _title, description: _description, raised: 0, goal: _goal, deadline: block.timestamp + ( _days * 86400), state: 0, owner: msg.sender})
    self.projectsCount = self.projectsCount + 1
    
@public
@constant
def getProjectsCount() -> int128:
    return self.projectsCount
    
@public
@constant
def getProjectByIndex(_index: int128) -> (string[1000], string[1000], wei_value, wei_value, timestamp, int128):
    return (self.projects[_index].title, self.projects[_index].description, self.projects[_index].raised, self.projects[_index].goal, self.projects[_index].deadline, self.projects[_index].state)

@public
@payable
def contribute(_projectIndex: int128):
    assert self.projects[_projectIndex].state == 0
    assert self.projects[_projectIndex].owner != msg.sender
    assert msg.value > 0
    self.contributions[_projectIndex][msg.sender] = self.contributions[_projectIndex][msg.sender] + msg.value
    self.projects[_projectIndex].raised = self.projects[_projectIndex].raised + msg.value
    self.projectStatus(_projectIndex)