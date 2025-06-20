import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/axios";
import { usePermissionsStore } from "../store/permissionsStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await api.post('/api/auth/me');
      setUser(data);
      const permsRes = await api.get(`/api/users/${data.id}/permissions`);
      usePermissionsStore.getState().setPermissions(permsRes.data);
    } catch (error) {
      setUser(null);
    } 
    finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login',  {email, password});
      document.cookie = `token=${data.access_token}; max-age=${data.expires_in}; path=/`;
      window.location.reload();
      await fetchUser();
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.reload();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);