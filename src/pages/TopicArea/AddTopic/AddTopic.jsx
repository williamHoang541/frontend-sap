import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import "./AddTopic.css";

const AddTopic = () => {
    const [selectedGender, setSelectedGender] = useState("");

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };

    return (
        <div className="add_topic">
            <div className="add_topic_title_container">
                <div className="add_topic_title_left">
                    <div className="add_topic_title">Add Topic</div>
                </div>
                <div className="add_topic_topic_right">
                    <div className="add_topic_topic">Topic Area</div>
                    <SlArrowRight className="add_topic_icon_right" />
                    <div className="add_topic_add_topics">Add Topic</div>
                </div>
            </div>

            <div className="add_topic_form_container">
                <div className="add_topic_label">Basic Info</div>
                <form className="add_topic_form">
                    <div className="add_topic_input_row">
                        <div className="add_topic_input_colum">
                            <label>Certificate Name</label>
                            <select
                                value={selectedGender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Certification
                                </option>
                                <option value="male">P_S4FIN</option>
                                <option value="female">C_TS542</option>
                                <option value="female">C_MDG</option>
                                <option value="female">E_S4CPE</option>
                            </select>
                        </div>
                    </div>
                    <div className="add_topic_input_row">
                        <div className="add_topic_input_colum">
                            <label htmlFor="name">Topic Name</label>
                            <input
                                type="text"
                                id="name"
                                className="add_topic_input"
                                placeholder="Enter the full name"
                            />
                        </div>
                    </div>

                    <div className="add_topic_input_row">
                        <div className="add_topic_input_colum">
                            <label htmlFor="joining_date">Topic Details</label>
                            <input
                                type="text"
                                id="joining_date"
                                className="add_topic_input"
                                placeholder="Topic Details"
                            />
                        </div>
                    </div>
                </form>

                <button className="add_topic_button_submit" type="submit">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddTopic;
