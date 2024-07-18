import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import List from './components/pages/list/list';
import ClassComponent from './components/pages/class/class';
import Login from './components/pages/login';
import Register from './components/pages/register';
import ForgotPassword from './components/pages/forgotpassword';
import ResetPassword from './components/pages/resetpassword';
import GoogleAuthSuccess from './components/googleauthsucees';
import { SearchContextProvider } from './context/search';
import ReservePage from './components/pages/reserve';
import ReviewPage from './components/pages/reviewselections';
import MyBookings from './components/pages/my-bookings';
import MyAccount from './components/pages/myaccount';

function App() {
  return (
    <SearchContextProvider>
      <Router>
        <div className="App">    
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/classes' element={<List />} />
            <Route path='/classes/:id' element={<ClassComponent />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/auth/google/success' element={<GoogleAuthSuccess />} />
            <Route path='/reserve' element={<ReservePage />} />
            <Route path='/review' element={<ReviewPage />} />
            <Route path='/my-bookings' element={<MyBookings />} /> {/* Added route */}
            <Route path='/my-account' element={<MyAccount />} /> {/* Added route */}
          </Routes>
        </div>
      </Router>
    </SearchContextProvider>
  );
}

export default App;