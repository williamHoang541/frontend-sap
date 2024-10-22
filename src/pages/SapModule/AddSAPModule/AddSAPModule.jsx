import { Button, Radio } from "antd";
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
    status: true, // Mặc định là Active
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value === "active", // Chuyển đổi giá trị thành boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://swdsapelearningapi.azurewebsites.net/api/SapModule/create`, {
        moduleName: formData.moduleName,
        moduleDescription: formData.moduleDescription,
        status: formData.status,
      });

      if (response.status === 201) {
        // Redirect hoặc thông báo thành công
        alert('SAP Module added successfully');
        navigate(PATH_NAME.SAP_MODULE); // Hoặc bất kỳ route nào bạn muốn chuyển hướng
      } else {
        console.error("Error adding SAP Module:", response.data);
      }
    } catch (error) {
      console.error("Error adding SAP Module:", error.response ? error.response.data : error.message);
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
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label>Status</label>
              <Radio.Group onChange={handleStatusChange} value={formData.status ? "active" : "inactive"}>
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </Radio.Group>
            </div>
          </div>
          <Button className="add_instructor_button_submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSAPModule;