import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { API_URL } from "../config";
import { useNavigation } from "@react-navigation/native";

export default function FraisForm()
{
    const navigation = useNavigation();

    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState('');
    const [nbJustificatif, setNbJustificatif] = useState('');
    const [montant, setMontant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('Token manquant');

            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const fraisData = {
                anneemois: anneeMois,
                nbjustificatif: nbJustificatif,
                id_visiteur: user.id_visiteur,
            };

            const response = await fetch(`${API_URL}frais/ajout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(fraisData),
            });

            if(!response.ok)
            {
                const data = await response.json().catch(() => ({}));

                throw new Error(data.error || `Erreur HTTP ${response.status}`);
            }

            navigation.navigate('Dashboard');
        }
        catch (err)
        {
            console.error('Erreur:', err);
            setError(err.message || "Erreur lors de l'enregistrement");
            { error ? <Text style={{ color: 'red' }}>{error}</Text> : null }
        }
        finally
        {
            setLoading(false);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={ styles.title}>{frais ? "Modifier la note de frais" : "Saisir une note de frais"}</Text>

            <View>
                <Text>Année-mois :</Text>
                <TextInput style={ styles.input } 
                    placeholder="Année-mois (ex: 2023-10)"
                    value={anneeMois}
                    onChangeText={setAnneeMois}
                />
            </View>

            <View>
                <Text>Nombre de justificatifs :</Text>
                <TextInput style={ styles.input } 
                    placeholder="Nombre de justificatifs"
                    keyboardType="numeric"
                    value={nbJustificatif}
                    onChangeText={setNbJustificatif}
                />
            </View>

            <View>
                <Text>Montant Saisi :</Text>
                <TextInput 
                    style={ [styles.input, {backgroundColor: "#f0f0f0"}] } 
                    editable={false}
                    selectOnFocus={false}
                    keyboardType="numeric"
                    placeholder="Année-mois (ex: 2023-10)"
                    value={montant}
                    onChangeText={setMontant}
                />
            </View>

            <View style={ styles.smallButtonRow }>
                <Pressable
                    style={[styles.smallbutton, styles.buttonDisabled]}
                    //onpress={handleSubmit}
                    disabled={loading}
                ><Text style={styles.buttonText}>
                    Frais hors forfait
                </Text></Pressable>

                <Pressable
                    style={[styles.smallbutton, styles.buttonDisabled]}
                    //onpress={handleSubmit}
                    disabled={loading}
                ><Text style={styles.buttonText}>
                    Frais au forfait
                </Text></Pressable>
            </View>

            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Enregistrement..." : frais ? "Mettre à jour" : "Ajouter"}
                </Text>
            </Pressable>

            { error ? <Text style={styles.error}>(error)</Text> : null }

        </View>

        
    )
}