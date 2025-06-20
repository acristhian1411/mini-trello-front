import { pdf, Document, Page, Text, View, StyleSheet,Font } from '@react-pdf/renderer';

Font.register({
  family: 'BWMODELICA',
  src:'./fonts/BWMODELICA-REGULARITALIC.ttf'
})

 const styles = StyleSheet.create({
  page: { padding: 20 },
  table: { display: 'table', width: 'auto', borderWidth: 1, borderStyle: 'solid', marginBottom: 10 },
  row: { flexDirection: 'row' },
  cellHeader: {
    fontFamily:'BWMODELICA',
    backgroundColor: '#eee',
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 10,
    width: '20%'
  },
  cell: {
    fontFamily:'BWMODELICA',
    padding: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 9,
    width: '20%'
  }
});


const MyPDF = ({boards}) => (
  <Document>
    <Page size="A4">
    <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Nombre</Text>
          <Text style={styles.cellHeader}>Descripción</Text>
          <Text style={styles.cellHeader}>Creado</Text>
          <Text style={styles.cellHeader}>¿Imagen?</Text>
        </View>

        {/* Filas */}
        {boards.map((item) => (
          <View style={styles.row} key={item.id}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.description}</Text>
            <Text style={styles.cell}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>{item.image_url ? 'Sí' : 'No'}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const generarPDF = async (boards) => {
  const blob = await pdf(<MyPDF boards={boards} />).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank'); // o descargarlo
};

export default function App({boards}) {
  return <button onClick={()=>generarPDF(boards)}>Ver PDF</button>;
}