import { createContext, useContext, useState } from "react";
import { signIn } from "../services/authService";
 
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
    const data = await signIn(login, password).json;

    setUser(data.visiteur);
    setToken(data.token);

    return data;
  }
 
  // 4. Fonction de déconnexion
  const logoutUser = () => {
    // ToDo : réinitialiser la valeur de l’état à null
    setUser(null);
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