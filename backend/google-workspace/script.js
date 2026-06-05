const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxM1-N0kqR_vWO1Q_EN4GfIiN4QjofY3CDLZfs0124B4Mz05LyvA8HPyAt3ti9kx9nH/exec';

// Lógica para el Canvas de Firma
const canvas = document.getElementById('firmaCanvas');
let dibujando = false;
let ctx = null;

if (canvas) {
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    const obtenerPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const empezar = (e) => {
        dibujando = true;
        const pos = obtenerPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        if (e.type === 'touchstart') e.preventDefault();
    };

    const mover = (e) => {
        if (!dibujando) return;
        const pos = obtenerPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    canvas.addEventListener('mousedown', empezar);
    canvas.addEventListener('mousemove', mover);
    window.addEventListener('mouseup', () => dibujando = false);
    canvas.addEventListener('touchstart', empezar, { passive: false });
    canvas.addEventListener('touchmove', mover, { passive: false });
    canvas.addEventListener('touchend', () => dibujando = false);

    // Lógica para el botón limpiar
    document.getElementById('btnLimpiarFirma')?.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

document.getElementById('formSupervision').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(e.target));

    // Mapeo para el demo
    const SUPERVISORES_DB = {
        'guillen.julian1985@gmail.com': 'Guillen Julian',
        'test@gmail.com': 'Usuario de Prueba'
    };
    datos.supervisor = SUPERVISORES_DB[datos.email?.toLowerCase()] || 'Supervisor Invitado';

    // Capturamos la firma como imagen Base64
    if (canvas) {
        datos.firma = canvas.toDataURL(); 
    }

    // Mostramos en la consola del navegador lo que estamos por enviar
    console.log('Enviando datos al servidor:', datos);

    try {
        await fetch(GOOGLE_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify(datos)
        });

        alert('¡Datos enviados con éxito!');
        e.target.reset();
    } catch (error) {
        alert('Error al enviar. Revisa la consola.');
        console.error(error);
    }
});