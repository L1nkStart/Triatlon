// seguimiento.js

document.addEventListener('DOMContentLoaded', () => {
    // Obtener la lista de participantes desde el almacenamiento local
    const participantes = JSON.parse(localStorage.getItem("participantes"));

    // Lógica para iniciar y seguir el triatlón en la página de seguimiento
    // ...

    // Puedes usar la lista de participantes para mostrar información relevante en esta página
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
