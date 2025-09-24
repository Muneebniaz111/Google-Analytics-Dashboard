# 📊 Google Analytics Dashboard (React.js)

A **modern analytics dashboard UI** built with **React.js**.
It provides a clean interface for visualizing key website performance metrics such as **visits, bounce rate, session duration, traffic sources, devices, demographics, and social media insights**.

Currently, the data is **static (mock JSON/state)** but the project can be easily extended to fetch data from a **backend API** or directly from the **Google Analytics API**.

---

## 🚀 Features

* **Website Performance Overview**

  * Total Visits & Unique Visitors
  * Bounce Rate & Conversion Rate
  * Avg. Session Duration & Pages per Session

* **Data Visualizations**

  * Overview Graph (Page Views, Sessions, Users over time)
  * Traffic Sources (Google, Direct, Bing, etc.)
  * Device Breakdown (Desktop, Mobile, Tablet)
  * Social Media Insights (Facebook, Twitter, LinkedIn, etc.)
  * Demographics (Age, Gender, Location)
  * New vs Returning Visitors

* **UI Components**

  * Sidebar Navigation (Dashboard, Traffic Analysis, Reports, Settings)
  * Metric Cards with highlights
  * Interactive charts using **Recharts / Chart.js**

---

## ⚙️ Tech Stack

* **React.js** → Frontend framework
* **JavaScript (ES6+)** → Application logic
* **HTML5 & CSS3** → Structure & styling
* **Recharts / Chart.js** → Data visualization
* **Static JSON / State Data** → Mock analytics data (no backend yet)

---

## 📂 Project Structure
src/
├── assets/        # Icons, images, logos
├── components/    # Reusable UI components (Cards, Charts, Sidebar, etc.)
├── pages/         # Dashboard and additional views
├── App.js         # Root app component
├── index.js       # Application entry point


---

## 🛠️ Installation & Setup

# Install dependencies
npm install

# Start development server
npm start
