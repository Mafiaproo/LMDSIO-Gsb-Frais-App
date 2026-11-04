import { createContext, useContext, useState } from "react";
import { signIn, signOut } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Création du contexte
const AuthContext = createContext();
 
// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  // État local pour stocker l’utilisateur (null = non connecté)
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  // 3. Fonction de connexion
  async function loginUser(login, password)
  {
    const data = await signIn(login, password);
    
    console.log("infos :" + data.visiteur + " " + data.token);
    
    setUser(data.visiteur);
    setToken(data.token);

    return data;
  }
 
  // 4. Fonction de déconnexion
  const logoutUser = async () => {

    await signOut();

    setUser(null);
    setToken(null);

  };
 
  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
 
// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}