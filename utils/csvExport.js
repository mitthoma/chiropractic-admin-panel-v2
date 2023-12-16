// Import the necessary dependencies
import { saveAs } from "file-saver";
import { cellMappings } from "./cellMappings";
import * as XLSX from "xlsx";

// Helper function to convert an alphanumeric cell reference to row and column index
function cellReferenceToIndex(ref) {
  const match = ref.match(/([A-Z]+)(\d+)/);
  const col = match[1]
    .split("")
    .reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 64, 0);
  const row = parseInt(match[2], 10);
  return { row: row - 1, col: col - 1 };
}

//   function applyMergedCells(cells, mergedCells) {
//     for (const [startRef, endRef] of mergedCells) {
//       const { row: startRow, col: startCol } = cellReferenceToIndex(startRef);
//       const { row: endRow, col: endCol } = cellReferenceToIndex(endRef);

//       for (let row = startRow; row <= endRow; row++) {
//         for (let col = startCol; col <= endCol; col++) {
//           if (row !== startRow || col !== startCol) {
//             cells[row][col] = null;
//           }
//         }
//       }
//     }
//   }

// Define the generateCSV function
export function generateCSV(payload) {
  // Create a 2D array representing the cells of the CSV content
  const rows = 62; // Define the number of rows
  const cols = 29; // Define the number of columns (A to AC)
  const cells = new Array(rows).fill(null).map(() => new Array(cols).fill(""));
  // Populate the cells based on the cell mappings
  for (const [ref, value] of Object.entries(cellMappings)) {
    const { row, col } = cellReferenceToIndex(ref);
    console.log("row is ", row, " and col is ", col);
    console.log("cells are ", cells);
    try {
      if (typeof value === "function") {
        cells[row][col] = value(payload);
      } else {
        cells[row][col] = value;
      }
    } catch (error) {
      console.error(`Error populating cell ${ref}:`, error);
      cells[row][col] = ""; // Set an empty string or a default value in case of error
    }
  }

  // Apply merged cells
  //   applyMergedCells(cells, mergedCells);

  // Convert the 2D array to a CSV formatted string
  const csvContent = cells
    .map((row) => row.filter((cell) => cell !== null).join(","))
    .join("\n");

  // Create a Blob object with the CSV file content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Export the CSV file to the user
  saveAs(blob, "exported_data.csv");
}

// Define the generateXLSX function
export function generateXLSX(payload, exportAsPDF = false, getPdfMakeInstance) {
  // Create a 2D array representing the cells of the XLSX content
  const rows = 42; // Define the number of rows
  const cols = 29; // Define the number of columns (A to AC)
  const cells = new Array(rows).fill(null).map(() => new Array(cols).fill(""));

  // Populate the cells based on the cell mappings
  for (const [ref, value] of Object.entries(cellMappings)) {
    const { row, col } = cellReferenceToIndex(ref);
    try {
      if (typeof value === "function") {
        cells[row][col] = value(payload);
      } else {
        cells[row][col] = value;
      }
    } catch (error) {
      console.error(`Error populating cell ${ref}:`, error);
      cells[row][col] = ""; // Set an empty string or a default value in case of error
    }
  }

  // Apply merged cells
  // applyMergedCells(cells, mergedCells);

  // Create a worksheet object
  const ws = XLSX.utils.aoa_to_sheet(cells);

  // Apply merged cells to the worksheet
  // ws['!merges'] = mergedCells.map(({ start, end }) => {
  //   return {
  //     s: cellReferenceToIndex(start),
  //     e: cellReferenceToIndex(end),
  //   };
  // });

  // Create a workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  if (exportAsPDF) {
    // const pdfMakeInstance = getPdfMakeInstance(); // Get the pdfMake instance using the provided function
    // generatePDF(wb, pdfMakeInstance);
  } else {
    // Export the XLSX file to the user
    const wopts = { bookType: "xlsx", bookSST: false, type: "array" };
    const wbout = XLSX.write(wb, wopts);
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "exported_data.xlsx");
  }
}

//   async function generatePDF(xlsxData, pdfMakeInstance) {
//     // const pdfFonts = await import('pdfmake/build/vfs_fonts');
//     // console.log('pdf fonts is ', pdfFonts);
//     // pdfMakeInstance.vfs = pdfFonts.pdfMake.vfs;

//     const cols = 29; // Define the number of columns (A to AC)
//     const jsonData = XLSX.utils.sheet_to_json(xlsxData.Sheets[xlsxData.SheetNames[0]], { header: 1 });
//     const content = jsonData.map(row => {
//       const newRow = [];
//       for (let i = 0; i < cols; i++) {
//         newRow.push({ text: row[i] || '', style: 'tableCell' });
//       }
//       return newRow;
//     }).filter(row => row.some(cell => cell.text !== '')); // Filter out empty rows

//     content[0] = content[0].map(cell => {
//       if (cell.text === '') {
//         return cell; // Skip empty header cells
//       }
//       return { ...cell, style: 'tableHeader' }; // Style non-empty header cells
//     });

//     const docDefinition = {
//       content: [
//         {
//           table: {
//             headerRows: 1,
//             body: content,
//             widths: [30, 50, 50, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // Set specific widths for each column as numbers
//           },
//         },
//       ],
//       styles: {
//         tableHeader: {
//           bold: true,
//           fontSize: 10,
//           color: 'white',
//           fillColor: '#2d4154',
//         },
//         tableCell: {
//           margin: [3, 1, 3, 1],
//           fontSize: 8,
//         },
//       },
//       defaultStyle: {
//         fontSize: 8,
//       },
//       pageOrientation: 'landscape',
//     };

//     const pdfDoc = pdfMakeInstance.createPdf(docDefinition);
//     pdfDoc.download('exported_data.pdf');
//   }
