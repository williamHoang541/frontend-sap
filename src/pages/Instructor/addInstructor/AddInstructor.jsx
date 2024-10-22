import { useState } from "react";
import "./AddInstructor.css";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATH_NAME } from "../../../constant/pathname";

const AddInstructor = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn reload trang

    const instructorData = {
      username: username,
      password: password,
      email: email,
      fullname: fullName,
      education: education,
      phoneNumber: phoneNumber,
      gender: selectedGender,
    };

    try {
      const response = await axios.post(
        `https://swdsapelearningapi.azurewebsites.net/api/User/create-instructor`,
        instructorData
      );

      if (response.status === 200) {
        // Chuyển hướng hoặc thông báo thành công
        alert('Instructor added successfully');
        navigate(PATH_NAME.INSTRUCTOR); // Chuyển hướng về danh sách instructors
      }
    } catch (error) {
      console.error('Error adding instructor:', error);
      alert('Failed to add instructor');
    }
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
        <form className="add_instructor_form" onSubmit={handleSubmit}>
          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="add_instructor_input"
                placeholder="Enter the full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="add_instructor_input"
                placeholder="Enter the email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                className="add_instructor_input"
                placeholder="Enter the user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="add_instructor_input_colum">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="add_instructor_input"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add_instructor_input_row">
            <div className="add_instructor_input_colum">
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                className="add_instructor_input"
                placeholder="Enter the phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="add_instructor_input_colum">
              <label>Gender</label>
              <select value={selectedGender} onChange={handleChange} required>
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
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                className="add_instructor_input"
                placeholder="Enter the education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
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

export default AddInstructor;