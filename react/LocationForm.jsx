import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import locationSchema from "../schemas/locationSchema";
import locationService from "services/locationService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lookUpService from "services/lookUpService";
import AddressAutocomplete from "./AddressAutocomplete";
import { mapLookUpItem } from "../../helpers/utils";

const _logger = debug.extend("LocationForm");

function LocationForm() {
  const [locationData, setLocationData] = useState({
    locationTypeId: "",
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: "",
    latitude: "",
    longitude: "",
    id: "",
  });

  const [lookUps, setLookUps] = useState({
    locationsTypes: [],
    mappedLocationTypes: [],
    states: [],
    mappedStates: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp(["LocationTypes", "States"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (data) => {
    const { locationTypes, states } = data.item;
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.locationsTypes = locationTypes;
      newState.mappedLocationTypes = locationTypes.map(mapLookUpItem);
      newState.states = states;
      newState.mappedStates = states.map(mapLookUpItem);
      return newState;
    });
  };

  const onLookUpError = (response) => {
    _logger("There was an error.", response);
  };

  const onSubmitHandle = (values) => {
    _logger("onSubmitHandle is firing.", values);
    if (values.id) {
      locationService
        .updateLocation(values, values.id)
        .then(onUpdateLocationSuccess)
        .catch(onUpdateLocationError);
    } else {
      locationService
        .addLocation(values)
        .then(onAddLocationSuccess)
        .catch(onAddLocationError);
    }
  };

  const onAddLocationSuccess = (response) => {
    _logger("Successfully added a location:", response);
    toast.success("Location Created Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });

    setLocationData((prevState) => {
      let newLocationData = { ...prevState };
      newLocationData.id = response.item;
      return newLocationData;
    });
  };

  const onAddLocationError = (response) => {
    _logger("There was a problem adding a location:", response);
    toast.error("Error Adding a New Location.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onUpdateLocationSuccess = (response) => {
    _logger("Successfully updated a location:", response);
    toast.success("Location Updated Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onUpdateLocationError = (response) => {
    _logger("There was a problem updating a location:", response);
    toast.error("Error Updating the Location.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onPlaceChangeSuccess = (newLocation) => {
    let stateUsed = lookUps.states.filter(
      (state) => state.name === newLocation.state
    );
    _logger(
      "onPlaceChangeSuccess newLocation back from AddressAutocomplete:",
      newLocation
    );

    setLocationData({
      locationTypeId: newLocation.locationTypeId,
      lineOne: newLocation.lineOne,
      lineTwo: newLocation.lineTwo,
      city: newLocation.city,
      zip: newLocation.zip,
      stateId: stateUsed[0].id,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>Add New Location</h1>

          <ToastContainer />
          <Formik
            enableReinitialize={true}
            initialValues={locationData}
            onSubmit={onSubmitHandle}
            validationSchema={locationSchema}
          >
            <Form>
              <AddressAutocomplete
                onPlaceChangeSuccess={onPlaceChangeSuccess}
              />
              <div className="form-group">
                <label htmlFor="locationType">Location Type</label>
                <Field
                  component="select"
                  className="form-control"
                  name="locationTypeId"
                >
                  <option>Select Location Type</option>
                  {lookUps.mappedLocationTypes}
                </Field>
                <ErrorMessage name="locationType" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="lineOne">Line One</label>
                <Field className="form-control" type="text" name="lineOne" />
                <ErrorMessage name="lineOne" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="lineTwo">Line Two</label>
                <Field className="form-control" type="text" name="lineTwo" />
                <ErrorMessage name="lineTwo" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field className="form-control" type="text" name="city" />
                <ErrorMessage name="city" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field
                  component="select"
                  className="form-control"
                  name="stateId"
                >
                  <option>Select State</option>
                  {lookUps.mappedStates}
                </Field>
                <ErrorMessage name="state" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <Field className="form-control" type="text" name="zip" />
                <ErrorMessage name="zip" component="div" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default LocationForm;
