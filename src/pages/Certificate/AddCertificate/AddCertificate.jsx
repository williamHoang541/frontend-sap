import { useState } from "react";
import "./AddCertificate.css";
import { SlArrowRight } from "react-icons/sl";

const AddCertificate = () => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };
  return (
    <div className="add_certificate">
      <div className="add_instructor_title_container">
        <div className="add_instructor_title_left">
          <div className="add_instructor_title">Add Certificate</div>
        </div>
        <div className="add_instructor_instructor_right">
          <div className="add_instructor_instructor">Certificate</div>
          <SlArrowRight className="add_instructor_icon_right" />
          <div className="add_instructor_add_instructors">Add Certificate</div>
        </div>
      </div>

      <div className="add_instructor_form_container">
        <div className="add_instructor_label">Basic Info</div>
        <form className="add_instructor_form">
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label>Name SAP Module</label>
              <select value={selectedGender} onChange={handleChange}>
                <option value="" disabled>
                  Select SAP Module
                </option>
                <option value="male">ABC</option>
                <option value="female">BDF</option>
              </select>
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="name_certificate">Name Certificate</label>
              <input
                type="text"
                id="name_certificate"
                className="add_instructor_input"
                placeholder="Enter name certificate"
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="level">Level</label>
              <input
                type="text"
                id="level"
                className="add_instructor_input"
                placeholder="Enter a level"
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="env">Environment</label>
              <input
                type="text"
                id="env"
                className="add_instructor_input"
                placeholder="Enter environment"
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                className="add_instructor_input"
                placeholder="Enter description"
              />
            </div>
          </div>
        </form>

        <button className="add_instructor_button_submit" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddCertificate;
