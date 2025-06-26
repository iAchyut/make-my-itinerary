// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Adjust the import path as necessary

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("🔄 AuthProvider mounted");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔄 called unsubscribe", user);
      if (user) {
       // const alreadySaved = localStorage.getItem("userSavedToDB");
          setUser(user);
          const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          };

          try {
            console.log("🔄 called save-user", user);
            const res = await fetch(
              "http://localhost:5000/api/itinerary/save-user",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }
            );

            const data = await res.json();
            if (data.success) {
              console.log("✅ User saved");
              localStorage.setItem("userSavedToDB", "true"); // 🟢 Save flag
            } else {
              console.error("❌ Backend error:", data.error);
            }
          } catch (err) {
            console.error("❌ Network error:", err);
          }
      } else {
        // Clear flag on logout
        setUser(null);
        console.log("🔄 User logged out");
        localStorage.removeItem("userSavedToDB");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export const handleLogout = async () => {
  await auth.signOut();
  localStorage.removeItem("userSavedToDB"); // 🔁 Allow re-saving next time
};
