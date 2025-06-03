import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Form from "./Form";
import Show from "./Show";
import MidModal from "../../Components/Modal";
import PaginationControls from "../../Components/PaginationControls";
import AlertMessage from "../../Components/Alert";
import SearchIcon from "@mui/icons-material/Search";
import DeleteDialog from "../../Components/DeleteDialog";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";

export default function Lists() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const fetchItems = async (perPage, page, orderBy = "name", order = "asc", search = "") => {
    let url = '/api/lists?wantsJson=true&per_page=' + perPage + '&page=' + page + '&sort_by=' + orderBy + '&order=' + order + ( search ? '&search=' + search : '');
    const response = await api.get(url);
    setCurrentPage(response.data.current_page);
    setLastPage(response.data.last_page);
    setItems(response.data.data);
  };

  useEffect(() => {
    fetchItems(rowsPerPage, currentPage, orderBy, order);
  }, [rowsPerPage, currentPage, orderBy, order]);

  const handleOpenDelete = (item) => {
    setItem(item);
    setOpenDelete(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    fetchItems(rowsPerPage, currentPage, orderBy, order);
  };

  const openModalForm = (item, edit) => {
    setItem(item);
    setEdit(edit);
    setOpenModal(true);
  };

  const showAlert = (message, severity) => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 3000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchItems(rowsPerPage, page);
  };

  const handleRowsPerPageChange = async (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
    fetchItems(rows, 1);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    fetchItems(rowsPerPage, currentPage, orderBy, order);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/lists/${item.id}?wantsJson=true`);
      showAlert("Lists deleted successfully", "success");
      setOpenDelete(false);
      fetchItems(rowsPerPage, currentPage, orderBy, order);
    } catch (err) {
      showAlert("Error deleting Lists", "error");
    }
  };

  return (
    <div>
      <h1>Lists</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchItems(rowsPerPage, currentPage, orderBy, order, search);
            }
          }}
          sx={{ marginBottom: "16px", width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => fetchItems(rowsPerPage, currentPage, orderBy, order, search)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "board_id"}
                  direction={orderBy === "board_id" ? order : "asc"}
                  onClick={() => handleSort("board_id")}
                >
                  board_id
                </TableSortLabel>
              </TableCell>
              <TableCell colSpan={2} align="right">
                <Button variant="contained" color="primary" onClick={() => openModalForm(null, false)}>
                  Create
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.board_id}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="warning" onClick={() => openModalForm(item, true)}>Edit</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" onClick={() => handleOpenDelete(item)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationControls
        currentPage={currentPage}
        totalPages={lastPage}
        rowsPerPage={rowsPerPage}
        onChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <MidModal open={openModal} onClose={closeModal}>
        <Form onClose={closeModal} edit={edit} item={item} showAlert={showAlert} />
      </MidModal>
      {alert && (
        <AlertMessage
          message={alert.message}
          severity={alert.severity}
          open={true}
          handleClose={() => setAlert(null)}
        />
      )}
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Lists"
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
