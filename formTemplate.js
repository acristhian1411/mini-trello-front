#!/usr/bin/env node
export function generateFormTemplate(name, fields) {
    console.log('fields',fields)
    console.log('name',name)
    const fileName = `${name.toLowerCase()}`;
    const fieldInputs = fields
      .map(( fieldname ) => {
        console.log('fieldname',fieldname)
        // const isMultiline = type === "textarea";
        return `        <TextField
            label="${capitalize(fieldname)}"
            name="${fieldname}"
            value={formData.${fieldname}}
            onChange={handleChange}
            required
          />`;
      })
      .join("\n\n");
    return `import React, { useState } from "react";
  import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
  } from "@mui/material";
  import {api} from "../../api/axios";
  
  export default function Form({onClose, edit, ${fileName}, showAlert}) {
    const [formData, setFormData] = useState({
  ${fields.map((fieldname ) => `    ${fieldname}: ${fileName}?.${fieldname} || "",`).join("\n")}
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
        const res = await api.post("/api/${fileName}?wantsJson=true", formData);
        showAlert("${capitalize(fileName)} creado exitosamente", "success");
      } catch (err) {
        showAlert("Error al crear ${fileName}", "error");
      }
    };
  
    const handleEdit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.put(\`/api/${fileName}/\${${fileName}.id}?wantsJson=true\`, formData);
        showAlert("${capitalize(fileName)} editado exitosamente", "success");
      } catch (err) {
        showAlert("Error al editar ${fileName}", "error");
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
          {edit ? "Editar ${capitalize(fileName)}" : "Crear nuevo ${capitalize(fileName)}"}
        </Typography>
  
        <Stack spacing={2}>
  ${fieldInputs}
  
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
  `;
  }
  function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}