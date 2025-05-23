import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import { getTokenFromCookie } from './api/axios';
import Layout from '@/Components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';

function App() {
  const [token, setToken] = useState(getTokenFromCookie());
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );
  useEffect(() => {
    document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;
  }, [token]);
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!token && (
        <AuthProvider>
          <Login />
        </AuthProvider>
      )}
      {token && (
        <AuthProvider>
          {console.log('prefenrecia del navegador: ',prefersDarkMode)}
          <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
            <Profile />
          </Layout >
        </AuthProvider>
      )}
    </ThemeProvider>
    </>
  )
}

export default App
