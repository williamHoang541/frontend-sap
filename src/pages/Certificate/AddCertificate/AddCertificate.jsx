import { useState } from "react";
import "./AddCertificate.css";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";

const AddCertificate = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [sapModules, setSapModules] = useState([]);
  const [certificateName, setCertificateName] = useState("");
  const [level, setLevel] = useState("");
  const [environment, setEnvironment] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSapModules = async () => {
      try {
        const response = await axios.get(
          "https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all"
        ); // Đường dẫn API để lấy danh sách module
        setSapModules(response.data.$values); // Lưu danh sách module vào state
      } catch (error) {
        console.error("Error fetching SAP Modules:", error);
      }
    };

    fetchSapModules();
  }, []);

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const moduleId = parseInt(selectedModule, 10);
    if (isNaN(moduleId)) {
      setError("Invalid Sap Module ID.");
      setLoading(false);
      return;
    }

    const requestData = {
      certificateName: certificateName,
      description: description,
      level: level,
      environment: environment,
      image: image, // Giả sử không có file hình ảnh trong trường hợp này
      status: true,
      moduleIds: [selectedModule],
    };

    console.log("Request Data:", requestData);

    try {
      const response = await axios.post(
        "https://swdsapelearningapi.azurewebsites.net/api/Certificate/create",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Certificate added successfully!"); // Thông báo thành công
        navigate(PATH_NAME.CERTIFICATE);
      }
    } catch (error) {
      console.error("Error adding certificate:", error);

      if (error.response) {
        console.error("Response data:", error.response.data); // In chi tiết lỗi
        console.error("Response status:", error.response.status);
      }

      setError("An error occurred while adding the certificate."); // Hiển thị lỗi trên UI
    } finally {
      setLoading(false); // Dừng trạng thái tải bất kể có lỗi hay không
    }
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
        <form className="add_instructor_form" onSubmit={handleSubmit}>
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label>Name SAP Module</label>
              <select value={selectedModule} onChange={handleModuleChange}>
                <option value="" disabled>
                  Select SAP Module
                </option>
                {sapModules.map((modul) => (
                  <option key={modul.id} value={modul.id}>
                    {modul.moduleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="name_certificate">Name Certificate</label>
              <input
                type="text"
                id="name_certificate"
                className="add_instructor_input"
                placeholder="Enter name certificate"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
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
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="env">Environment</label>
              <input
                type="text"
                id="env"
                className="add_instructor_input"
                placeholder="Enter environment"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                className="add_instructor_input"
                placeholder="Link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button
            className="add_cert_button_submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCertificate;
