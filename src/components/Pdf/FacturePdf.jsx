import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Button } from "@heroui/react";
import { FileText } from "lucide-react";
// Styles pour le PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        marginBottom: 3,
    },
    table: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingVertical: 8,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    tableCol1: { width: '40%', paddingLeft: 5 },
    tableCol2: { width: '20%', paddingLeft: 5 },
    tableCol3: { width: '20%', paddingLeft: 5 },
    tableCol4: { width: '20%', paddingLeft: 5 },
    totals: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
    },
    totalLabel: {
        fontSize: 10,
    },
    totalValue: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});




// Composant PDF
const FacturePDF = ({ products }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* En-tête */}
            <View style={styles.header}>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nom de l'entreprise</Text>
                    <Text style={styles.text}>Adresse complète</Text>
                    <Text style={styles.text}>Numéro TVA ou NIF / STAT</Text>
                    <Text style={styles.text}>Contact : téléphone, email, site web</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nom du client / entreprise</Text>
                    <Text style={styles.text}>Adresse</Text>
                    <Text style={styles.text}>NIF / STAT (si entreprise)</Text>
                    <Text style={styles.text}>Contact (téléphone / email)</Text>
                    <Text style={styles.text}>Facture N°: [Numéro]</Text>
                    <Text style={styles.text}>Date d'émission: {new Date().toLocaleDateString('fr-FR')}</Text>
                </View>
            </View>

            {/* Tableau */}
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.tableCol1}>Description</Text>
                    <Text style={styles.tableCol2}>Quantité</Text>
                    <Text style={styles.tableCol3}>Prix Unitaire (Ar)</Text>
                    <Text style={styles.tableCol4}>Total (Ar)</Text>
                </View>
                {products.map((product) => (
                    <View key={product.id} style={styles.tableRow}>
                        <Text style={styles.tableCol1}>{product.description}</Text>
                        <Text style={styles.tableCol2}>{product.quantite}</Text>
                        <Text style={styles.tableCol3}>{product.prixUnitaire.toLocaleString()}</Text>
                        <Text style={styles.tableCol4}>{product.total.toLocaleString()}</Text>
                    </View>
                ))}
            </View>

            {/* Totaux */}
            <View style={styles.totals}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Sous-total:</Text>
                    <Text style={styles.totalValue}>200,000 Ar</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Taxe (20%):</Text>
                    <Text style={styles.totalValue}>40,000 Ar</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, { fontWeight: 'bold', fontSize: 12 }]}>Total à payer:</Text>
                    <Text style={[styles.totalValue, { fontSize: 12 }]}>240,000 Ar</Text>
                </View>
            </View>
        </Page>
    </Document>
);


export default FacturePDF;

export const FacturePdfDownload = ({ products }) => (
    <PDFDownloadLink
        document={<FacturePDF products={products} />}
        fileName="facture.pdf"
        style={{
            textDecoration: 'none',
            padding: '10px 20px',
            color: '#fff',
            backgroundColor: '#007bff',
            borderRadius: '4px',
        }}
    >
        {({ loading }) => (
            <Button
                size="md"
                fullWidth
                className="mb-2 justify-start py-6 rounded-2xl"
                color="primary"
                variant="solid"
                isLoading={loading}
            >
                <FileText className="mr-2" size={20} />
                {loading ? 'Génération...' : 'Télécharger la facture'}
            </Button>
        )}
    </PDFDownloadLink>
);