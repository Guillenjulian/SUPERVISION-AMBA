function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ error: 'GET no soportado. Usar POST.' })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (!payload.action) {
      return errorResponse('Falta campo action');
    }

    switch (payload.action) {
      case 'login':
        return loginHandler(payload);
      case 'submit':
        return submitHandler(payload);
      case 'listUsers':
        return listUsersHandler();
      default:
        return errorResponse('Acción desconocida');
    }
  } catch (err) {
    return errorResponse('JSON inválido o error interno: ' + err.message);
  }
}

function loginHandler(payload) {
  const email = payload.email && payload.email.toString().trim().toLowerCase();
  const password = payload.password && payload.password.toString();
  if (!email || !password) {
    return errorResponse('Falta email o contraseña');
  }

  const user = findSupervisorByEmailAndPassword(email, password);
  if (!user) {
    return errorResponse('Email o contraseña incorrectos');
  }
  if (user.enabled.toString().trim().toLowerCase() !== 'si') {
    return errorResponse('Usuario deshabilitado.');
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, supervisor: user.supervisorName, email: email })
  ).setMimeType(ContentService.MimeType.JSON);
}

function submitHandler(payload) {
  const data = payload.data;
  if (!data) {
    return errorResponse('Falta campo data');
  }

  appendSubmission(data);

  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}

function listUsersHandler() {
  const sheet = getUsersSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const users = rows.map(function (row) {
    const user = {};
    headers.forEach(function (header, index) {
      user[header] = row[index];
    });
    return user;
  });
  return ContentService.createTextOutput(JSON.stringify({ success: true, users: users })).setMimeType(ContentService.MimeType.JSON);
}

function findSupervisorByEmailAndPassword(email, password) {
  const sheet = getUsersSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const emailIndex = headers.indexOf('email');
  const passwordIndex = headers.indexOf('password');
  const supervisorIndex = headers.indexOf('supervisorName');
  const enabledIndex = headers.indexOf('enabled');

  if (emailIndex < 0 || passwordIndex < 0 || supervisorIndex < 0 || enabledIndex < 0) {
    throw new Error('La hoja Users debe tener columnas email, password, supervisorName, enabled');
  }

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (
      row[emailIndex] &&
      row[passwordIndex] &&
      row[emailIndex].toString().trim().toLowerCase() === email.toLowerCase() &&
      row[passwordIndex].toString() === password
    ) {
      return {
        supervisorName: row[supervisorIndex],
        enabled: row[enabledIndex],
      };
    }
  }
  return null;
}

function appendSubmission(data) {
  const sheet = getSubmissionsSheet();
  const now = new Date();
  const values = [
    now.toISOString(),
    data.supervisor || '',
    data.email || '',
    data.cliente || '',
    data.sucursal || '',
    data.fechaInicio || '',
    data.horaInicio || '',
    data.fechaFin || '',
    data.horaFin || '',
    data.objetivo || '',
    data.nombreAgente || '',
    data.legajo || '',
    data.uniforme || '',
    data.credencial || '',
    data.aseo || '',
    data.supervisorEntrega ? data.supervisorEntrega.join(', ') : '',
    data.empleadoEntrega ? data.empleadoEntrega.join(', ') : '',
    data.entrevistaVigilador || '',
    data.eventos ? data.eventos.join(', ') : '',
    data.eventoOtro || '',
    data.exito || '',
    data.novedad || '',
    data.descNovedad || '',
    data.foto || '',
  ];
  sheet.appendRow(values);
}

function getSpreadsheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID no configurado en Script Properties');
  }
  return SpreadsheetApp.openById(spreadsheetId);
}

function getUsersSheet() {
  const ss = getSpreadsheet();
  return ss.getSheetByName('Users');
}

function getSubmissionsSheet() {
  const ss = getSpreadsheet();
  return ss.getSheetByName('Submissions');
}

function errorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({ success: false, error: message })).setMimeType(ContentService.MimeType.JSON);
}
