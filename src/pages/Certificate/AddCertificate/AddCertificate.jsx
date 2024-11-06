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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Fetch SAP modules on mount
  useEffect(() => {
      const fetchSapModules = async () => {
          try {
              const response = await axios.get(
                  "https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all"
              );
              setSapModules(response.data.$values);
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

      if (!selectedModule) {
          setError("Please select a SAP Module.");
          return;
      }

      // Create a FormData object to handle form data and file upload
      const formData = new FormData();
      formData.append("certificateName", certificateName);
      formData.append("description", description);
      formData.append("level", level);
      formData.append("environment", environment);
      formData.append("status", true);

      // Append image file only if a file has been selected
      if (image) {
          formData.append("image", image);
      }

      // ModuleIds is expected to be an object with "$values" key for array format
      formData.append("moduleIds.$values", [selectedModule]);

      setLoading(true);
      setError(null);

      try {
          const response = await axios.post(
              "https://swdsapelearningapi.azurewebsites.net/api/Certificate/create",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
          );

          if (response.status >= 200 && response.status < 300) {
              alert("Certificate added successfully!");
              navigate(PATH_NAME.CERTIFICATE);
          }
      } catch (error) {
          console.error("Error adding certificate:", error);
          setError("An error occurred while adding the certificate.");
      } finally {
          setLoading(false);
      }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if the file is an image and has an allowed extension
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/gif", "image/png", "image/svg+xml"];
    
    if (file && allowedExtensions.includes(file.type)) {
      setImage(file);
    } else {
      setError("Invalid file type. Please select an image file (jpg, jpeg, gif, png, svg).");
      setImage(null);
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
                  <div className="add_instructor_add_instructors">
                      Add Certificate
                  </div>
              </div>
          </div>

          <div className="add_instructor_form_container">
              <div className="add_instructor_label">Basic Info</div>
              <form className="add_instructor_form" onSubmit={handleSubmit}>
                  <div className="add_instructor_input_row">
                      <div className="add_instructor_input_colum">
                          <label>Name SAP Module</label>
                          <select
                              value={selectedModule}
                              onChange={handleModuleChange}
                          >
                              <option value="" disabled>
                                  Select Module
                              </option>
                              {sapModules.map((mod) => (
                                  <option
                                      key={mod.id}
                                      value={mod.id}
                                  >
                                      {mod.moduleName}
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
                              type="file"
                              id="image"
                              className="add_instructor_input"
                              accept="image/jpeg, image/jpg, image/gif, image/png, image/svg+xml" 
                              onChange={handleImageChange} 
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
                      {loading ? "Submit" : "Submit"}
                  </button>
              </form>
          </div>
      </div>
  );
};

export default AddCertificate;


//   const [selectedModule, setSelectedModule] = useState("");
//   const [sapModules, setSapModules] = useState([]);
//   const [certificateName, setCertificateName] = useState("");
//   const [level, setLevel] = useState("");
//   const [environment, setEnvironment] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null); // Change to store file object
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // Fetch SAP modules on mount
//   useEffect(() => {
//       const fetchSapModules = async () => {
//           try {
//               const response = await axios.get(
//                   "https://swdsapelearningapi.azurewebsites.net/api/SapModule/get-all"
//               );
//               setSapModules(response.data.$values);
//           } catch (error) {
//               console.error("Error fetching SAP Modules:", error);
//           }
//       };
//       fetchSapModules();
//   }, []);

//   const handleModuleChange = (event) => {
//       setSelectedModule(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//       event.preventDefault();

//       if (!selectedModule) {
//           setError("Please select a SAP Module.");
//           return;
//       }

//       // Create a FormData object to handle form data and file upload
//       const formData = new FormData();
//       formData.append("certificateName", certificateName);
//       formData.append("description", description);
//       formData.append("level", level);
//       formData.append("environment", environment);
//       formData.append("status", true);

//       // Append image file only if a file has been selected
//       if (image) {
//           formData.append("image", image);
//       }

//       // ModuleIds is expected to be an object with "$values" key for array format
//       formData.append("moduleIds.$values", [selectedModule]);

//       setLoading(true);
//       setError(null);

//       try {
//           const response = await axios.post(
//               "https://swdsapelearningapi.azurewebsites.net/api/Certificate/create",
//               formData,
//               { headers: { "Content-Type": "multipart/form-data" } }
//           );

//           if (response.status >= 200 && response.status < 300) {
//               alert("Certificate added successfully!");
//               navigate(PATH_NAME.CERTIFICATE);
//           }
//       } catch (error) {
//           console.error("Error adding certificate:", error);
//           setError("An error occurred while adding the certificate.");
//       } finally {
//           setLoading(false);
//       }
//   };

//   return (
//       <div className="add_certificate">
//           <div className="add_instructor_title_container">
//               <div className="add_instructor_title_left">
//                   <div className="add_instructor_title">Add Certificate</div>
//               </div>
//               <div className="add_instructor_instructor_right">
//                   <div className="add_instructor_instructor">Certificate</div>
//                   <SlArrowRight className="add_instructor_icon_right" />
//                   <div className="add_instructor_add_instructors">
//                       Add Certificate
//                   </div>
//               </div>
//           </div>

//           <div className="add_instructor_form_container">
//               <div className="add_instructor_label">Basic Info</div>
//               <form className="add_instructor_form" onSubmit={handleSubmit}>
//                   <div className="add_instructor_input_row">
//                       <div className="add_instructor_input_colum">
//                           <label>Name SAP Module</label>
//                           <select
//                               value={selectedModule}
//                               onChange={handleModuleChange}
//                           >
//                               <option value="" disabled>
//                                   Select Module
//                               </option>
//                               {sapModules.map((mod) => (
//                                   <option
//                                       key={mod.id}
//                                       value={mod.id}
//                                   >
//                                       {mod.moduleName}
//                                   </option>
//                               ))}
//                           </select>
//                       </div>
//                       <div className="add_instructor_input_colum">
//                           <label htmlFor="name_certificate">Name Certificate</label>
//                           <input
//                               type="text"
//                               id="name_certificate"
//                               className="add_instructor_input"
//                               placeholder="Enter name certificate"
//                               value={certificateName}
//                               onChange={(e) => setCertificateName(e.target.value)}
//                           />
//                       </div>
//                   </div>

//                   <div className="add_instructor_input_row">
//                       <div className="add_instructor_input_colum">
//                           <label htmlFor="level">Level</label>
//                           <input
//                               type="text"
//                               id="level"
//                               className="add_instructor_input"
//                               placeholder="Enter a level"
//                               value={level}
//                               onChange={(e) => setLevel(e.target.value)}
//                           />
//                       </div>
//                       <div className="add_instructor_input_colum">
//                           <label htmlFor="env">Environment</label>
//                           <input
//                               type="text"
//                               id="env"
//                               className="add_instructor_input"
//                               placeholder="Enter environment"
//                               value={environment}
//                               onChange={(e) => setEnvironment(e.target.value)}
//                           />
//                       </div>
//                   </div>

//                   <div className="add_instructor_input_row">
//                       <div className="add_instructor_input_colum">
//                           <label htmlFor="desc">Description</label>
//                           <input
//                               type="text"
//                               id="desc"
//                               className="add_instructor_input"
//                               placeholder="Enter description"
//                               value={description}
//                               onChange={(e) => setDescription(e.target.value)}
//                           />
//                       </div>
//                       <div className="add_instructor_input_colum">
//                           <label htmlFor="image">Image</label>
//                           <input
//                               type="file"
//                               id="image"
//                               className="add_instructor_input"
//                               onChange={(e) => setImage(e.target.files[0])} // Save the selected file
//                           />
//                       </div>
//                   </div>

//                   {error && <div className="error-message">{error}</div>}
//                   {success && <div className="success-message">{success}</div>}

//                   <button
//                       className="add_cert_button_submit"
//                       type="submit"
//                       disabled={loading}
//                   >
//                       {loading ? "Submitting..." : "Submit"}
//                   </button>
//               </form>
//           </div>
//       </div>
//   );
// };

// export default AddCertificate;