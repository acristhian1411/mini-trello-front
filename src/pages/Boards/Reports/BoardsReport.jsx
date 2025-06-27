import { useState } from 'react';
import {api} from "../../../api/axios";

const ReportViewer = () => {
    const [pdfUrl, setPdfUrl] = useState(null);

    const cargarReporte = async () => {
        try {
            const res = await api.get('/api/boards-report', {
                responseType: 'blob',
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error('Error al cargar el reporte:', error);
        }
    };

    return (
        <div>
          {console.log('algo')}
            <button onClick={cargarReporte}>Cargar Reporte</button>

            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="Reporte PDF"
                    width="100%"
                    height="600px"
                    style={{ border: '1px solid #ccc', marginTop: '1rem' }}
                />
            )}
        </div>
    );
};

export default ReportViewer;
