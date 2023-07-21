// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Property {
    //create a struct containing all properties.
    struct propertyDetail {
        address ownerAddress;
        string ownerName;
        string uri;
        string ptype;
        string stateCode;
        string cityCode;
        uint tokenId;
    }

    //create an object array
    mapping(uint256 => propertyDetail) PropertyDetails;

    // Maintain a record of all addresses
    address[] private propertyIndex;

    //create an event to emit creation of new entrey
    event NewPropertyAdded(
        address indexed ownerAddress,
        string ownerName,
        string uri,
        string ptype,
        string stateCode,
        string cityCode,
        uint tokenId
    );

    function getPropertyCount() public view returns (uint256 count) {
        return propertyIndex.length;
    }

    function listNewProperty(
        address ownerAddress,
        string memory ownerName,
        string memory uri,
        string memory ptype,
        string memory stateCode,
        string memory cityCode
    ) public {
        //Update address in our record
        propertyIndex.push(ownerAddress);
        //create an entry on object array
        uint propNumber = propertyIndex.length - 1;

        //add object to array

        PropertyDetails[propNumber].ownerAddress = ownerAddress;
        PropertyDetails[propNumber].ownerName = ownerName;
        PropertyDetails[propNumber].uri = uri;
        PropertyDetails[propNumber].ptype = ptype;
        PropertyDetails[propNumber].cityCode = cityCode;
        PropertyDetails[propNumber].stateCode = stateCode;
        PropertyDetails[propNumber].tokenId = propNumber;

        // emit an event on successful creation

        emit NewPropertyAdded(
            ownerAddress,
            ownerName,
            uri,
            ptype,
            stateCode,
            cityCode,
            propNumber
        );
    }

    //function to query all properties on the chain

    function getAllRecords() public view returns (propertyDetail[] memory) {
        uint256 propCount = getPropertyCount();
        propertyDetail[] memory items = new propertyDetail[](propCount);

        for (uint i = 0; i < propertyIndex.length; i++) {
            items[i] = PropertyDetails[i];
        }
        return items;
    }
}
