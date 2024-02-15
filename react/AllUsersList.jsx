//import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
//import { useLocation } from "react-router-dom";
import { Card, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import ExtraDetailsListItems from "./ExtraDetailsListItems";
import * as usersService from "../../../services/usersService";
import Swal from "sweetalert2";

const _logger = debug.extend("AllUsersList");

function AllUsersList() {
  const [userData, setUserData] = useState({
    users: [],
    mappedUsers: [],
    filterSelection: "All",
  });

  useEffect(() => {
    usersService.getAllUsers().then(getUsersSuccess).catch(getUsersError);
  }, []);

  const getUsersSuccess = (response) => {
    _logger("getUsersSuccess is firing:", response);
    let userDetails = response.items;

    setUserData((prevState) => {
      const newState = { ...prevState };
      newState.users = userDetails;
      newState.mappedUsers = newState.users
        .filter((x) => x.status.name === "Active")
        .map(mapUsers);
      return newState;
    });
  };

  const getUsersError = (response) => {
    _logger("getUsersError is firing:", response);
  };

  const onDeactivateRequested = useCallback((oneUser) => {
    _logger(
      "oneUser in onDeactivateRequested on AdminDashboard is firing:",
      oneUser
    );
    usersService
      .updateStatus(oneUser.id)
      .then(onDeactivateSuccess)
      .catch(onDeactivateError);
    _logger(oneUser);
  }, []);

  const onDeactivateSuccess = () => {
    Swal.fire("User has been successfully deactivated.");
    window.location.reload();
  };

  const onDeactivateError = () => {
    Swal.fire("There was a problem deactivating user.");
  };

  const mapUsers = (oneUser) => {
    return (
      <ExtraDetailsListItems
        key={oneUser.id}
        user={oneUser}
        role={oneUser.role}
        onDeactivateRequested={onDeactivateRequested}
      />
    );
  };

  const onChangeFilterSelection = (roleSelected) => {
    setUserData((prevState) => {
      let newFilterSelection = { ...prevState };
      newFilterSelection.filterSelection = roleSelected;
      newFilterSelection.mappedUsers = newFilterSelection.users
        .filter(
          (x) =>
            x.role.name.toLowerCase().trim() ===
            roleSelected.toLowerCase().trim()
        )
        .map(mapUsers);
      return newFilterSelection;
    });
  };

  const renderAllUsers = () => {
    setUserData((prevState) => {
      let allUsers = { ...prevState };
      allUsers.mappedUsers = allUsers.users.map(mapUsers);
      allUsers.filterSelection = "User";
      return allUsers;
    });
  };

  const onChangeStatusSelection = (statusSelected) => {
    setUserData((prevState) => {
      let newMappedUsers = { ...prevState };
      newMappedUsers.mappedUsers = newMappedUsers.users
        .filter(
          (x) =>
            x.status.name.toLowerCase().trim() ===
            statusSelected.toLowerCase().trim()
        )
        .map(mapUsers);
      return newMappedUsers;
    });
  };

  return (
    <>
      <h1>All Users</h1>

      <Card className="pt-2">
        <Row className="d-flex justify-content-between align-items-center px-3">
          <Col>
            {userData.filterSelection === "All" && <h5>All Users</h5>}
            {userData.filterSelection !== "All" && (
              <h5>
                All {userData.filterSelection}
                {"s"}
              </h5>
            )}
          </Col>
          <Col>
            <DropdownButton
              className="ml-auto d-flex justify-content-end"
              variant="light"
              id="dropdown-basic-button"
              title="Select Status"
            >
              <Dropdown.Item onClick={() => onChangeStatusSelection("Active")}>
                Active
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onChangeStatusSelection("Inactive")}
              >
                Inactive
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeStatusSelection("Pending")}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeStatusSelection("Flagged")}>
                Flagged
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeStatusSelection("Removed")}>
                Removed
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs="auto">
            <DropdownButton
              className="ml-auto d-flex justify-content-end"
              variant="light"
              id="dropdown-basic-button"
              title="Select Role"
            >
              <Dropdown.Item onClick={() => onChangeFilterSelection("Student")}>
                Students
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeFilterSelection("Parent")}>
                Parents
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeFilterSelection("Admin")}>
                Employees
              </Dropdown.Item>
              <Dropdown.Item onClick={renderAllUsers}>All</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <hr />
        <Row className="d-flex fw-bold">
          <Col lg={2} className="d-flex justify-content-center mx-4">
            Name
          </Col>
          <Col lg={3} className="d-flex justify-content-center mx-2">
            Email
          </Col>
          <Col lg={2} className="d-flex justify-content-center mx-4">
            Status
          </Col>
          <Col lg={1} className="d-flex justify-content-center mx-3">
            Role
          </Col>
        </Row>
        <ListGroup className="mt-3">{userData.mappedUsers}</ListGroup>
      </Card>
    </>
  );
}

export default AllUsersList;
