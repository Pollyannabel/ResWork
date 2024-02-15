import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Avatar from "components/common/Avatar";
import Swal from "sweetalert2";

function UserListItems(props) {
  let user = props.user;

  const onDeactivateClick = () => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDeactivateRequested(user);
      }
    });
  };

  return (
    <>
      <ListGroup.Item className="user-list-item">
        <Row className="align-items-center">
          <Col xs="auto">
            <Avatar src={user.avatarUrl} size="2xl" />
          </Col>
          <Col>
            <div className="user-details">
              {user.firstName} {user.mi} {user.lastName}
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="danger" onClick={onDeactivateClick}>
              Deactivate
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}

UserListItems.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    mi: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
    statusId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date).isRequired,
    dateModified: PropTypes.instanceOf(Date).isRequired,
    roleId: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  onDeactivateRequested: PropTypes.shape({
    onDeactivateRequested: PropTypes.func.isRequired,
  }).isRequired,
};

export default React.memo(UserListItems);
