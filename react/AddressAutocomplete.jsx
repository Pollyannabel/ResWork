import React, { useState } from "react";
import debug from "sabio-debug";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types";

const _logger = debug.extend("LocationForm");

const AddressAutocomplete = (props) => {
  const [load, setLoad] = useState({});
  const onLoad = (data) => {
    setLoad(data);
  };

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const onPlaceChanged = () => {
    if (load?.getPlace) {
      const obj = load.getPlace();
      const address = placeParser(obj.address_components);
      let newLocation = {
        lineOne: `${address.street_number} ${address.route}`,
        lineTwo: `${address.subpremise || ""}`,
        city: `${address.locality}`,
        state: `${address.administrative_area_level_1}`,
        zip: `${address.postal_code}`,
        latitude: obj.geometry.location.lat(),
        longitude: obj.geometry.location.lng(),
      };
      _logger("newLocation on AddressAutoComplete file:", newLocation);
      props.onPlaceChangeSuccess(newLocation);
    }
  };

  const placeParser = (component) => {
    _logger("placeParser component:", component);
    let result = {};
    for (let i = 0; i < component.length; i++) {
      let addressComponent = component[i];
      result[addressComponent.types[0]] = addressComponent.long_name;
    }
    return result;
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Address"
          className="form-control auto mb-3"
        />
      </Autocomplete>
    </LoadScript>
  );
};

AddressAutocomplete.propTypes = {
  onPlaceChangeSuccess: PropTypes.func.isRequired,
};

export default AddressAutocomplete;
