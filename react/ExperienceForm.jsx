import React, { useState, useEffect } from "react";
import { mapLookUpItem } from "../../helpers/utils";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import experienceSchema from "components/schemas/experienceSchema";
import debug from "sabio-debug";
import lookUpService from "services/lookUpService";
import DatePicker from "react-datepicker";
import { Row, Col, Button } from "react-bootstrap";
import experienceService from "services/experienceService";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const _logger = debug.extend("ExperienceForm");

function ExperienceForm() {
  const [experienceData, setExperienceData] = useState({
    experienceTypeId: "",
    isCurrent: "",
    startDate: "",
    endDate: null,
    jobTitle: "",
    companyName: "",
    city: "",
    state: "",
    country: "",
    description: "",
    id: "",
  });

  const [lookUps, setLookUps] = useState({
    experienceTypes: [],
    mappedExperienceTypes: [],
    states: [],
    mappedStates: [],
    countries: [],
    mappedCountries: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp(["ExperienceTypes", "States", "Countries"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const { state } = useLocation();

  useEffect(() => {
    if (state?.type && state?.payload) {
      _logger("state from list:", state.payload);
      setExperienceData((prevState) => {
        let newStartDate = new Date(state.payload.startDate);
        let newEndDate = new Date(state.payload.endDate);
        if (state.payload.isCurrent === 1) {
          newEndDate = null;
        }
        let editExpState = { ...prevState };
        editExpState = {
          experienceTypeId: state.payload.experienceType.id,
          isCurrent: state.payload.isCurrent,
          startDate: newStartDate,
          endDate: newEndDate,
          jobTitle: state.payload.jobTitle,
          companyName: state.payload.companyName,
          city: state.payload.city,
          state: state.payload.state,
          country: state.payload.country,
          description: state.payload.description,
          id: state.payload.id,
        };
        return editExpState;
      });
    }
  }, [state]);

  const mapStatesCountries = (item) => (
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  );

  const onLookUpSuccess = (data) => {
    const { experienceTypes, states, countries } = data.item;
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.experienceTypes = experienceTypes;
      newState.mappedExperienceTypes = experienceTypes.map(mapLookUpItem);
      newState.states = states;
      newState.mappedStates = states.map(mapStatesCountries);
      newState.countries = countries;
      newState.mappedCountries = countries.map(mapStatesCountries);
      return newState;
    });
  };

  const onLookUpError = (response) => {
    _logger("There was an error making request.", response);
  };

  const navigate = useNavigate();

  const onAddExperienceSuccess = (response, resetForm) => {
    _logger(
      "OnAddExperienceSuccess: Experiences were added successfully!",
      response
    );

    Swal.fire({
      title:
        "You've successfully added some experience to your profile! What would you like to do next?",
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: "Go to list",
      denyButtonColor: "#324ca8",
      confirmButtonText: "Go to homepage",
      cancelButtonText: `Add more experience`,
      cancelButtonColor: "#00cc66",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
      if (result.isDenied) {
        navigate("/experience/list");
      } else {
        resetForm();
      }
    });
  };

  const onAddExperienceError = (response) => {
    _logger("onAddExperienceError: Experiences were not added!", response);
  };

  const onSubmitHandle = (values, { resetForm }) => {
    _logger("Submit button is firing:", values);

    if (values.arrayOfExp[0].id !== "") {
      if (values.arrayOfExp[0].isCurrent === "1") {
        values.arrayOfExp[0].endDate = null;
      }
      experienceService
        .updateExp(values.arrayOfExp[0].id, values.arrayOfExp[0])
        .then(onUpdateExpSuccess)
        .catch(onUpdateError);
    } else {
      experienceService
        .addExperience(values.arrayOfExp)
        .then((response) => onAddExperienceSuccess(response, resetForm))
        .catch(onAddExperienceError);
    }
  };

  const onUpdateError = () => {
    _logger("There was an error updating the experience.");
  };

  const onUpdateExpSuccess = (response) => {
    _logger("The experience has been successfully updated!", response);
    Swal.fire({
      title:
        "You've successfully updated your experience! What would you like to do next?",
      showCancelButton: true,
      confirmButtonText: "Go to homepage",
      cancelButtonText: `Return to list`,
      cancelButtonColor: "#00cc66",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else {
        navigate("/experience/list");
      }
    });
  };

  return (
    <>
      {experienceData.id === "" && <h1>Add Experiences</h1>}
      {experienceData.id !== "" && <h1>Edit Experience</h1>}
      <div className="centered-container">
        <Formik
          enableReinitialize={true}
          initialValues={{ arrayOfExp: [experienceData] }}
          onSubmit={onSubmitHandle}
          validationSchema={experienceSchema}
        >
          {({ setFieldValue, values }) => (
            <Form id="addExperience">
              <FieldArray name="arrayOfExp">
                {({ push, remove }) => {
                  return (
                    <>
                      {values.arrayOfExp.map((anExp, index) => {
                        return (
                          <>
                            <hr></hr>
                            <div className="card p-2 bg-light" key={index}>
                              <h3 className="text-center p-4">
                                Experience {index + 1}
                              </h3>
                              <Row>
                                <Col xs={6} className="form-group">
                                  <label htmlFor="experienceType">
                                    Experience Type
                                  </label>
                                  <Field
                                    component="select"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.experienceTypeId`}
                                  >
                                    <option>Select Experience Type</option>
                                    {lookUps.mappedExperienceTypes}
                                  </Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.experienceTypeId`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                                <Col xs={6} className="form-group">
                                  <label htmlFor="isCurrent">
                                    Is this a current experience?
                                  </label>
                                  <Field
                                    component="select"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.isCurrent`}
                                  >
                                    <option>Select</option>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                  </Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.isCurrent`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={6} className="form-group">
                                  <label htmlFor="startDate">Start Date</label>
                                  <DatePicker
                                    id="startDate"
                                    className="form-control"
                                    onChange={(val) =>
                                      setFieldValue(
                                        `arrayOfExp.${index}.startDate`,
                                        val
                                      )
                                    }
                                    selected={
                                      values.arrayOfExp[index].startDate
                                    }
                                    name={`arrayOfExp.${index}.startDate`}
                                  ></DatePicker>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.startDate`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                                <Col xs={6} className="form-group">
                                  <label htmlFor="endDate">End Date</label>
                                  <DatePicker
                                    id="endDate"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.endDate`}
                                    onChange={(val) =>
                                      setFieldValue(
                                        `arrayOfExp.${index}.endDate`,
                                        val
                                      )
                                    }
                                    selected={values.arrayOfExp[index].endDate}
                                    disabled={
                                      values.arrayOfExp[index].isCurrent ===
                                        1 ||
                                      values.arrayOfExp[index].isCurrent === "1"
                                    }
                                  ></DatePicker>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.endDate`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} className="form-group">
                                  <label htmlFor="jobTitle">Job Title</label>
                                  <Field
                                    className="form-control"
                                    name={`arrayOfExp.${index}.jobTitle`}
                                  ></Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.jobTitle`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} className="form-group">
                                  <label htmlFor="companyName">
                                    Company Name
                                  </label>
                                  <Field
                                    className="form-control"
                                    name={`arrayOfExp.${index}.companyName`}
                                  ></Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.companyName`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} className="form-group">
                                  <label htmlFor="companyName">City</label>
                                  <Field
                                    className="form-control"
                                    name={`arrayOfExp.${index}.city`}
                                  ></Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.city`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={4} className="form-group">
                                  <label htmlFor="companyName">State</label>
                                  <Field
                                    component="select"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.state`}
                                  >
                                    <option>Select State</option>
                                    {lookUps.mappedStates}
                                  </Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.state`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                                <Col xs={8} className="form-group">
                                  <label htmlFor="companyName">Country</label>
                                  <Field
                                    component="select"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.country`}
                                  >
                                    <option>Select Country</option>
                                    {lookUps.mappedCountries}
                                  </Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.country`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} className="form-group">
                                  <label htmlFor="description">
                                    Description
                                  </label>
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    name={`arrayOfExp.${index}.description`}
                                    rows={3}
                                  ></Field>
                                  <ErrorMessage
                                    name={`arrayOfExp.${index}.description`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <hr />
                              {experienceData.id === "" && (
                                <Button
                                  className="rounded-pill mx-auto"
                                  variant="outline-danger"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          </>
                        );
                      })}
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          {experienceData.id === "" && (
                            <Button
                              className="rounded-pill"
                              variant="primary"
                              onClick={() => {
                                push(experienceData);
                              }}
                            >
                              <span className="text-white mr-2">+</span>Add More
                              Experience
                            </Button>
                          )}
                        </div>
                        <Button
                          id="submitBtn"
                          type="submit"
                          className="rounded-pill"
                          variant="success"
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  );
                }}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ExperienceForm;
