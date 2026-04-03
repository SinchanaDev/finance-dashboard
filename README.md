<<<<<<< HEAD
# FinTrack — Finance Dashboard

A clean, interactive and intelligent finance dashboard built with React + Vite.

## Live Demo
[https://fintrack-dashboard-rho.vercel.app/]

## Repository
[https://github.com/SinchanaDev/finance-dashboard.git]

---

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- Recharts
- React Router DOM
- Framer Motion
- Lucide React
- Context API + Local Storage

---

## Getting Started

npm install

npm run dev

Open http://localhost:5173

---

## Pages

### Dashboard
- Summary cards — Total Balance, Income, Expenses
- Balance Trend area chart (6 months)
- Spending Breakdown pie chart by category

### Transactions
- Full transaction list — date, amount, category, type
- Search by description or category
- Filter by type, category and date range
- Sort by date or amount
- Group by category, type or month
- Export as CSV or JSON
- Admin can add, edit and delete transactions

### Insights
- Highest and lowest spending category
- Savings rate calculation
- Month over month expense change
- Monthly comparison bar chart
- Category spending progress bars

### Planning
- Budget Goal Tracker — set monthly budgets per category with live progress bars, near limit and over budget alerts
- Spending Forecast — predicts next month expenses per category using trend analysis
- Financial Health Score — animated ring with savings, diversity and consistency breakdown

---

## Role Based UI

- Viewer — read only access, no edit or delete
- Admin — can add, edit and delete transactions
- Switch roles via dropdown in the topbar
- No backend needed, simulated on frontend

---

## Optional Enhancements Implemented

- Dark and light mode with toggle
- Local storage persistence across sessions
- Framer Motion animations on all pages and components
- Export CSV and JSON
- Advanced date range filtering
- Group by category, type and month

---

## Bonus Features

- Budget Goal Tracker with editable limits and color coded alerts
- Spending Forecast using 6 month trend analysis with category breakdown
- Financial Health Score with animated circular progress ring

---

## State Management

React Context API manages all global state:
- Transactions data
- Search query
- Filter type, category and date range
- Sort order and grouping
- Selected role
- Theme (dark/light)
- Budget goals

All data persists in local storage across sessions.

---

## Assumptions

- Data is mock and static, no backend required
- Indian Rupee used as currency
- Roles are simulated on the frontend for demonstration
- Forecast is based on current spending trends and category growth patterns

---

## Folder Structure

src/
├── components/
│   ├── dashboard/
│   │   ├── SummaryCards.jsx
│   │   ├── BalanceTrendChart.jsx
│   │   ├── SpendingBreakdownChart.jsx
│   │   ├── BudgetTracker.jsx
│   │   ├── SpendingForecast.jsx
│   │   └── HealthScore.jsx
│   ├── transactions/
│   │   ├── TransactionTable.jsx
│   │   ├── TransactionFilters.jsx
│   │   ├── AddTransactionModal.jsx
│   │   └── EditTransactionModal.jsx
│   └── layout/
│       ├── Sidebar.jsx
│       └── TopBar.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── mockData.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Insights.jsx
│   └── Planning.jsx
└── styles/
    └── globals.css
=======
# finance-dashboard
A clean and interactive finance dashboard built with React, featuring role-based UI, budget tracking, spending forecast and financial health score.
>>>>>>> e1ad0f657cc906ec4b86cef66a4fad4a80b25644
