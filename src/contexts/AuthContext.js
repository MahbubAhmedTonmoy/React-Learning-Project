import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthConrext = React.createContext();

// custome hook
/*
if you use this hook you can access 
const value = {
        currentUser,
        signup,
        login,
        logout
    }
*/
export function useAuth() {
  return useContext(AuthConrext);
}

// context api
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(); // local state
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //signup
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(auth.currentUser, { displayName: username });
    const user = auth.currentUser;

    setCurrentUser({ ...user });
  }

  //login
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout
  function logout() {
    const auth = getAuth();
    signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthConrext.Provider value={value}>
      {!loading && children}
    </AuthConrext.Provider>
  );
}
