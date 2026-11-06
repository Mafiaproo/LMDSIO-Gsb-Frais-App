import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Switch } from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";
import { API_URL } from '../services/authService';

export default function DashboardScreen() {
  const { user, token } = useAuth();

  const [ fraisList, setFraisList ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [ searchTerm, setSearchTerm ] = useState("");
  const [ searchTermMaxAmount, setsearchTermMaxAmount ] = useState("");

  const [filterNonNull, setFilterNonNull] = useState(true);

    useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);

        setFraisList(data);
        print(typeof(data));
        
      }
      catch (error)
      {
        console.log(error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchFrais();
  }, []);

  const filteredFrais = fraisList
    .filter(
      (frais) =>
        !filterNonNull ||
        frais.montantvalide !== null
    )
    .filter(
      (frais) =>
        searchTerm === "" ||
        frais.anneemois.includes(searchTerm) ||
        frais.id_visiteur.toString().includes(searchTerm)
    )
    .filter(
      (frais) =>
        searchTermMaxAmount === "" ||
        (frais.montantvalide !== null &&
          frais.montantvalide > parseFloat(searchTermMaxAmount))
    );

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);

        setFraisList(data);
        print(typeof(data));
        
      }
      catch (error)
      {
        console.log(error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchFrais();
  }, []);

  if (loading)
  {
    return(<ActivityIndicator size='large' style={{ marginTop: 40, }} />);
  }

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue {user.nom_visiteur} {user.prenom_visiteur}</Text>
        <View style={ styles.searchContainer }>
          <TextInput style={ styles.searchBar } placeholder="année-mois ou ID visiteur..." value={ searchTerm } onChangeText={setSearchTerm}/>
          <Switch value={filterNonNull} onValueChange={setFilterNonNull}/>
          <Text>Only Valid Amount</Text>
        </View>
        <TextInput style={ styles.searchBar } placeholder="max amount" value={ searchTermMaxAmount } onChangeText={setsearchTermMaxAmount}/>
        
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
  searchBar: {
    backgroundColor: '#DDD',
    textAlign: 'center',
    borderRadius: 10,
    width: 210
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
