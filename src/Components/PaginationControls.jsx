import React from "react";
import {
  Pagination,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

export default function PaginationControls({
  currentPage,
  totalPages,
  onChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  const handlePageChange = (event, value) => {
    onChange(value);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="rows-per-page-label">Filas por pág.</InputLabel>
            <Select
          labelId="rows-per-page-label"
          value={rowsPerPage}
          label="Filas por pág."
          onChange={handleRowsPerPageChange}
        >
          {[5, 10, 20, 40, 50, 100].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
        </Grid>
    </Grid>
    </Stack>
  );
}
