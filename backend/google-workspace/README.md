# Google Workspace / Google Sheets Backend

Este backend está pensado para desplegarse como una Apps Script Web App y usar la hoja de cálculo como storage de usuarios y datos.

Proporciona:

- Login con email y contraseña desde la hoja `Users`
- Almacenamiento de envíos en la hoja `Submissions`

## Pasos de configuración

1. Crea una Google Spreadsheet en tu cuenta de Workspace.
2. Renombra la primera hoja a `Users` y pon en la fila 1 estos encabezados exactos:
   - `email`
   - `password`
   - `supervisorName`
   - `enabled`

3. Agrega usuarios de ejemplo en `Users`. Por ejemplo:
   - `supervisor1@tu-dominio.com`, `demo123`, `Juan Pérez`, `si`
   - `supervisor2@tu-dominio.com`, `demo123`, `María López`, `si`
   - `supervisor3@tu-dominio.com`, `demo123`, `Pedro Gómez`, `no`

4. Crea una segunda hoja llamada `Submissions` y pon en la fila 1 estos encabezados:
   - `timestamp`
   - `supervisor`
   - `email`
   - `cliente`
   - `sucursal`
   - `fechaInicio`
   - `horaInicio`
   - `fechaFin`
   - `horaFin`
   - `objetivo`
   - `nombreAgente`
   - `legajo`
   - `uniforme`
   - `credencial`
   - `aseo`
   - `supervisorEntrega`
   - `empleadoEntrega`
   - `entrevistaVigilador`
   - `eventos`
   - `eventoOtro`
   - `exito`
   - `novedad`
   - `descNovedad`
   - `foto`

5. Abre Apps Script desde la hoja: `Extensiones -> Apps Script`.
6. Reemplaza el código existente con el contenido de `Code.gs`.
7. En el proyecto de Apps Script, crea o actualiza `appsscript.json` con el contenido proporcionado.
8. Configura la propiedad del script `SPREADSHEET_ID` con el ID de tu hoja de cálculo:
   - `Proyecto` -> `Propiedades del proyecto` -> `Script properties`
   - Agrega `SPREADSHEET_ID` = `<ID de tu hoja>`

9. Despliega la app como Web App:
   - `Deploy` -> `New deployment`
   - `Select type` -> `Web app`
   - `Execute as`: `User deploying`
   - `Who has access`: `Anyone`
   - `Deploy`
10. Copia la URL del Web App.

## Configuración del frontend

En la raíz del proyecto crea o actualiza `.env` con:

```
VITE_GOOGLE_BACKEND_URL="https://script.google.com/macros/s/XXXXXXXX/exec"
```

- `VITE_GOOGLE_BACKEND_URL` debe ser la URL del Web App.

## Notas

- El login ahora usa `email` y `password` guardados en la hoja `Users`.
- El backend espera que `enabled` esté en `si` para permitir el acceso.
- Si no se configura el backend, la app mostrará un mensaje de error en la pantalla de login.

## Mejoras posibles

- Agregar un endpoint `register` para crear usuarios desde una interfaz.
- Encriptar contraseñas antes de guardarlas en la hoja.
- Agregar un rol `admin` o `supervisor` y más campos de perfil.
