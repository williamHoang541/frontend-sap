import React, { PureComponent } from "react";
import "./Analytic.css";
import { PiUsersThree, PiGraduationCap, PiCoinsLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
const Analytic = () => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className="analytic">
            {/* Widget */}
            <div className="dashboard-widget-wrapper">
                <div className="dashboard-widget">
                    <div className="dashboard-widget-card">
                        <div className="dashboard-widget-card-body">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="pv"
                                        stackId="a"
                                        fill="#8884d8"
                                    />
                                    <Bar
                                        dataKey="uv"
                                        stackId="a"
                                        fill="#82ca9d"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
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
        </div>
    );
};

export default Analytic;
