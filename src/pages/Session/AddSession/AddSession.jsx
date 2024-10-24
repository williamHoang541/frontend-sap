import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import "./AddSession.css";

const AddSession = () => {
    const [selectedGender, setSelectedGender] = useState("");

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };

    return (
        <div className="add_instructor">
            <div className="add_instructor_title_container">
                <div className="add_instructor_title_left">
                    <div className="add_instructor_title">Add Session</div>
                </div>
                <div className="add_instructor_instructor_right">
                    <div className="add_instructor_instructor">Sessions</div>
                    <SlArrowRight className="add_instructor_icon_right" />
                    <div className="add_instructor_add_instructors">
                        Add Session
                    </div>
                </div>
            </div>

            <div className="add_instructor_form_container">
                <div className="add_instructor_label">Basic Info</div>
                <form className="add_instructor_form">
                    <div className="add_session_input_row">
                        <div className="add_instructor_input_colum">
                            <label htmlFor="name">Course Name</label>
                            <select
                                value={selectedGender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Course
                                </option>
                                <option value="male">P_S4FIN</option>
                                <option value="female">C_TS542</option>
                                <option value="female">C_MDG</option>
                                <option value="female">E_S4CPE</option>
                            </select>
                        </div>
                        <div className="add_instructor_input_colum">
                            <label htmlFor="email">Session name</label>
                            <input
                                type="text"
                                id="email"
                                className="add_instructor_input"
                                placeholder="Enter the email"
                            />
                        </div>
                    </div>

                    <div className="add_session_input_row">
                        <div className="add_instructor_input_colum">
                            <label htmlFor="joining_date">Instructor</label>
                            <select
                                value={selectedGender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Instructor
                                </option>
                                <option value="male">P_S4FIN</option>
                                <option value="female">C_TS542</option>
                                <option value="female">C_MDG</option>
                                <option value="female">E_S4CPE</option>
                            </select>
                        </div>
                        <div className="add_instructor_input_colum">
                            <label htmlFor="password">
                                Session Description
                            </label>
                            <input
                                type="text"
                                id="password"
                                className="add_instructor_input"
                                placeholder="Enter the session description"
                            />
                        </div>
                    </div>
                    <div className="add_session_input_row">
                        <div className="add_instructor_input_colum">
                            <label htmlFor="education">Topic name</label>
                            <select
                                value={selectedGender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Topic
                                </option>
                                <option value="male">P_S4FIN</option>
                                <option value="female">C_TS542</option>
                                <option value="female">C_MDG</option>
                                <option value="female">E_S4CPE</option>
                            </select>
                        </div>
                        <div className="add_instructor_input_colum">
                            <label htmlFor="date_of_birth">Session Date</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                className="add_instructor_input"
                                placeholder="Select the date"
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

export default AddSession;
