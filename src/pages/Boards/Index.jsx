import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../../api/axios";
import BoardsReport from "./Reports/BoardsReport";
// import Form from "./Form";
const Form  = lazy(() => import("./Form"));
// import MidModal from "../../Components/Modal";
const MidModal = lazy(() => import("../../Components/Modal"));
import PaginationControls from "../../Components/PaginationControls";
import AlertMessage from "../../Components/Alert";
// import DeleteDialog from "../../Components/DeleteDialog";
const DeleteDialog = lazy(() => import("../../Components/DeleteDialog"));
import { usePermissionsStore } from "../../store/permissionsStore";
import SearchIcon from "@mui/icons-material/Search";
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
 import { Link } from "react-router-dom";
/**
 * A component that displays a list of boards with functionalities to 
 * create, edit, delete, and search boards. It also includes pagination 
 * controls and sorting capabilities for the displayed data.
 */
export default function Boards() {
    const hasPermission = usePermissionsStore((state) => state.hasPermission);
    const [boards, setBoards] = useState([]);
    const [board, setBoard] = useState(null);
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
    const navigate = useNavigate();

    const fetchBoards = async (perPage, page, orderBy = "name", order = "asc", search = "") => {
        let url = '/api/boards?wantsJson=true&per_page=' + perPage + '&page=' + page + '&sort_by=' + orderBy + '&order=' + order + ( search ? '&name=' + search : '');
        const response = await api.get(url);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setBoards(response.data.data);
    };
    
    useEffect(() => {
        fetchBoards(rowsPerPage, currentPage, orderBy, order);
    }, [rowsPerPage,currentPage,orderBy,order]);

    const handleOpenDelete = (item) => {
        setBoard(item);
        setOpenDelete(true);
    };
    
    const closeModal = () => {
        setOpenModal(false);
        fetchBoards(rowsPerPage, currentPage, orderBy, order);
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

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        fetchBoards(rowsPerPage, currentPage, orderBy, order);
    };
    const handleDelete = async () => {
        try {
          await api.delete(`/api/boards/${board.id}?wantsJson=true`);
          showAlert("Board deleted successfully", "success");
          setOpenDelete(false);
          fetchBoards(rowsPerPage, currentPage, orderBy, order);
        } catch (err) {
          showAlert("Error deleting board", "error");
        }
    };

    return (
        <div>
            <h1>Boards</h1>
            {/* <BoardsReport boards={boards} /> */}
            <div sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px"}}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fetchBoards(rowsPerPage, currentPage, orderBy, order, search);
                        }
                    }}
                    sx={{ marginBottom: "16px", width: "300px" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => fetchBoards(rowsPerPage, currentPage, orderBy, order, search)}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "description"}
                                    direction={orderBy === "description" ? order : "asc"}
                                    onClick={() => handleSort("description")}
                                >
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "created_at"}
                                    direction={orderBy === "created_at" ? order : "asc"}
                                    onClick={() => handleSort("created_at")}
                                >
                                    Created At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "updated_at"}
                                    direction={orderBy === "updated_at" ? order : "asc"}
                                    onClick={() => handleSort("updated_at")}
                                >
                                    Updated At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                Imagen
                            </TableCell>
                            <TableCell colSpan={2} align="right">
                                {hasPermission("board.create") && <Button variant="contained" color="primary" onClick={() => openModalForm(null, false)}>Create Board</Button>}
                            </TableCell>
                            <TableCell colSpan={2} align="right">
                                <Button variant="contained" color="primary"
                                 onClick={() => navigate("/boards/report")}>
                                    Export
                                </Button>
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
                                <TableCell align="right">{board.image_url && <img src={board.image_url} alt="board" style={{width: 50}}/>}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/boards/${board.id}`}>
                                        <Button variant="contained" color="primary">Show</Button>
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {hasPermission("board.edit") && <Button variant="contained" color="warning" onClick={() => openModalForm(board, true)}>Edit</Button>}
                                </TableCell>
                                <TableCell align="right">
                                    {hasPermission("board.delete") && <Button variant="contained" color="error" onClick={() => handleOpenDelete(board)}>Delete</Button>}
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
            {/* Modal con formulario de creación o edición */}
            <Suspense fallback={<div>Loading...</div>}>
                <MidModal open={openModal} onClose={closeModal}>
                    <Form 
                        onClose={closeModal} 
                        edit={edit} 
                        board={board}
                        showAlert={showAlert}
                    />
                </MidModal>
            </Suspense>
            {/* Alerta de confirmación de acciones (creación, edición, eliminación) */}
            {alert != null && (
                    <AlertMessage 
                        message={alert.message} 
                        severity={alert.severity}
                        open={alert != null}
                        handleClose={() => setAlert(null)}
                    />
                )
            }
            {/* Modal de confirmación de eliminación */}
            <Suspense fallback={<div>Loading...</div>}>
                <DeleteDialog
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDelete}
                    title="Delete Board"
                    message="Are you sure you want to delete this board?"
                />
            </Suspense>
        </div>
    );
}
