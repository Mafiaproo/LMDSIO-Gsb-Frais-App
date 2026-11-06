import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Switch } from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";
import { API_URL } from "../config";
import FraisForm from "../components/FraisForm";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function FraisAddScreen() {

    const [ loading, setLoading ] = useState(true);

    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('Token manquant');

            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const fraisData
        }
    };

    if (loading)
    {
    return(<ActivityIndicator size='large' style={{ marginTop: 40, }} />);
    }

    return (
    <FraisForm/>
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
