import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";

export default function DashboardScreen() {
  const { user } = useAuth();

  const [ fraisList, setFraisList ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [ searchTerm, setSearchTerm ] = useState("");

  const filteredFrais = fraisList.filter(
    (frais) =>
     frais.montantvalide != null 
  ).filter(
    (frais) =>
      searchTerm.includes(frais.anneemois) ||
      searchTerm.includes(frais.id_visiteur)
  );

  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500)
  }, []);

  if (loading)
  {
    return(<ActivityIndicator size='large' style={{ marginTop: 40, }} />);
  }

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue {user}</Text>
        <TextInput placeholder="année-mois ou ID visiteur..." value={ searchTerm } onChangeText={setSearchTerm}/>
        <FlatList
        data={filteredFrais} 
        renderItem={ ({ item }) => <FraisCard frais={item}/> } 
        keyExtractor={ item=> item.id_frais }
        />
      </View>
    </View>
  );
}

/* Question 7 : 
  J'afficherais l'id visieur avec la date de modif le montant et nbr justificatifs. 
*/

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 20, },
});
