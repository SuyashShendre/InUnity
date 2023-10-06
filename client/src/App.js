// import logo from './logo.svg';
// import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import './App.css';

// import LoginForm from './components/Login';
// import LogoutButton from './components/Logout';
// // import Dashboard from './Dashboard';

// function App() {
//   const [user, setUser] = useState(null);

//   const handleLogin = (username) => {
//     setUser(username);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {user ? (
//           <div>
//             <p>Welcome, {user}!</p>
//             <LogoutButton onLogout={handleLogout} />
//           </div>
//         ) : (
//           <LoginForm onLogin={handleLogin} />
//         )}
//       </header>
//     </div>

//   );
// }

// export default App;



import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Update the import

import LoginForm from './components/Login';
import LogoutButton from './components/Logout';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {user ? (
            <div>
              <p>Welcome, {user}!</p>
              <LogoutButton onLogout={handleLogout} />
            </div>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </header>
      </div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
