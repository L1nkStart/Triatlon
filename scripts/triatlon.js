const participantes = JSON.parse(localStorage.getItem("participantes"));
document.getElementById('initTime').value = new Date().toLocaleTimeString("en-US", { hour12: false })

document.addEventListener('DOMContentLoaded', () => {
     // Obtener la lista de participantes desde el almacenamiento local
    

    // Mostrar información relevante en esta página
    mostrarDetallesDeParticipantes(participantes);
});

function mostrarDetallesDeParticipantes(participantes) {
    const participantsContainer = document.getElementById('participantsContainer');

    participantes.forEach((participante, index) => {
        const participantDetails = document.createElement('div');
        participantDetails.innerHTML = `
            <h3>Participante ${index + 1}</h3>
            <p><strong>Cédula:</strong> ${participante.cedula}</p>
            <p><strong>Nombre:</strong> ${participante.nombre}</p>
            <p><strong>Municipio:</strong> ${participante.municipio}</p>
            <p><strong>Edad:</strong> ${participante.edad}</p>
        `;

        participantsContainer.appendChild(participantDetails);
    });
}
function empezarTriatlon() {
    const initTime = document.getElementById('initTime').value;

    // Validación de entrada: asegurarse de que la hora proporcionada sea válida
    const validTimeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // Expresión regular para el formato HH:MM:SS
    if (!validTimeRegex.test(initTime)) {
        alert('Ingrese una hora válida en formato HH:MM:SS.');
        return;
    }

    const currentDate = new Date();
    
    // Divide la hora proporcionada en horas, minutos y segundos
    const [hours, minutes, seconds] = initTime.split(':');

    // Establece la fecha actual con la hora proporcionada
    const fullInitTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        seconds
    );

    console.log(fullInitTime)
    // Lógica para iniciar y seguir el triatlón en la página de seguimiento
    participantes.forEach(element => {
        // Asignar la hora de inicio clonando la fecha
        element.caminata.inicio = new Date(fullInitTime);
    });

    // Pasar la lista de participantes a la página de seguimiento
    localStorage.setItem("participantes", JSON.stringify(participantes));

    // Redirigir a la página de seguimiento
    window.location.href = "../pages/seguimiento.html";
}


