const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxM1-N0kqR_vWO1Q_EN4GfIiN4QjofY3CDLZfs0124B4Mz05LyvA8HPyAt3ti9kx9nH/exec';

document.getElementById('formSupervision').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(e.target));

    // Mapeo para el demo
    const SUPERVISORES_DB = {
        'guillen.julian1985@gmail.com': 'Guillen Julian',
        'test@gmail.com': 'Usuario de Prueba'
    };
    datos.supervisor = SUPERVISORES_DB[datos.email?.toLowerCase()] || 'Supervisor Invitado';

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