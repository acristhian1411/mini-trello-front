import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { api } from "../../../api/axios";
import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert,
    Button,
    Link,
    Stack
  } from '@mui/material';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ShowBoard = () => {
    const { id } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Simula una llamada a API, reemplaza con tu fetch real
      const fetchItem = async () => {
         try {
            const res = await api.get('/api/showboards-report/' + id, {
                responseType: 'blob',
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
      };
      fetchItem();
    }, [id]);
  
    if (loading) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        );
      }
    
      if (error) {
        return (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        );
      }
    
      return (
        <Box sx={{ maxWidth: '100%', mx: 'auto', mt: 4, px: 0 }}>
          {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="Reporte PDF"
                    width="100%"
                    height="600px"
                    style={{ border: '1px solid #ccc', marginTop: '1rem' }}
                />
            )}
        </Box>
      );
};

export default ShowBoard;