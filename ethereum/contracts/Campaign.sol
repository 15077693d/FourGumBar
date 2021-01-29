// SPDX-License-Identifier: GPL-3.0
/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(
        uint256 _minWei,
        string _category,
        string _description,
        string _title,
        uint256 _targetWei
    ) public returns (address) {
        address newCampaign =
            new Campaign(
                _minWei,
                msg.sender,
                _category,
                _description,
                _title,
                _targetWei
            );
        deployedCampaigns.push(newCampaign);
        return newCampaign;
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string name;
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    string public category;
    string public description;
    string public title;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approverCount;
    Request[] public requests;
    uint256 public target;
    mapping(address => uint256) public approverContributions;
    address[] public approverAddresses;

    function Campaign(
        uint256 minWei,
        address sender,
        string _category,
        string _description,
        string _title,
        uint256 targetWei
    ) public {
        manager = sender;
        minimumContribution = minWei;
        approverCount = 0;
        category = _category;
        title = _title;
        description = _description;
        target = targetWei;
    }

    function getRequestApproverCount(uint256 id) public view returns (uint256) {
        return requests[id].approvalCount;
    }

    function getRequestStatus(uint256 id) public view returns (bool) {
        return requests[id].complete;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        address approver = msg.sender;
        if (!approvers[approver]){
             approverAddresses.push(approver);
             approverCount += 1;
        }
        approvers[approver] = true;
        approverContributions[approver]+=msg.value;
    }

    function createRequest(
        string name,
        string _description,
        uint256 value,
        address recipient
    ) public restricted returns (uint256) {
        require(value < this.balance);
        requests.push(Request(name, _description, value, recipient, false, 0));
        return requests.length;
    }

    function approveRequest(uint256 id) public {
        Request storage request = requests[id];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount += 1;
    }

    function finalizeRequest(uint256 id) public restricted {
        Request storage request = requests[id];
        require(request.complete == false);
        require(request.approvalCount > approverCount / 2);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getRequestSummary(uint256 id)
        public
        view
        returns (
            string,
            string,
            uint256,
            address,
            bool,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        uint256 index = id;
        Request storage request = requests[id];
        return (
            request.name,
            request.description,
            request.value,
            request.recipient,
            request.complete,
            request.approvalCount,
            approverCount,
            index,
            address(this)
        );
    }

    function getRequestCount() public view returns (uint256) {
        return requests.length;
    }
    
    function getApproverAddresses() public view returns (address[]) {
        return approverAddresses;
    }

    function getSummary()
        public
        view
        returns (
            string,
            string,
            string,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256
        )
    {
        return (
            category,
            description,
            title,
            this.balance,
            minimumContribution,
            approverCount,
            getRequestCount(),
            manager,
            target
        );
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
