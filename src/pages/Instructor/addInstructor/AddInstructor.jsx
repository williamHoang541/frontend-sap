import React, { useState } from "react";
import "./AddInstructor.css";
import { SlArrowRight } from "react-icons/sl";

const AddInstructor = () => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className="add_instructor">
      <div className="add_instructor_title_container">
        <div className="add_instructor_title_left">
          <div className="add_instructor_title">Add Instructor</div>
        </div>
        <div className="add_instructor_instructor_right">
          <div className="add_instructor_instructor">Instructors</div>
          <SlArrowRight className="add_instructor_icon_right" />
          <div className="add_instructor_add_instructors">Add Instructor</div>
        </div>
      </div>

      <div className="add_instructor_form_container">
        <div className="add_instructor_label">Basic Info</div>
        <form className="add_instructor_form">
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="add_instructor_input"
                placeholder="Enter the full name"
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="add_instructor_input"
                placeholder="Enter the email"
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="joining_date">Joining Date</label>
              <input
                type="date"
                id="joining_date"
                className="add_instructor_input"
                placeholder="Select the date"
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="add_instructor_input"
                placeholder="Enter the password"
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="number"
                id="phone"
                className="add_instructor_input"
                placeholder="Enter the phone"
              />
            </div>
            <div className="add_instructor_input_colum">
              <label>Gender</label>
              <select value={selectedGender} onChange={handleChange}>
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                className="add_instructor_input"
                placeholder="Select the date"
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                className="add_instructor_input"
                placeholder="Enter the education"
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

export default AddInstructor;
