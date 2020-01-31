pragma solidity ^0.5.8;

import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "./Project.sol";

contract Crowdfunding {
    using SafeMath for uint256;

    Project[] private projects;

    event ProjectStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 goalAmount
    );

    function startProject(
        string calldata title,
        string calldata description,
        uint256 durationInDays,
        uint256 amountToRaise
    ) external {
        uint256 raiseUntil = now.add(durationInDays.mul(1 days));
        Project newProject = new Project();
        newProject.init(
            msg.sender,
            title,
            description,
            raiseUntil,
            amountToRaise
        );
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            title,
            description,
            raiseUntil,
            amountToRaise
        );
    }

    function returnAllProjects() external view returns (Project[] memory) {
        return projects;
    }
}
