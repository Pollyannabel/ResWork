import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import UserListItems from "./UserListItems";
import debug from "sabio-debug";
import * as usersService from "../../../services/usersService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "components/common/Avatar";

const _logger = debug.extend("AdminDashboard");

function AdminDashboard() {
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
      let count = response.items.length;
      newState.userTotalCount = count;
      newState.studentTotalCount = newState.users.filter(
        (x) => x.role.name === "Student"
      ).length;
      newState.employeeTotalCount = newState.users.filter(
        (x) => x.role.name === "Admin"
      ).length;
      newState.parentTotalCount = newState.users.filter(
        (x) => x.role.name === "Parent"
      ).length;
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
      <UserListItems
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

  const navigate = useNavigate();

  const goToAll = () => {
    navigate("/admin/dashboard/users");
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <hr />
      <Row>
        <Col>
          <Card className="pt-2 pb-2 px-3">
            <Card.Title>
              <h3>Total Students</h3>
            </Card.Title>
            <Card.Subtitle className="d-flex justify-content-between">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpY0oP9fpojlaKpV-pzSfButzZk6vkGYwaZQ&usqp=CAU"
                size="xl"
              />
              <h3>{userData.studentTotalCount}</h3>
            </Card.Subtitle>
          </Card>
        </Col>
        <Col>
          <Card className="pt-2 pb-2 px-3">
            <Card.Title>
              <h3>Total Parents</h3>
            </Card.Title>
            <Card.Subtitle className="d-flex justify-content-between">
              <Avatar
                src="https://simscommunity.info/wp-content/uploads/2017/04/FAM.png"
                size="l"
                rounded="soft"
              />
              <h3>{userData.parentTotalCount}</h3>
            </Card.Subtitle>
          </Card>
        </Col>
        <Col>
          <Card className="pt-2 pb-2 px-3">
            <Card.Title>
              <h3>Total Employees</h3>
            </Card.Title>
            <Card.Subtitle className="d-flex justify-content-between">
              <Avatar
                src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
                size="2xl"
                rounded="soft"
              />
              <h3>{userData.employeeTotalCount}</h3>
            </Card.Subtitle>
          </Card>
        </Col>
        <Col>
          <Card className="pt-2 pb-2 px-3">
            <Card.Title>
              <h3>Total Users</h3>
            </Card.Title>
            <Card.Subtitle className="d-flex justify-content-between">
              <Avatar
                src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg"
                size="l"
              />
              <h3>{userData.userTotalCount}</h3>
            </Card.Subtitle>
          </Card>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col lg={6}>
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
              <Col xs="auto">
                <DropdownButton
                  className="ml-auto d-flex justify-content-end"
                  variant="light"
                  id="dropdown-basic-button"
                  title="Select Role"
                >
                  <Dropdown.Item
                    onClick={() => onChangeFilterSelection("Student")}
                  >
                    Students
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onChangeFilterSelection("Parent")}
                  >
                    Parents
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onChangeFilterSelection("Admin")}
                  >
                    Employees
                  </Dropdown.Item>
                  <Dropdown.Item onClick={renderAllUsers}>All</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <ListGroup className="mt-3">
              {userData.mappedUsers.slice(0, 10)}
            </ListGroup>
            <Row className="mt-3 justify-content-end">
              <Button type="button" variant="link" onClick={goToAll}>
                See all users
              </Button>
            </Row>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
              alt="Placeholder image"
            />
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
              alt="Placeholder image"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
