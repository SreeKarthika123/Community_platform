// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
// import Communities from './components/Communities';
// import CreateCommunity from './components/CreateCommunity';

// function AppWrapper() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const navigate = useNavigate();

//   const handleSetToken = (t) => {
//     localStorage.setItem('token', t);
//     setToken(t);
//     navigate('/communities');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     navigate('/signin');
//   };

//   return (
//     <div>
//       {token && <button onClick={logout}>Logout</button>}
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/signin" element={<Signin setToken={handleSetToken} />} />
//         <Route path="/communities" element={token ? <Communities token={token} /> : <Navigate to="/signin" />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Communities from './components/Communities';
// import CreateCommunity from './components/CreateCommunity';

function AppWrapper() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const handleSetToken = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
    navigate('/communities');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/signin');
  };

  return (
    <div>
      {token && <button onClick={logout}>Logout</button>}
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setToken={handleSetToken} />} />
        <Route path="/communities" element={token ? <Communities token={token} /> : <Navigate to="/signin" />} />
        {/* <Route path="/create-community" element={token ? <CreateCommunity /> : <Navigate to="/signin" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
