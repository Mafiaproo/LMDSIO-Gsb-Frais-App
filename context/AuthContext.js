import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Création du contexte
const AuthContext = createContext();
 
// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  // État local pour stocker l’utilisateur (null = non connecté)
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [sessionLoading, setSessionLoading] = useState(true);

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

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();

        if(storedUser && storedToken)
        {
          setUser(storedUser);
          setToken(storedToken);
        }
      }
      catch (error)
      {
        console.error("Erreur lors de la restauuration de session : ", error);
      }
      finally 
      {
        setSessionLoading(false);
      }

    };
    restoreSession();
  }, []);
 
  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider value={{ token, user, sessionLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem('user')

  // si raw est pas null on le parse et envoie sinon on renvoie null
  return raw !== null ? JSON.parse(raw) : null;

};

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');

  return token !== null ? token : null;
};

// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}