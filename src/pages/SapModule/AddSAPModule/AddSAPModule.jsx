import "./AddSAPModule.css";
import { SlArrowRight } from "react-icons/sl";

const AddSAPModule = () => {
  return (
    <div className="add_sap_module">
      <div className="add_instructor_title_container">
        <div className="add_instructor_title_left">
          <div className="add_instructor_title">Add SAP Module</div>
        </div>
        <div className="add_instructor_instructor_right">
          <div className="add_instructor_instructor">SAP Module</div>
          <SlArrowRight className="add_instructor_icon_right" />
          <div className="add_instructor_add_instructors">Add SAP Module</div>
        </div>
      </div>

      <div className="add_sap_module_form_container">
        <div className="add_instructor_label">Basic Info</div>
        <form className="add_instructor_form">
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="name">Name SAP Module</label>
              <input
                type="text"
                id="name"
                className="add_instructor_input"
                placeholder="Enter name SAP Module"
              />
            </div>
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

export default AddSAPModule;
