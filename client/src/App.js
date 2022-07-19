import { Routes, Route, Navigate } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Layout from "./components/Layout/Layout";

function App() {

  let loggedIn = false;

  return (
    <div className="classnik-app">
      <Routes>

        <Route path='/' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />

        <Route path='/login' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />
        <Route path='/register' element={loggedIn ? <Navigate to='/dashboard' /> : <Auth />} />

        <Route path='/dashboard/*' element={loggedIn ? <Layout /> : <Auth />} />
      </Routes>
    </div>
  );
}

export default App;
