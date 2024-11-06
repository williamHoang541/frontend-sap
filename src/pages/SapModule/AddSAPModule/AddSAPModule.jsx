import "./AddSAPModule.css";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import axios from "axios";
import { PATH_NAME } from "../../../constant/pathname";

const AddSAPModule = () => {
  const [formData, setFormData] = useState({
    moduleName: "",
    moduleDescription: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://swdsapelearningapi.azurewebsites.net/api/SapModule/create`,
        {
          moduleName: formData.moduleName,
          moduleDescription: formData.moduleDescription,
        }
      );

      if (response.status === 201) {
        // Redirect hoặc thông báo thành công
        alert("SAP Module added successfully");
        navigate(PATH_NAME.SAP_MODULE); // Hoặc bất kỳ route nào bạn muốn chuyển hướng
      }
    } catch (error) {
      // Kiểm tra mã lỗi hoặc thông báo từ server
      if (error.response && error.response.status === 500) {
        setErrorMessage(
          error.response.data.message || "Module name already exists."
        );
      } else {
        console.error(
          "Error adding SAP Module:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="add_instructor_form" onSubmit={handleSubmit}>
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="moduleName">Name SAP Module</label>
              <input
                type="text"
                id="moduleName"
                className="add_instructor_input"
                placeholder="Enter name SAP Module"
                value={formData.moduleName}
                onChange={handleChange}
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="moduleDescription">Description</label>
              <input
                type="text"
                id="moduleDescription"
                className="add_instructor_input"
                placeholder="Enter description"
                value={formData.moduleDescription}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="add_instructor_button_submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSAPModule;
