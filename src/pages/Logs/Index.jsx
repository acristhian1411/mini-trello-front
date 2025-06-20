import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  CircularProgress, Box
} from '@mui/material';
import { api } from '@/api/axios';

const Index = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/logs').then(res => {
        setLogs(res.data);
        setLoading(false);
    })
    .catch(err => {
        console.error('Error al cargar logs:', err);
        setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <div>
            Cargando...
        </div>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Logs del sistema
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Ruta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell>{log.datetime}</TableCell>
                <TableCell>{log.level}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.extra?.email || '-'}</TableCell>
                <TableCell>{log.extra?.ip || '-'}</TableCell>
                <TableCell>{log.extra?.route_name || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Index;
