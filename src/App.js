import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";


import {
  // Line Charts
  LineChart, Line,
  // Axes & Grid
  XAxis, YAxis, CartesianGrid,
  // UI Helpers
  Tooltip, Legend, ResponsiveContainer,
  // Bar Charts
  BarChart, Bar, LabelList,
  // Pie / Donut Charts
  PieChart, Pie, Cell,
} from "recharts";

/* ===== Website Overview Data ===== */
const data = [
  { month: "May", pageViews: 1250, sessions: 1000, users: 2500 },
  { month: "Jun", pageViews: 5000, sessions: 2750, users: 4000 },
  { month: "Jul", pageViews: 5000, sessions: 2500, users: 6000 },
  { month: "Aug", pageViews: 3500, sessions: 5500, users: 5000 },
  { month: "Sep", pageViews: 7750, sessions: 5000, users: 7000 },
  { month: "Oct", pageViews: 7750, sessions: 5000, users: 11000 },
  { month: "Nov", pageViews: 9750, sessions: 3000, users: 8000 },
  { month: "Dec", pageViews: 9500, sessions: 3500, users: 5500 },
  { month: "Jan", pageViews: 12200, sessions: 5500, users: 13000 },
  { month: "Feb", pageViews: 8750, sessions: 6500, users: 10500 },
  { month: "Mar", pageViews: 7950, sessions: 2500, users: 11750 },
  { month: "Apr", pageViews: 12550, sessions: 8500, users: 14000 },
];
const COLOR = {
  pageViews: "rgba(0, 186, 52, 1)",
  sessions: "rgba(249, 134, 0, 1)",
  users: "rgba(109, 73, 233, 1)",
  bar: "rgba(109, 73, 233, 1)",
};

/* ===== Traffic Sources Data ===== */
const trafficSources = [
  { source: "Google", sessions: 6860, change: -6 },
  { source: "(Direct)", sessions: 4760, change: -6 },
  { source: "neltapa.com", sessions: 406, change: -11 },
  { source: "Bydriptop.com", sessions: 271, change: 158 },
  { source: "Bing", sessions: 152, change: 9 },
];

const COLORS = {
  positive: "rgba(47, 188, 47, 1)",
  negative: "rgba(188, 47, 47, 1)",
  bar: "rgba(109, 73, 233, 1)",
};

/* ===== Demographics Data ===== */
const demographicsData = [
  { month: "May", groupA: 12, groupB: 10 },
  { month: "Jun", groupA: 25, groupB: 18 },
  { month: "Jul", groupA: 20, groupB: 16 },
  { month: "Aug", groupA: 16, groupB: 12 },
];

/* ===== Devices Data ===== */
const totalUsers = 5321;
const devicesData = [
  { name: "Desktop", value: 4078, color: "rgba(109, 73, 233, 1)", percentage: ((4078 / totalUsers) * 100).toFixed(2) },
  { name: "Mobile", value: 1149, color: "rgba(0, 186, 52, 1)", percentage: ((1149 / totalUsers) * 100).toFixed(2) },
  { name: "Tablet", value: 150, color: "rgba(249, 134, 0, 1)", percentage: ((150 / totalUsers) * 100).toFixed(2) },
];

/* ===== Social Networks Data ===== */
const socialNetworksData = [
  { name: "Twitter", value: 400, color: "rgba(109, 73, 233, 1)" },
  { name: "Quora", value: 61, color: "rgba(0, 186, 52, 1)" },
  { name: "Facebook", value: 30, color: "rgba(186, 50, 0, 1)" },
  { name: "LinkedIn", value: 25, color: "rgba(249, 134, 0, 1)" },
  { name: "Google", value: 19, color: "rgba(186, 0, 81, 1)" },
];
const totalSocialUsers = socialNetworksData.reduce((acc, item) => acc + item.value, 0);

/* ===== New vs Returning Data ===== */
const newReturningData = [
  { name: "New", value: 4649 , color: "rgba(109, 73, 233, 1)" },
  { name: "Returning", value: 1412, color: "rgba(0, 186, 52, 1)" },
];
const totalNewReturning = newReturningData.reduce((acc, item) => acc + item.value, 0);

