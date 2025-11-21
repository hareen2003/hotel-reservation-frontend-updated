import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from './context/RoomContext';
import { ReservationProvider } from './context/ReservationContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import SearchRooms from './components/user/SearchRooms';
import ReservationForm from './components/user/ReservationForm';
import Payment from './components/user/Payment';
import BookingHistory from './components/user/BookingHistory';
import Profile from './components/user/Profile';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminProfile from './components/admin/AdminProfile';
import UserManagement from './components/admin/UserManagement';
import RoomManagement from './components/admin/RoomManagement';
import ReservationManagement from './components/admin/ReservationManagement';
import PaymentRecords from './components/admin/PaymentRecords';
import NotificationControl from './components/admin/NotificationControl';
import RoomDetails from './components/user/RoomDetails';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <ReservationProvider>
          <NotificationProvider>
            <div className="App site-overlay">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<SearchRooms />} />
                  <Route path="/rooms/:id" element={<RoomDetails />} />
                  <Route path="/reserve/:id" element={<ReservationForm />} />
                  <Route path="/reserve/:id/payment" element={<Payment />} />
                  <Route path="/bookings" element={<BookingHistory />} />
                  <Route path="/booking-history" element={<BookingHistory />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/rooms" element={<RoomManagement />} />
                  <Route path="/admin/reservations" element={<ReservationManagement />} />
                  <Route path="/admin/payments" element={<PaymentRecords />} />
                  <Route path="/admin/notifications" element={<NotificationControl />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </ReservationProvider>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;
