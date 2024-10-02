import React from "react";
import "./DashBoard.css";
import { PiUsersThree, PiGraduationCap, PiCoinsLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DashBoard = () => {
  const data = [
    {
      month: "Jan",
      study: 4000,
      test: 2400,
    },
    {
      month: "Feb",
      study: 3000,
      test: 1398,
    },
    {
      month: "Mar",
      study: 2000,
      test: 9800,
    },
    {
      month: "Apr",
      study: 2780,
      test: 3908,
    },
    {
      month: "May",
      study: 1890,
      test: 4800,
    },
    {
      month: "Jun",
      study: 2390,
      test: 3800,
    },
    {
      month: "Jul",
      study: 3490,
      test: 4300,
    },
    {
      month: "Aug",
      study: 4490,
      test: 3300,
    },
    {
      month: "Sep",
      study: 390,
      test: 300,
    },
    {
      month: "Oct",
      study: 590,
      test: 430,
    },
    {
      month: "Nov",
      study: 8490,
      test: 5300,
    },
    {
      month: "Dec",
      study: 4490,
      test: 400,
    },
  ];

  const data_2 = [
    {
      id: 1,
      name: "Working Design",
      instructor: "Đặng Văn A",
      s_date: "02/04/2024",
      e_date: "02/08/2024",
      enroll: "30/30",
      status: "Done",
    },
    {
      id: 2,
      name: "Project Manager",
      instructor: "Đặng Văn B",
      s_date: "02/10/2024",
      e_date: "02/12/2024",
      enroll: "30/30",
      status: "Ongoing",
    },
  ];

  return (
    <div className="dashboard">
      {/* Widget */}
      <div className="dashboard-widget-wrapper">
        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-1">
                <PiUsersThree />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">25</h4>
                <p className="dashboard-text">Total Students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-2">
                <BsPerson />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">5</h4>
                <p className="dashboard-text">New Students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-3">
                <PiGraduationCap />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">50</h4>
                <p className="dashboard-text">Total Courses</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-4">
                <PiCoinsLight />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">2156</h4>
                <p className="dashboard-text">Fee Collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-chart-calender">
        {/* Chart */}
        <div className="dashboard-chart">
          <div className="dashboard-chart-title">
            <h3>Study Statistics</h3>
            <div className="dashboard-note">
              <div className="dashboard-note-study">
                <span className="dashboard-point-blue"></span>
                <div className="dashboard-text-study">Study</div>
              </div>
              <div className="dashboard-note-test">
                <span className="dashboard-point-green"></span>
                <div className="dashboard-text-test">Test</div>
              </div>
            </div>
          </div>
          <AreaChart
            width={910}
            height={300}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="study"
              stroke="#1E88E5"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="test"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>

        {/* Calendar */}
        <div className="dashboard-calender">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
      </div>

      <div className="dashboard-table">
        <div className="dashboard-title">Courses</div>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableCell">S.No.</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Instructor</TableCell>
                <TableCell className="tableCell">Start Date</TableCell>
                <TableCell className="tableCell">End Date</TableCell>
                <TableCell className="tableCell">Enrollment</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data_2.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="tableCell">{data.id}</TableCell>
                  <TableCell className="tableCell">{data.name}</TableCell>
                  <TableCell className="tableCell">{data.instructor}</TableCell>
                  <TableCell className="tableCell">{data.s_date}</TableCell>
                  <TableCell className="tableCell">{data.e_date}</TableCell>
                  <TableCell className="tableCell">{data.enroll}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${data.status}`}>{data.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DashBoard;