/* ===== Sidebar Component ===== */
const Sidebar = () => (
  <aside className="sidebar">
    {/* Logo */}
    <div className="logo">
      <img src="/Frame.png" alt="Logo Icon" className="logo-icon" />
      <span>SitePulse</span>
    </div>

    {/* Navigation */}
    <nav>
      {/* Overview Section */}
      <p className="section-title">Overview and Insights</p>
      <ul>
        <li className="active">
          <i className="fas fa-table-cells-large"></i> Dashboard
        </li>
        <li>
          <i className="fas fa-image"></i> Traffic Analysis
        </li>
        <li>
          <i className="fas fa-user"></i> User Behavior
        </li>
        <li>
          <i className="fas fa-users"></i> Audience Insights
        </li>
      </ul>

      {/* Performance Section */}
      <p className="section-title">Performance and Reporting</p>
      <ul>
        <li>
          <i className="fas fa-link"></i> Conversions
        </li>
        <li>
          <i className="fas fa-signal"></i> Real-Time Data
        </li>
        <li>
          <i className="fas fa-file-alt"></i> Reports
        </li>
        <li>
          <i className="fas fa-info-circle"></i> Alerts
        </li>
      </ul>

      {/* Settings Section */}
      <p className="section-title">Settings and Support</p>
      <ul>
        <li>
          <i className="fas fa-cog"></i> Settings
        </li>
        <li>
          <i className="fas fa-headphones"></i> Help
        </li>
        <li>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </nav>
  </aside>
);

