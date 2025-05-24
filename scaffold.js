// scaffold.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateFormTemplate } from './formTemplate.js';

function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Esperando argumentos... usa: node scaffold.js nombre -form -show c=[campo1,campo2]");
  process.exit(1);
}

const name = args[0];
const flags = {
  form: args.includes('-form'),
  show: args.includes('-show'),
};

const fieldArg = args.find(arg => arg.startsWith('c='));
const fields = fieldArg ? fieldArg.slice(2).replace(/[\[\]]/g, '').split(',') : [];

const targetDir = path.join(__dirname, 'src', 'pages', name);

// Plantilla base adaptada de tu componente Boards.jsx
const generateIndexContent = (modelName, fields) => `import React, { useEffect, useState } from "react";
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

export default function ${capitalize(modelName)}() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("${fields[0] || 'name'}");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const fetchItems = async (perPage, page, orderBy = "${fields[0] || 'name'}", order = "asc", search = "") => {
    let url = '/api/${modelName.toLowerCase()}?wantsJson=true&per_page=' + perPage + '&page=' + page + '&sort_by=' + orderBy + '&order=' + order + ( search ? '&search=' + search : '');
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
      await api.delete(\`/api/${modelName.toLowerCase()}/\${item.id}?wantsJson=true\`);
      showAlert("${capitalize(modelName)} deleted successfully", "success");
      setOpenDelete(false);
      fetchItems(rowsPerPage, currentPage, orderBy, order);
    } catch (err) {
      showAlert("Error deleting ${modelName}", "error");
    }
  };

  return (
    <div>
      <h1>${capitalize(modelName)}</h1>
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
              ${fields.map(f => `<TableCell>
                <TableSortLabel
                  active={orderBy === "${f}"}
                  direction={orderBy === "${f}" ? order : "asc"}
                  onClick={() => handleSort("${f}")}
                >
                  ${capitalize(f)}
                </TableSortLabel>
              </TableCell>`).join('\n              ')}
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
                ${fields.map(f => `<TableCell>{item.${f}}</TableCell>`).join('\n                ')}
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
        title="Delete ${capitalize(modelName)}"
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
`;

(async () => {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'Index.jsx'), generateIndexContent(name, fields));

  if (flags.form) {
    fs.writeFileSync(
      path.join(targetDir, 'Form.jsx'),
      generateFormTemplate(name, fields)
    );
  }
 
  if (flags.show) {
    fs.writeFileSync(path.join(targetDir, 'Show.jsx'), `export default function Show() { return <div>Show</div>; }`);
  }

  // === Agregar ruta al Sidebar ===
  const sidebarPath = path.join(__dirname, 'src', 'Utils', 'SidebarRoutes.js');
  let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  const sidebarInsertRegex = /(routes:\[\s*\n)((?:\s*{[^}]+},?\s*\n)*)(\s*\])/;

  const newSidebarEntry = `            {
                path: '/${name.toLowerCase()}',
                name: '${capitalize(name)}',
                icon: TableChartIcon,
            },\n`;

  sidebarContent = sidebarContent.replace(sidebarInsertRegex, (_, before, routes, after) => {
    return before + routes + newSidebarEntry + after;
  });

  fs.writeFileSync(sidebarPath, sidebarContent);

  // === Agregar ruta al archivo Routes.jsx ===
  const routesPath = path.join(__dirname, 'src', 'Routes.jsx');
  let routesContent = fs.readFileSync(routesPath, 'utf8');

  const importStatement = `import ${capitalize(name)} from '@/pages/${capitalize(name)}/Index';\n`;
  if (!routesContent.includes(importStatement)) {
    routesContent = importStatement + routesContent;
  }

  const routeEntry = `                    <Route path="/${name.toLowerCase()}" element={<${capitalize(name)} />} />\n`;

  routesContent = routesContent.replace(
    /(<Route path="\/" element={<Layout\s*\/>}>\s*\n)/,
    `$1${routeEntry}`
  );

  fs.writeFileSync(routesPath, routesContent);

  console.log(`✅ Carpeta '${name}' generada con éxito en src/pages/`);
  console.log(`🧭 Ruta agregada a SidebarRoutes.js y Routes.jsx`);
})();

