import { View, Text, StyleSheet} from 'react-native';

export default function FraisCard({frais})
{
    return(
        <View style={ styles.card }>
                <Text style={ styles.title }>Note °{ frais.id_frais }    |    { frais.anneemois }</Text>
                <Text style={ styles.meta }>Visiteur °{ frais.id_visiteur }    |    Nbr justificatifs { frais.nbjustificatifs }</Text>
                <Text style={ styles.meta }>Montant saisis <Text style={ styles.montant }>- €</Text>    |    Montant validé <Text style={ styles.montant }>{ frais.montantvalide } €</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#FFF',
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    title: {
        color: '#161B33',
        fontWeight: 'bold',
        fontSize: 18,
    },

    meta: {
        color: '#5B6270',
        marginTop: 4,
        fontSize: 14,
    },

    montant: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#0E8C7C',
        marginTop: 4,
    }
});