/* ===== TopBar Component ===== */
const TopBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //  Notification state
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCalendarOpen(false);
  };

  // Quick range button handler
  const setQuickRange = (type) => {
    const today = new Date();
    let start, end;

    switch (type) {
      case "today":
        start = end = today;
        break;
      case "yesterday":
        start = end = new Date(today.setDate(today.getDate() - 1));
        break;
      case "week":
        end = new Date();
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;
      case "month":
        end = new Date();
        start = new Date();
        start.setMonth(start.getMonth() - 1);
        break;
      case "year":
        end = new Date();
        start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        break;
      case "reset":
        start = end = null;
        break;
      default:
        start = end = null;
    }

    setStartDate(start);
    setEndDate(end);
  };

  //  Simulate new notification
  const addNotification = () => {
    setNotificationCount((prev) => prev + 1);
  };

  return (
    <header className="topbar">
      {/* Search Box */}
<div className="search-box">
  <img src="/Vector9.png" alt="Search Icon" className="search-icon" />
  <input type="text" placeholder="Search..." />
</div>

      {/* Right Side */}
      <div className="topbar-right">
        {/* Calendar */}
        <div className="calendar-wrapper" style={{ position: "relative" }}>
          <div
            className="calendar-dropdown"
            onClick={toggleCalendar}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img
              src="/Group1.png"
              alt="Calendar Icon"
              className="calendar-icon"
            />
            <span>
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : "Monthly"}
            </span>
            <i
              className={`fas fa-chevron-${isCalendarOpen ? "up" : "down"}`}
            ></i>
          </div>

          {isCalendarOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 10,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "fit-content",
              }}
            >
              {/* Start & End Selector */}
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
              >
                <div className="date-box">
                  <p className="date-title">Start</p>
                  <p className="date-subtitle">
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Please select"}
                  </p>
                </div>
                <div className="date-box">
                  <p className="date-title">End</p>
                  <p className="date-subtitle">
                    {endDate ? endDate.toLocaleDateString() : "Please select"}
                  </p>
                </div>
              </div>

              {/* Date Range Picker */}
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />

              {/* Quick Range Buttons */}
              <div className="quick-range-buttons">
                <button onClick={() => setQuickRange("today")}>Today</button>
                <button onClick={() => setQuickRange("yesterday")}>
                  Yesterday
                </button>
                <button onClick={() => setQuickRange("week")}>One Week</button>
                <button onClick={() => setQuickRange("month")}>One Month</button>
                <button onClick={() => setQuickRange("year")}>One Year</button>
                <button onClick={() => setQuickRange("reset")}>Reset</button>
              </div>
            </div>
          )}
        </div>

        {/*  Notifications */}
        <div className="icon-container" style={{ position: "relative" }}>
          <img
            src="/Group.png"
            alt="Bell Icon"
            className="bell-icon"
            onClick={addNotification} 
            style={{ cursor: "pointer" }}
          />
          {notificationCount > 0 && (
            <span
              style={{
                weight:"12px",
                height:"16px",
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "rgba(47, 188, 47, 1)",
                color: "rgba(255, 255, 255, 1)",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "8px",
                fontWeight: "400",
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* Profile Section */}
        <div className="profile-container" style={{ position: "relative" }}>
          <div className="profile-box" onClick={toggleProfile}>
            <img src="my.jpg" alt="Profile" className="profile-img" />
            <div>
              <p className="profile-name">Muneeb Niaz</p>
              <p className="profile-role">Manager</p>
            </div>
            <i
              className={`fas fa-chevron-${isProfileOpen ? "up" : "down"}`}
            ></i>
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <p>
                <strong>Name:</strong> Muneeb Niaz
              </p>
              <p>
                <strong>Role:</strong> Manager
              </p>
              <p>
                <strong>Email:</strong> muneeb122@example.com
              </p>
              <p>
                <strong>Phone:</strong> +92 (333) 123-4567
              </p>
              <button className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ===== SecBar Component ===== */
const SecondBar = ({ onMetricSelect }) => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [showMetrics, setShowMetrics] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("Key Metrics");

  const [showDimensions, setShowDimensions] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState("Dimensions");

  const [hoverTrafficSource, setHoverTrafficSource] = useState(false);

  // rotation states for Clear All and Refresh icons
  const [rotateClear, setRotateClear] = useState(false);
  const [rotateRefresh, setRotateRefresh] = useState(false);

  // Format date/time
  const formatDateTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  // Refresh
  const handleRefresh = () => {
    setLastRefreshed(new Date());

    // trigger rotation
    setRotateRefresh(true);
    setTimeout(() => setRotateRefresh(false), 600);
  };

  // Select metric
  const handleSelectMetric = (metric) => {
    setSelectedMetric(metric);
    setShowMetrics(false);

    if (onMetricSelect) {
      onMetricSelect(metric);
    }
  };

  // Select dimension
  const handleSelectDimension = (dimension) => {
    setSelectedDimension(dimension);
    setShowDimensions(false);
  };

  // Select traffic source option
  const handleSelectTrafficSource = (option) => {
    setSelectedDimension(option);
    setShowDimensions(false);
    setHoverTrafficSource(false);
  };

  // 🔹 Clear All Functionality
  const handleClearAll = () => {
    setSelectedDimension("Dimensions");
    setSelectedMetric("Key Metrics");
    handleRefresh(); // refresh call

    // trigger rotation
    setRotateClear(true);
    setTimeout(() => setRotateClear(false), 600);
  };

  return (
    <header className="secbar">
      {/* Left Section */}
      <div className="logo1">
        <span>Dashboard</span>
      </div>

      {/* Right Section */}
      <div className="logo2">
        <span>Last Refreshed: {formatDateTime(lastRefreshed)}</span>

        {/* Refresh */}
        <div
          className="refresh"
          onClick={handleRefresh}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/Vector.png"
            alt="Refresh Icon"
            className={`refresh-icon ${rotateRefresh ? "rotate" : ""}`}
          />
        </div>

        {/* Clear All */}
        <div className="clear" onClick={handleClearAll}>
          <img
            src="/Vector1.png"
            alt="Clear Icon"
            className={`clear-icon ${rotateClear ? "rotate" : ""}`}
          />
          <span className="clear-text">Clear All</span>
        </div>

        {/* Dimensions Dropdown */}
        <div
          className="dim"
          onClick={() => setShowDimensions(!showDimensions)}
        >
          <img src="/Vector2.png" alt="Dimensions Icon" className="dim-icon" />
          <span className="dim-text">{selectedDimension}</span>
          <i className="fas fa-chevron-down"></i>

          {showDimensions && (
            <div className="dimensions-dropdown">
              {["Dimensions", "Traffic Source", "Device", "Geography"].map(
                (dimension) => (
                  <div
                    key={dimension}
                    className={selectedDimension === dimension ? "active" : ""}
                    onClick={() =>
                      dimension !== "Traffic Source" &&
                      handleSelectDimension(dimension)
                    }
                    onMouseEnter={() =>
                      dimension === "Traffic Source" &&
                      setHoverTrafficSource(true)
                    }
                    onMouseLeave={() =>
                      dimension === "Traffic Source" &&
                      setHoverTrafficSource(false)
                    }
                  >
                    {dimension}

                    {/* Nested dropdown for Traffic Source (hover) */}
                    {dimension === "Traffic Source" && hoverTrafficSource && (
                      <div className="nested-dropdown">
                        {["Organic", "Inorganic"].map((option) => (
                          <div
                            key={option}
                            className={
                              selectedDimension === option ? "active" : ""
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTrafficSource(option);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Key Metrics Dropdown */}
        <div
          className="key-metrics"
          onClick={() => setShowMetrics(!showMetrics)}
        >
          <span className="km-text">{selectedMetric}</span>
          <i className="fas fa-chevron-down"></i>

          {showMetrics && (
            <div className="metrics-dropdown">
              {[
                "Key Metrics",
                "Total Visits",
                "Unique Visitor",
                "Bounce Rate",
                "Avg Sessions Duration",
                "Pages/Session",
                "Conversion Rate",
              ].map((metric) => (
                <div
                  key={metric}
                  className={selectedMetric === metric ? "active" : ""}
                  onClick={() => handleSelectMetric(metric)}
                >
                  {metric}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ===== ThirdBar Component ===== */
const ThirdBar = () => (
  <header className="thirdbar">
    
    {/* 1 - Total Visits Card */}
    <div className="totalvisit-card">
      <div className="totalvisit-header">
        <span className="totalvisit-title">Total Visits</span>
        <img src="/Vector4.png" alt="Users" className="totalvisit-icon" />
      </div>
      <div className="totalvisit-value">
        541 <span className="totalvisit-growth">+8.21%</span>
      </div>
      <div className="totalvisit-footer">
        <span className="totalvisit-subtitle">Previous Month</span>
        <span className="totalvisit-previous">(500)</span>
      </div>
    </div>

    {/* 2 - Unique Visitors Card */}
    <div className="uniquevisitors-card">
      <div className="uniquevisitors-header">
        <span className="uniquevisitors-title">Unique Visitors</span>
        <img src="/Vector5.png" alt="Users" className="uniquevisitors-icon" />
      </div>
      <div className="uniquevisitors-value">
        389 <span className="uniquevisitors-growth">-2.81%</span>
      </div>
      <div className="uniquevisitors-footer">
        <span className="uniquevisitors-subtitle">Previous Month</span>
        <span className="uniquevisitors-previous">(400)</span>
      </div>
    </div>

    {/* 3 - Bounce Rate Card */}
    <div className="bouncerate-card">
      <div className="bouncerate-header">
        <span className="bouncerate-title">Bounce Rate</span>
        <img src="/Vector6.png" alt="Users" className="bouncerate-icon" />
      </div>
      <div className="bouncerate-value">
        13.5% <span className="bouncerate-growth">+6.21%</span>
      </div>
      <div className="bouncerate-footer">
        <span className="bouncerate-subtitle">Previous Month</span>
        <span className="bouncerate-previous">(10%)</span>
      </div>
    </div>
    
    {/* 4 - Avg Session Duration Card */}
    <div className="asd-card">
      <div className="asd-header">
        <span className="asd-title">Avg Session Duration</span>
        <img src="/Vector7.png" alt="Users" className="asd-icon" />
      </div>
      <div className="asd-value">
        2.67 Mins <span className="asd-growth">+6.21%</span>
      </div>
      <div className="asd-footer">
        <span className="asd-subtitle">Previous Month</span>
        <span className="asd-previous">(1.82 Mins)</span>
      </div>
    </div>
        
    {/* 5 - Pages/Session Card */}
    <div className="ps-card">
      <div className="ps-header">
        <span className="ps-title">Pages/Session</span>
        <img src="/Vector8.png" alt="Users" className="ps-icon" />
      </div>
      <div className="ps-value">
        03 <span className="ps-growth">-20.81%</span>
      </div>
      <div className="ps-footer">
        <span className="ps-subtitle">Previous Month</span>
        <span className="ps-previous">(05)</span>
      </div>
    </div>
            
    {/* 6 - Conversion Rate Card */}
    <div className="conrate-card">
      <div className="conrate-header">
        <span className="conrate-title">Conversion Rate</span>
        <img src="/Vector8.png" alt="Users" className="conrate-icon" />
      </div>
      <div className="conrate-value">
        541 <span className="conrate-growth">-10.81%</span>
      </div>
      <div className="conrate-footer">
        <span className="conrate-subtitle">Previous Month</span>
        <span className="conrate-previous">(600)</span>
      </div>
    </div>

  </header>
);

/* ===== FourthBar Component ===== */
const FourthBar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMonths, setShowMonths] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("Monthly");

    //  Clear All Function
  const handleClearAll = () => {
    setSelectedMetric("all");
    setSelectedMonth("Monthly");
    setShowFilter(false);
    setShowMonths(false);
  };

  // Filter dataset based on selected month
  const filteredData =
    selectedMonth === "Monthly"
      ? data
      : data.filter((item) => item.month === selectedMonth);

  const handleSelectMetric = (metric) => {
    setSelectedMetric(metric);
    setShowFilter(false);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonths(false);
  };

  const months = [
    "Monthly",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <header className="fourthbar">
      {/* Website Overview Card */}
      <div className="weboverview-card">
        {/* Header */}
        <div className="weboverview-header">
          <span className="weboverview-title">Website Overview</span>
          <div className="weboverview-actions">

            {/* Clear All */}
            <div className="clear-btn" onClick={handleClearAll} style={{ cursor: "pointer" }}>
              <img src="/Vector1.png" alt="Clear Icon" className="clear-icon" />
              <span className="clear-text">Clear All</span>
            </div>

            {/* Filter Button */}
            <div className="filter-container">
              <button
                className="filter-btn"
                onClick={() => setShowFilter(!showFilter)}
              >
                <i className="fas fa-filter"></i> Filter
              </button>
              {showFilter && (
                <div className="filter-dropdown">
                  <div onClick={() => handleSelectMetric("all")}>All</div>
                  <div onClick={() => handleSelectMetric("pageViews")}>
                    Page Views
                  </div>
                  <div onClick={() => handleSelectMetric("sessions")}>
                    Sessions
                  </div>
                  <div onClick={() => handleSelectMetric("users")}>Users</div>
                </div>
              )}
            </div>

            {/* Month Selector */}
            <div className="mode-container">
              <button
                className="monthly-btn"
                onClick={() => setShowMonths(!showMonths)}
              >
                {selectedMonth} <i className="fas fa-chevron-down"></i>
              </button>
              {showMonths && (
                <div className="mode-dropdown">
                  {months.map((m) => (
                    <div key={m} onClick={() => handleSelectMonth(m)}>
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="weboverview-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 15000]} />
              <Tooltip />
              <Legend />
              {(selectedMetric === "all" || selectedMetric === "pageViews") && (
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke={COLOR.pageViews}
                  strokeWidth={3}
                  dot={false}
                  name="Page Views"
                />
              )}
              {(selectedMetric === "all" || selectedMetric === "sessions") && (
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke={COLOR.sessions}
                  strokeWidth={3}
                  dot={false}
                  name="Sessions"
                />
              )}
              {(selectedMetric === "all" || selectedMetric === "users") && (
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke={COLOR.users}
                  strokeWidth={3}
                  dot={false}
                  name="Users"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* 2- Website Traffic Sources Card */}
      <div className="traffic-card">
        <div className="traffic-header">
          <span className="traffic-title">Website Traffic Sources</span>
        </div>
        <div className="traffic-headings">
          <span className="heading-source">Source</span>
          <span className="heading-session">Session</span>
        </div>
        <div className="traffic-table">
          {trafficSources.map((item, index) => (
            <div key={index} className="traffic-row">
              <span className="traffic-source">
                {index + 1}. {item.source}
              </span>
              <span className="traffic-sessions">{item.sessions}</span>
              <span
                className={`traffic-change ${
                  item.change >= 0 ? "positive" : "negative"
                }`}
              >
                {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
              </span>
              <div className="traffic-bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(item.sessions / 7000) * 100}%`,
                    backgroundColor: COLORS.bar,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

/* ===== FifthBar Component ===== */
const FifthBar = () => {
  // Local states for hover in Cards 2,3,4
  const [hoverDeviceValue, setHoverDeviceValue] = useState(null);
  const [hoverSocialValue, setHoverSocialValue] = useState(null);
  const [hoverNewReturnValue, setHoverNewReturnValue] = useState(null);

  return (
    <header className="fifthbar">
      {/* 1- Demographics Card */}
      <div className="demographics-card">
        <div className="demo-header">
          <span className="demo-title">Demographics</span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={demographicsData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            barGap={12}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />

            <Bar
              dataKey="groupA"
              fill="rgba(109, 73, 233, 1)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList dataKey="groupA" position="top" fontSize={12} />
            <Bar
              dataKey="groupB"
              fill="rgba(0, 186, 52, 1)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList dataKey="groupB" position="top" fontSize={12} />
              </Bar>
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="demo-legend">
          <div className="legend-item">
            <span className="legend-line purple"></span>
            <span className="legend-text">Bounce rate</span>
          </div>
          <div className="legend-item">
            <span className="legend-line green"></span>
            <span className="legend-text">Conversions</span>
          </div>
        </div>
      </div>

      {/* 2- Devices Card */}
      <div className="devices-card">
        <div className="devices-header">
          <span className="devices-title">Devices</span>
        </div>

        <div className="devices-content">
          <div className="devices-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devicesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {devicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="chart-center-label">
              <div className="title">Total</div>
              <div className="total">
                {hoverDeviceValue
                  ? hoverDeviceValue.toLocaleString()
                  : totalUsers.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="devices-breakdown">
            {devicesData.map((item, index) => {
              const percentage = ((item.value / totalUsers) * 100).toFixed(1);
              return (
                <div
                  className="device-item"
                  key={index}
                  onMouseEnter={() => setHoverDeviceValue(item.value)}
                  onMouseLeave={() => setHoverDeviceValue(null)}
                >
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="label">
                    {item.name}:{" "}
                    <span className="value">
                      {item.value.toLocaleString()} / {percentage}%
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3- Social Networks Card */}
      <div className="social-card">
        <div className="social-header">
          <span className="social-title">Social Networks</span>
        </div>

        <div className="social-content">
          <div className="social-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={socialNetworksData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {socialNetworksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="chart-center-label">
              <div className="title">Total</div>
              <div className="total">
                {hoverSocialValue
                  ? hoverSocialValue.toLocaleString()
                  : totalSocialUsers.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="social-breakdown">
            {socialNetworksData.map((item, index) => {
              const percentage = ((item.value / totalSocialUsers) * 100).toFixed(
                2
              );
              return (
                <div
                  className="social-item"
                  key={index}
                  onMouseEnter={() => setHoverSocialValue(item.value)}
                  onMouseLeave={() => setHoverSocialValue(null)}
                >
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="label">
                    {item.name}:{" "}
                    <span className="value">
                      {item.value.toLocaleString()} / {percentage}%
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4- New vs Returning Card */}
      <div className="newreturn-card">
        <div className="newreturn-header">
          <span className="newreturn-title">New vs Returning</span>
        </div>

        <div className="newreturn-content">
          <div className="newreturn-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={newReturningData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {newReturningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="chart-center-label">
              <div className="title">Total</div>
              <div className="total">
                {hoverNewReturnValue
                  ? hoverNewReturnValue.toLocaleString()
                  : totalNewReturning.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="newreturn-breakdown">
            {newReturningData.map((item, index) => {
              const percentage = (
                (item.value / totalNewReturning) *
                100
              ).toFixed(0);
              return (
                <div
                  className="newreturn-item"
                  key={index}
                  onMouseEnter={() => setHoverNewReturnValue(item.value)}
                  onMouseLeave={() => setHoverNewReturnValue(null)}
                >
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="label">
                    {item.name}:{" "}
                    <span className="value">
                      {item.value.toLocaleString()} / {percentage}%
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

/* ===== App Component ===== */
export default function App() {
  return (
    <div className="app">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="main">
        {/* Top Section */}
        <TopBar />

        {/* Secondary Header Bar */}
        <SecondBar />

        {/* Additional Sections */}
        <ThirdBar />
        <FourthBar />
        <FifthBar />
      </main>
    </div>
  );
}

