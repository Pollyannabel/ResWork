import React, { useEffect, useState, useCallback } from "react";
import ExpAccordion from "./ExpAccordion";
import experienceService from "services/experienceService";
import debug from "sabio-debug";
import { Accordion } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const _logger = debug.extend("ExperienceList");

function ExperienceList() {
  const [experienceData, setExperienceData] = useState({
    experiences: [],
    mappedExperiences: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  _logger(experienceData);

  useEffect(() => {
    experienceService
      .getAllExp(experienceData.pageIndex, experienceData.pageSize)
      .then(onGetAllSuccess)
      .catch(onGetAllError);
  }, []);

  const onGetAllSuccess = (response) => {
    _logger("GetAllSuccess response:", response);
    let experienceDetails = response.item.pagedItems;

    setExperienceData((prevState) => {
      const newState = { ...prevState };
      newState.experiences = experienceDetails;
      newState.mappedExperiences = experienceDetails.map(mapExpToAccord);
      return newState;
    });
  };

  const onGetAllError = (response) => {
    _logger(
      "There has been an error retrieving the list of experiences:",
      response
    );
  };

  const mapExpToAccord = (oneExperience, index) => {
    return (
      <ExpAccordion
        experience={oneExperience}
        onEventKey={index}
        key={index}
        onDeleteExpClicked={onDeleteRequested}
      />
    );
  };

  const navigate = useNavigate();

  const onDeleteRequested = useCallback((experienceItem) => {
    _logger("onDeleteRequested useCallback Id:", experienceItem.id);
    const deleteHandler = deleteSuccessHandler(experienceItem.id);

    Swal.fire({
      title: "Are you sure you want to delete this experience?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete this experience.",
      cancelButtonText: `No, return to list`,
      cancelButtonColor: "#00cc66",
    }).then((result) => {
      if (result.isConfirmed) {
        experienceService
          .deleteExp(experienceItem.id)
          .then(deleteHandler)
          .catch();
      } else {
        navigate("/experience/list");
      }
    });
  }, []);

  const deleteSuccessHandler = (expIdToBeDeleted) => {
    _logger("deleteSuccessHandler is firing:", expIdToBeDeleted);

    return () => {
      setExperienceData((prevState) => {
        const newState = { ...prevState };
        newState.experiences = [...newState.experiences];

        const idxOf = newState.experiences.findIndex((experience) => {
          _logger("experience:", experience);
          let result = false;
          if (experience.id === expIdToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          newState.experiences.splice(idxOf, 1);
          newState.mappedExperiences = newState.experiences.map(mapExpToAccord);
        }
        return newState;
      });
    };
  };

  const pages = (page) => {
    setExperienceData((prevState) => {
      const newPage = { ...prevState };
      newPage.pageIndex = page - 1;
      return newPage;
    });
  };

  return (
    <>
      <div className="container">
        <h1>Experiences</h1>
        <hr />
        <div className="card">
          <Accordion defaultActiveKey={0}>
            {experienceData.mappedExperiences}
          </Accordion>
        </div>

        <hr />
        <div className="col">
          <Pagination
            className="justify-content-center d-flex"
            onChange={pages}
            current={experienceData.pageIndex + 1}
            pageSize={experienceData.pageSize}
            total={experienceData.totalCount}
          />
        </div>
      </div>
    </>
  );
}

export default ExperienceList;
