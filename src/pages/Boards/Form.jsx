import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import {api} from "../../api/axios";

export default function Form({onClose, edit, board, showAlert}) {
  const [formData, setFormData] = useState({
    name: board?.name || "",
    description: board?.description || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/boards?wantsJson=true", formData);
      showAlert("Board creado exitosamente", "success");
    } catch (err) {
      showAlert("Error al crear board", "error");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/boards/${board.id}?wantsJson=true`, formData);
      showAlert("Board editado exitosamente", "success");
    } catch (err) {
      showAlert("Error al editar board", "error");
    }
  };

  const handleSubmit = edit ? handleEdit : handleCreate;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        {edit ? "Editar Board" : "Crear nuevo Board"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Button variant="contained" color="primary" type="submit">
          {edit ? "Editar" : "Crear"}
        </Button>
        <Button variant="contained" type="reset" color="error" onClick={onClose}>
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}
