import { useState, useEffect } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import { getTokenFromCookie } from './api/axios';

function App() {
  const [token, setToken] = useState(getTokenFromCookie());

  useEffect(() => {
    document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;
  }, [token]);
  return (
    <>
      {!token && (
        <AuthProvider>
          <Login />
        </AuthProvider>
      )}
      {token && (
        <AuthProvider>
            <Profile />
        </AuthProvider>
      )}
    </>
  )
}

export default App
