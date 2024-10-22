import React, { PureComponent } from "react";
import "./Analytic.css";
import { PiUsersThree, PiGraduationCap, PiCoinsLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import {
    Area,
    ComposedChart,
    BarChart,
    Bar,
    LineChart,
    Line,
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
            <div className="analytic-widget-wrapper">
                <div className="analytic-widget">
                    <div className="analytic-widget-card">
                        <div className="analytic-widget-card-body">
                            <div className="txt">
                                <h2 class="mb-2">839</h2>
                                <p>Subscribers</p>
                            </div>
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
                                    <Tooltip />
                                    <XAxis dataKey="name" />
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
                <div className="analytic-widget">
                    <div className="analytic-widget-card">
                        <div className="analytic-widget-card-body">
                            <div className="txt">
                                <h2 class="mb-2">950</h2>
                                <p>Weekly Visitors</p>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart width={300} height={100} data={data}>
                                    <Line
                                        type="monotone"
                                        dataKey="pv"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#82ca9d"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="analytic-widget">
                    <div className="analytic-widget-card">
                        <div className="analytic-widget-card-body">
                            <div className="txt">
                                <h2 class="mb-2">20</h2>
                                <p>Weekly Sales</p>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    width={500}
                                    height={500}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="amt"
                                        fill="#8884d8"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#ff7300"
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-md-12">
                    <div className="card card-default analysis_card p-0">
                        <div className="card-header">
                            <h2>Sales Of The Year</h2>
                        </div>
                        <div className="card-body" style={{ height: "450px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 5,
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
                                    <Line
                                        type="monotone"
                                        dataKey="pv"
                                        stroke="#F95454"
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card card-default analysis_card p-0">
                        <div className="card-header">
                            <h2>User Activity</h2>
                        </div>
                        <div className="card-body" style={{ height: "450px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 5,
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
                                    <Line
                                        type="monotone"
                                        dataKey="pv"
                                        stroke="#EC8305"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#77CDFF"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card card-default analysis_card p-0">
                        <div className="card-header">
                            <h2>Online/Offline Users</h2>
                        </div>
                        <div className="card-body" style={{ height: "450px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
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
            </div>
        </div>
    );
};

export default Analytic;
