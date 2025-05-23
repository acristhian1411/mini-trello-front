import React, { useEffect, useState } from "react";
import {api} from "../../api/axios";
import Form from "./Form";
import MidModal from "../../Components/Modal";
import PaginationControls from "@/Components/PaginationControls";
import AlertMessage from "@/Components/Alert";
import { 
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
 } from "@mui/material";
export default function Boards() {
    const [boards, setBoards] = useState([]);
    const [board, setBoard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [edit, setEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const fetchBoards = async (perPage, page) => {
        const response = await api.get('/api/boards?wantsJson=true&per_page=' + perPage + '&page=' + page);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setBoards(response.data.data);
    };
    useEffect(() => {
        fetchBoards(rowsPerPage, currentPage);
    }, []);


    const close = () => {
        setOpenModal(false);
        fetchBoards();
    };
    const openModalForm = (board, edit) => {
        setBoard(board);
        setEdit(edit);
        setOpenModal(true);
    };
    const showAlert = (message, severity) => {
        setAlert({ message, severity });
        setTimeout(() => setAlert(null), 3000);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchBoards(rowsPerPage, page);
    };
    const handleRowsPerPageChange = async (rows) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
        fetchBoards(rows, 1);
    };
    return (
        <div>
            <h1>Boards</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Updated At</TableCell>
                            <TableCell colSpan={2} align="right">
                                <Button variant="contained" color="primary" onClick={() => openModalForm(null, false)}>Create Board</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boards.map((board, index) => (
                            <TableRow
                                key={board.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {board.name}
                                </TableCell>
                                <TableCell align="right">{board.description}</TableCell>
                                <TableCell align="right">{board.created_at}</TableCell>
                                <TableCell align="right">{board.updated_at}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="warning" onClick={() => openModalForm(board, true)}>Edit</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Paginación abajo de la tabla */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={lastPage}
                rowsPerPage={rowsPerPage}
                onChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <MidModal open={openModal} onClose={close}>
                <Form 
                    onClose={close} 
                    edit={edit} 
                    board={board}
                    showAlert={showAlert}
                />
            </MidModal>
            {alert != null && (
                    <AlertMessage 
                        message={alert.message} 
                        severity={alert.severity}
                        open={alert != null}
                        handleClose={() => setAlert(null)}
                    />
                )
            }
        </div>
    );
}
