import { useEffect, useState } from "react";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";
import useAuth from "../../components/hooks/useAuth";
import Popup from "reactjs-popup";

// Set up moment localization
moment.locale("vi");
const localizer = momentLocalizer(moment);



const CalendarIns = () => {
  

  const { auth } = useAuth(); // Access logged-in user's data
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("https://swdsapelearningapi.azurewebsites.net/api/Instructor/get-all");
      return response.data.$values; // Trả về danh sách giảng viên
    } catch (error) {
      console.error("Error fetching instructors:", error);
      return [];
    }
  };


  const fetchInstructorSessions = async (instructorId) => {
    try {
      const response = await axios.get("https://swdsapelearningapi.azurewebsites.net/api/CourseSession/get-all");
      const sessions = response.data.$values.filter(session => session.instructorId === instructorId);
      const evn = sessions.map(session => ({
        id: session.id,
        title: session.sessionName,
        start: new Date(session.sessionDate),
        end: new Date(session.sessionDate),
        description: session.sessionDescription,
        startTime: session.startTime,
        endTime: session.endTime,
        course: session.courseName,
      }));
      console.log(evn);
      return evn;
    } catch (error) {
      console.error("Error fetching instructor sessions:", error);
      return [];
    }
  };

  const fetchData = async () => {
    const instructors = await fetchInstructors(); // Lấy tất cả giảng viên
    const currentInstructor = instructors.find(inst => inst.userId === auth.userId); // Tìm giảng viên dựa trên userId
    if (currentInstructor) {
      const sessions = await fetchInstructorSessions(currentInstructor.id); // Lấy phiên học cho giảng viên hiện tại
  
      if (sessions.length > 0) {
        // Nếu API trả về dữ liệu mới, lưu vào state và localStorage
        setEventsData(sessions);
        localStorage.setItem("eventsData", JSON.stringify(sessions));
      } else {
        // Nếu API không có dữ liệu, xóa localStorage và hiển thị thông báo lỗi
        localStorage.removeItem("eventsData");
        setEventsData([]); // Xóa dữ liệu trong state
        console.error("No data found for the current instructor.");
      }
    }
  };

  useEffect(() => {
    console.log("Auth data on component load:", auth);
  
  const storedEvents = localStorage.getItem("eventsData");
  if (storedEvents) {
    setEventsData(JSON.parse(storedEvents));
  } else if (auth && auth.userId) {
    fetchData();
  }
}, [auth]);
  
  const handleEventClick = (event) => {
    console.log(event)
    setSelectedEvent(event); // Lưu sự kiện đã chọn vào state
  };


  return (
    <div className="calendar">
    <div className="course_title_container">
        <div className="course_title_left">
          <div className="course_title">Calendar</div>
        </div>
        <div className="course_course_right">
          <div className="course_course">Calendar</div>
          <SlArrowRight className="course_icon_right" />
          <div className="course_all_courses">Calendar</div>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          views={["month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "100vh" }}
          onSelectEvent={handleEventClick} 
          
          
        />
      </div>
      <Popup open={selectedEvent !== null} onClose={() => setSelectedEvent(null)}>
        <div className="popup-content-1">
          {selectedEvent && (
            <>
              <h3>{selectedEvent.title}</h3>
              <p><strong>Course:</strong> {selectedEvent.course}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Date:</strong> {moment(selectedEvent.start).format('dddd, DD/MM/YYYY')}</p>
              <p><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
              <div className="popup_button_1">
              <button onClick={() => setSelectedEvent(null)}>Close</button>
              </div>
            </>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default CalendarIns;
