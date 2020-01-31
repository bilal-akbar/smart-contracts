pragma solidity ^0.5.8;

import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract Project {
    using SafeMath for uint256;

    enum State {Fundraising, Expired, Successful}

    address payable public creator;
    uint256 public amountGoal;
    uint256 public completeAt;
    uint256 public currentBalance;
    uint256 public raiseBy;
    string public title;
    string public description;
    State public state = State.Fundraising;
    mapping(address => uint256) public contributions;

    event FundingReceived(
        address contributor,
        uint256 amount,
        uint256 currentTotal
    );
    event CreatorPaid(address recipient);

    // Modifier to check current state
    modifier inState(State _state) {
        require(state == _state, "");
        _;
    }

    function init(
        address payable projectStarter,
        string memory projectTitle,
        string memory projectDesc,
        uint256 fundRaisingDeadline,
        uint256 goalAmount
    ) public {
        creator = projectStarter;
        title = projectTitle;
        description = projectDesc;
        amountGoal = goalAmount;
        raiseBy = fundRaisingDeadline;
        currentBalance = 0;
    }

    function contribute() external payable inState(State.Fundraising) {
        require(msg.sender != creator, "");
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        currentBalance = currentBalance.add(msg.value);
        emit FundingReceived(msg.sender, msg.value, currentBalance);
        checkIfFundingCompleteOrExpired();
    }

    function checkIfFundingCompleteOrExpired() public {
        if (currentBalance >= amountGoal) {
            state = State.Successful;
            payOut();
        } else if (now > raiseBy) {
            state = State.Expired;
        }
        completeAt = now;
    }

    function payOut() internal inState(State.Successful) returns (bool) {
        uint256 totalRaised = currentBalance;
        currentBalance = 0;

        if (creator.send(totalRaised)) {
            emit CreatorPaid(creator);
            return true;
        } else {
            currentBalance = totalRaised;
            state = State.Successful;
        }

        return false;
    }

    function getRefund() public inState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0, "");

        uint256 amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if (!msg.sender.send(amountToRefund)) {
            contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            currentBalance = currentBalance.sub(amountToRefund);
        }

        return true;
    }

    function getDetails()
        public
        view
        returns (
            address payable projectStarter,
            string memory projectTitle,
            string memory projectDesc,
            uint256 deadline,
            State currentState,
            uint256 currentAmount,
            uint256 goalAmount
        )
    {
        projectStarter = creator;
        projectTitle = title;
        projectDesc = description;
        deadline = raiseBy;
        currentState = state;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
    }
}