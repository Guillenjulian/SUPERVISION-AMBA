# Configuración de Firmas en Google Sheets

## 🔧 Pasos de Configuración

### 1. **Actualizar la hoja de Submissions en Google Sheets**

Agregar una nueva columna al final:
- **Nombre:** `firma` (debe ser exactamente así)
- **Posición:** Después de la columna `foto`
- **Tipo:** Texto (URL)

**Encabezados esperados en orden:**
```
timestamp | supervisor | email | cliente | sucursal | fechaInicio | horaInicio | fechaFin | horaFin | objetivo | nombreAgente | legajo | uniforme | credencial | aseo | supervisorEntrega | empleadoEntrega | entrevistaVigilador | eventos | eventoOtro | exito | novedad | descNovedad | foto | firma
```

### 2. **Permisos en Google Apps Script**

El script debe tener permisos para:
- ✅ Leer/escribir en Google Sheets
- ✅ Crear archivos en Google Drive
- ✅ Compartir archivos

Estos permisos se solicitarán automáticamente al desplegar.

### 3. **Estructura de Google Drive**

El script creará automáticamente una carpeta llamada **`Firmas_AMBA`** en la misma ubicación que el spreadsheet. Las firmas se guardarán aquí como archivos PNG públicos.

### 4. **Redeploy del Google Apps Script**

Después de actualizar `Code.gs`:

1. En Google Apps Script, haz clic en **"Deploy"** → **"New deployment"**
2. Selecciona tipo: **"Web app"**
3. Ejecuta como: **Tu cuenta**
4. Permite el acceso: **Cualquiera**
5. Copia la URL y actualiza `VITE_GOOGLE_BACKEND_URL` en `.env`

## 📱 Cómo Funciona en la App

### En el Frontend:
1. El usuario firma en el canvas
2. La firma se captura como base64 (imagen PNG)
3. Se envía junto con los demás datos

### En el Backend:
1. Google Apps Script recibe la firma base64
2. La convierte a archivo PNG
3. La sube a Google Drive en la carpeta `Firmas_AMBA`
4. Guarda la URL pública en la columna `firma`

## 🔍 Verificación

Para verificar que todo funciona:

1. **Diligencia el formulario** completamente
2. **Firma en el canvas** (en la sección "Detalles")
3. **Envía el formulario**
4. **Verifica** en Google Sheets:
   - La columna `firma` debe tener una URL
   - La URL debe ser accesible (puedes hacer clic en ella)
   - La firma debe verse como una imagen PNG

## ⚙️ Troubleshooting

### Las firmas no se guardan:
- Verifica que `VITE_GOOGLE_BACKEND_URL` esté configurada correctamente
- Comprueba en Google Apps Script Logs (Ctrl+Enter)
- Asegúrate de que el script tiene permisos de Drive

### Las URLs no funcionan:
- Verifica que el archivo tiene permisos públicos
- Comprueba la carpeta `Firmas_AMBA` en Google Drive

### La columna `firma` no aparece:
- Asegúrate de agregar la columna al final
- El nombre debe ser exactamente `firma` (minúscula)

## 📊 Variables de Entorno

En tu archivo `.env`:
```
VITE_GOOGLE_BACKEND_URL=https://script.google.com/macros/d/{SCRIPT_ID}/usercontent
```

Obtén el `SCRIPT_ID` de la URL de tu Google Apps Script o del deploy web.
