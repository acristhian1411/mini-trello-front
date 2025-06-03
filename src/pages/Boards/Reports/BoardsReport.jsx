import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

// Esto debería venir de una API o Zustand

export default function BoardsReport() {
  const tableRef = useRef();
  const boards = [
    { name: "nuevo", description: "asdf" },
    { name: "pepe", description: "perez" }
  ]; 
  useEffect(() => {
    const generatePdf = () => {
      const opt = {
        margin: 0.5,
        filename: "boards.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };

      html2pdf()
        .set(opt)
        .from(tableRef.current)
        .outputPdf("blob")
        .then((pdfBlob) => {
          const blobUrl = URL.createObjectURL(pdfBlob);
          window.open(blobUrl, "_blank");
        });
    };

    generatePdf();
  }, []);

  return (
    <div>
      <div ref={tableRef}>
        <h2>Reporte de Boards</h2>
        <table border="1" cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) => (
              <tr key={index}>
                <td>{board.name}</td>
                <td>{board.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
