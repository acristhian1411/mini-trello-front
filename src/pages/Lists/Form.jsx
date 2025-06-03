import React, { useState } from "react";
  import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
  } from "@mui/material";
  import {api} from "../../api/axios";
  
  export default function Form({onClose, edit, lists, showAlert}) {
    const [formData, setFormData] = useState({
      name: lists?.name || "",
    board_id: lists?.board_id || "",
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
        const res = await api.post("/api/lists?wantsJson=true", formData);
        showAlert("Lists creado exitosamente", "success");
      } catch (err) {
        showAlert("Error al crear lists", "error");
      }
    };
  
    const handleEdit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.put(`/api/lists/${lists.id}?wantsJson=true`, formData);
        showAlert("Lists editado exitosamente", "success");
      } catch (err) {
        showAlert("Error al editar lists", "error");
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
          {edit ? "Editar Lists" : "Crear nuevo Lists"}
        </Typography>
  
        <Stack spacing={2}>
          <TextField
            label="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

        <TextField
            label="board_id"
            name="board_id"
            value={formData.board_id}
            onChange={handleChange}
            required
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
  