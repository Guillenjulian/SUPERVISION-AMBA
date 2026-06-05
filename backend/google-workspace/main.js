function doPost(e) {
  const SPREADSHEET_ID = 'AKfycbxM1-N0kqR_vWO1Q_EN4GfIiN4QjofY3CDLZfs0124B4Mz05LyvA8HPyAt3ti9kx9nH'; 
  const SHEET_NAME = 'Hoja 1';

  try {
    // Verificamos que lleguen datos
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No se recibieron datos en la petición POST");
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("No se encontró la pestaña con el nombre: " + SHEET_NAME);
    }

    // Intentamos parsear los datos desde el cuerpo de la petición
    let datos;
    try {
      datos = JSON.parse(e.postData.contents);
    } catch (f) {
      // Si falla el parseo directo, intentamos obtenerlos de los parámetros
      datos = e.parameter;
    }

    // Esto aparecerá en "Ejecuciones" dentro del editor de Google Apps Script
    console.log('Datos procesados en el backend:', JSON.stringify(datos));

    // Lógica para guardar la firma como archivo .png en Google Drive
    let firmaUrl = 'Sin firma';
    if (datos.firma && datos.firma.includes('base64,')) {
      try {
        const folderName = "Firmas_Supervision"; // Nombre de la carpeta en Drive
        let folder;
        const folders = DriveApp.getFoldersByName(folderName);
        
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(folderName);
        }

        const base64Data = datos.firma.split(',')[1];
        const nombreArchivo = "Firma_" + (datos.nombreAgente || "Empleado") + "_" + Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss") + ".png";
        const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/png", nombreArchivo);
        const file = folder.createFile(blob);
        firmaUrl = file.getUrl(); // Obtenemos el link para la auditoría
      } catch (err) {
        console.error('Error al guardar firma en Drive:', err.toString());
        firmaUrl = 'Error al generar archivo .png';
      }
    }

    sheet.appendRow([
      new Date(),
      datos.supervisor || 'N/A',
      datos.email || 'N/A',
      datos.sector || 'N/A',
      datos.estado || 'N/A',
      datos.observaciones || '',
      firmaUrl // Guardamos el link al archivo .png en Drive
    ]);

    return responder({ result: "success" });
  } catch (error) {
    // Esto aparecerá en los registros (Logs) de Google Apps Script
    console.error('Error detectado:', error.toString());
    return responder({ result: "error", error: error.toString() });
  }
}

// Agregamos doGet para evitar errores si abres el link en el navegador directamente
function doGet() {
  return ContentService.createTextOutput("La Web App está activa. Usa POST para enviar datos.");
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
