import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("ExpAccordion");

function ExpAccordion(props) {
  const oneExperience = props.experience;
  _logger("oneExperience:", oneExperience);
  const navigate = useNavigate();

  const onEditClick = () => {
    _logger("onEditClick button is firing");
    const state = { type: "expAccordInfo", payload: oneExperience };
    navigate(`/experience/edit/${oneExperience.id}`, {
      state: state,
    });
  };

  const onDeleteClick = () => {
    props.onDeleteExpClicked(oneExperience);
  };

  function formatDateTime(datetimeString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      undefined,
      options
    );
    if (formattedDate === "01/01/1") {
      return "Current";
    }
    return formattedDate;
  }

  return (
    <Accordion.Item eventKey={props.onEventKey}>
      <Accordion.Header>
        <Row className="w-100">
          <Col md={3}>
            <span className="fw-bold">
              {oneExperience.jobTitle}
              {", "}
            </span>
            {oneExperience.companyName}
          </Col>
          <Col md={2}>{oneExperience.experienceType.name}</Col>
          <Col md={4}>
            {oneExperience.city}
            {", "}
            {oneExperience.state}
            {", "}
            {oneExperience.country}
          </Col>
          <Col md={3}>
            {formatDateTime(oneExperience.startDate)}
            {" - "}
            {formatDateTime(oneExperience.endDate)}
          </Col>
        </Row>
      </Accordion.Header>
      <Accordion.Body>
        <Row className="w-100">{oneExperience.description}</Row>
        <Row>
          <Col className="d-flex justify-content-end align-items-end">
            <Button
              id="editBtn"
              name="editBtn"
              onClick={onEditClick}
              style={{
                backgroundColor: "blue",
                border: "blue",
                color: "white",
                marginRight: "10px",
              }}
            >
              Edit
            </Button>
            <Button
              id="deleteBtn"
              name="deleteBtn"
              type="button"
              onClick={onDeleteClick}
              style={{ backgroundColor: "red", border: "red", color: "white" }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

ExpAccordion.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    experienceType: PropTypes.string.isRequired,
    isCurrent: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date),
    jobTitle: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteExpClicked: PropTypes.shape({
    onDeleteRequested: PropTypes.func.isRequired,
  }).isRequired,
  onEventKey: PropTypes.number.isRequired,
}.isRequired;

export default React.memo(ExpAccordion);
