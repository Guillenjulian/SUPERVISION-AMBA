function doPost(e) {
  // 1. Abre la hoja de cálculo por su ID (está en la URL de tu Google Sheet)
  const ss = SpreadsheetApp.openById("19YW64pHSANKXaagK720EZ-9_iKG4mc_1w15uKYy-BGM");
  const sheet = ss.getSheetByName("Hoja 1"); // Asegúrate de que el nombre coincida

  try {
    // 2. Extrae los datos que vienen del formulario (JSON)
    const payload = JSON.parse(e.postData.contents);
    const data = payload.data || payload;

    // 3. Procesar firma si existe
    let firmaUrl = '';
    if (data.firma && data.firma.startsWith('data:image')) {
      firmaUrl = saveSignatureToDrive(data.firma, data.nombreAgente || 'Firma');
    }

    // 4. Agrega los datos a la hoja de cálculo
    const fecha = new Date();
    sheet.appendRow([
      fecha,
      data.supervisor || '',
      data.cliente || '',
      data.sucursal || '',
      data.fechaInicio || '',
      data.horaInicio || '',
      data.fechaFin || '',
      data.horaFin || '',
      data.nombreAgente || '',
      data.legajo || '',
      data.uniforme || '',
      data.credencial || '',
      data.aseo || '',
      data.novedad || '',
      data.descNovedad || '',
      data.foto ? data.foto.name : '',
      firmaUrl,
    ]);

    // 5. Responde que todo salió bien
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Si hay un error, lo devolvemos
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// FUNCIÓN: Guardar firma en Google Drive
function saveSignatureToDrive(base64Data, nombreAgente) {
  try {
    // Extraer la parte base64
    const base64String = base64Data.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, '');
    const binaryData = Utilities.base64Decode(base64String);
    const blob = Utilities.newBlob(binaryData, 'image/png', 'firma_' + nombreAgente + '_' + new Date().getTime() + '.png');
    
    // Crear/obtener carpeta de firmas
    const firmasFolder = getOrCreateFolder('Firmas_AMBA');
    const file = firmasFolder.createFile(blob);
    
    // Hacer archivo público
    file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (err) {
    Logger.log('Error guardando firma: ' + err.message);
    return '';
  }
}

// FUNCIÓN: Crear o obtener carpeta
function getOrCreateFolder(folderName) {
  // Obtener la carpeta raíz
  const rootFolder = DriveApp.getRootFolder();
  
  // Buscar si ya existe
  const folders = rootFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  
  // Si no existe, crear
  return rootFolder.createFolder(folderName);
}
