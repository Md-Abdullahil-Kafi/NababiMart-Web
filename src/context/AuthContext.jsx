import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { saveUser } from "../api/user";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  // Email Register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          await saveUser({
            uid: currentUser.uid,
            name: currentUser.displayName || "Anonymous User",
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
          });
        } catch (error) {
          console.error("Failed to save user:", error);
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, googleLogin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;