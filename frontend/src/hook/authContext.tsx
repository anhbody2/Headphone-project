import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getMe } from '../api/user-profile';
import { type ReactNode } from 'react';
import { type CartItem } from '../api/cart.api';
import { bootstrapCart } from '../localStorage/cart.bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from "../api/auth.api"
import toast from "react-hot-toast";
interface AuthContextType {
  user: any;
  authReady: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setAuthReady(true);
      return;
    }

    getMe()
      .then((u) => {
        setUser(u);
        syncCart(u); 
      })
      .finally(() => setAuthReady(true));
  }, []);

  const syncCart = async (currentUser: any, updatedItems?: CartItem[]) => {
    if (updatedItems) {
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify({ items: updatedItems }));
    } else {
      const res = await bootstrapCart(currentUser);
      setCartItems(res.items || []);
    }
  };
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const userData = await getMe();
      console.log(userData);
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  };
 const logout = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      // Don't check for "null" string; check if it exists and isn't empty
      if (token && token !== "null") {
        await logoutApi(token);
      }
    } catch (error) {
      console.error("API logout failed", error);
    } finally {
      // Clean up local storage and state
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    }
  }, [navigate]);
  const value = useMemo(() => ({
    user,
    authReady,
    cartItems,
    setUser,
    syncCart,
    login,
    logout
  }), [user, authReady, logout,cartItems]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};