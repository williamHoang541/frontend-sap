import React from "react";
import "./AllCourse.css";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { FaPen, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaT } from "react-icons/fa6";

const AllCourse = () => {
    const data_1 = [
        {
            course_id: 1,
            course_name: "Introduction to SAP",
            start_date: "2024-10-15",
            end_date: "2024-12-15",
            mode: "Online",
            price: 150.0,
            total_student: 30,
            end_register_date: "2024-10-10",
            location_url: "https://meet.google.com/xyz-abc-101",
            status: "Available",
        },
        {
            course_id: 2,
            course_name: "Advanced ABAP Programming",
            start_date: "2024-11-01",
            end_date: "2025-01-01",
            mode: "Offline",
            price: 300.0,
            total_student: 20,
            end_register_date: "2024-10-28",
            location_url: "123 SAP Blvd, NY",
            status: "Expired",
        },
        {
            course_id: 3,
            course_name: "SAP S/4HANA Overview",
            start_date: "2024-10-20",
            end_date: "2024-11-20",
            mode: "Online",
            price: 200.0,
            total_student: 50,
            end_register_date: "2024-10-18",
            location_url: "https://meet.google.com/xyz-abc-103",
            status: "Available",
        },
        {
            course_id: 4,
            course_name: "SAP Fiori Development",
            start_date: "2024-12-01",
            end_date: "2025-02-01",
            mode: "Offline",
            price: 350.0,
            total_student: 25,
            end_register_date: "2024-11-28",
            location_url: "456 Tech St, SF",
            status: "Available",
        },
        {
            course_id: 5,
            course_name: "SAP CAP Model Workshop",
            start_date: "2024-09-30",
            end_date: "2024-10-30",
            mode: "Online",
            price: 250.0,
            total_student: 40,
            end_register_date: "2024-09-28",
            location_url: "https://meet.google.com/xyz-abc-105",
            status: "Expired",
        },
    ];

    return (
        <div className="all-course">
            <div className="all-course-header">All Courses</div>
            <div className="all-course-table">
                <div className="all-course-title">All Courses List</div>
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell className="tableCell">No.</TableCell>
                                <TableCell className="tableCell">
                                    Course name
                                </TableCell>
                                <TableCell className="tableCell">
                                    Start Date
                                </TableCell>
                                <TableCell className="tableCell">
                                    End Date
                                </TableCell>
                                <TableCell className="tableCell">
                                    Mode
                                </TableCell>
                                <TableCell className="tableCell">
                                    Price
                                </TableCell>
                                <TableCell className="tableCell">
                                    Total Student
                                </TableCell>
                                <TableCell className="tableCell">
                                    End Register Date
                                </TableCell>
                                <TableCell className="tableCell">
                                    Location
                                </TableCell>
                                <TableCell className="tableCell">
                                    Status
                                </TableCell>
                                <TableCell className="tableCell">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data_1.map((data) => (
                                <TableRow key={data.course_id}>
                                    <TableCell className="tableCell">
                                        {data.course_id}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.course_name}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.start_date}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.end_date}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.mode}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.price}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.total_student}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.end_register_date}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        {data.location_url}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        <span
                                            className={`status ${data.status}`}
                                        >
                                            {data.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                        <Link
                                            // to="/course/edit-course"
                                            className="edit-btn"
                                        >
                                            <FaPen />
                                        </Link>
                                        <Link className="delete-btn">
                                            <FaTrash />
                                        </Link>
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

export default AllCourse;
