PERSONAL BUDGET MANAGEMENT APPLICATION
========================================

INSTALLED PACKAGES:
-------------------
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^7.9.5
- @reduxjs/toolkit: ^2.10.1
- react-redux: ^9.2.0
- react-bootstrap: ^2.10.10
- bootstrap: ^5.3.8
- axios: ^1.13.2
- json-server: ^1.0.0-beta.3

HOW TO RUN:
-----------
1. Install dependencies:
   npm install

2. Start JSON Server (in a separate terminal):
   npm run server
   This will start the JSON Server on http://localhost:3001

3. Start the React application:
   npm start
   This will start the React app on http://localhost:3000

4. Open your browser and navigate to:
   http://localhost:3000

LOGIN CREDENTIALS:
------------------
Username: anhnv
Password: admin123

Or

Username: TamNT
Password: admin123

PROJECT STRUCTURE:
------------------
src/
  ├── components/       - Reusable UI components
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   └── ProtectedRoute.jsx
  ├── pages/           - Page components
  │   ├── Login.jsx
  │   └── Home.jsx
  ├── contexts/        - Context API with useReducer
  │   ├── AuthContext.jsx
  │   └── ExpenseContext.jsx
  ├── services/        - API services
  │   ├── api.js
  │   ├── authService.js
  │   └── expenseService.js
  ├── utils/           - Utility functions
  │   └── formatters.js
  └── App.jsx          - Main app component with routing

FEATURES:
---------
- User authentication with login page
- Protected routes
- Add, edit, and delete expenses
- Filter expenses by category
- Real-time total expenses calculation
- VND currency formatting
- Date formatting (DD-MM-YYYY display, DD/MM/YYYY input)

STATE MANAGEMENT:
-----------------
- Uses useContext + useReducer (as required by assignment)
- AuthContext: Manages authentication state
- ExpenseContext: Manages expenses state and operations

