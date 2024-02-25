// script.js

let participantes = [];

function agregarParticipante() {
    const participantNumber = participantes.length + 1;

    const participantHtml = `
        <div class="participant">
            <h2>Participante ${participantNumber}</h2>
            <label for="cedula${participantNumber}">Cédula:</label>
            <input type="text" id="cedula${participantNumber}" required>
            
            <label for="nombre${participantNumber}">Nombre:</label>
            <input type="text" id="nombre${participantNumber}" required>

            <label for="municipio${participantNumber}">Municipio:</label>
            <input type="text" id="municipio${participantNumber}" required>

            <label for="edad${participantNumber}">Edad:</label>
            <input type="number" id="edad${participantNumber}" required>
        </div>
    `;

    document.getElementById('participantsContainer').insertAdjacentHTML('beforeend', participantHtml);
}

function registrarParticipantes() {
    const participantElements = document.querySelectorAll('.participant');
    
    participantElements.forEach((participantElement, index) => {
        const cedula = document.getElementById(`cedula${index + 1}`).value;
        const nombre = document.getElementById(`nombre${index + 1}`).value;
        const municipio = document.getElementById(`municipio${index + 1}`).value;
        const edad = document.getElementById(`edad${index + 1}`).value;

        const participante = {
            cedula,
            nombre,
            municipio,
            edad,
            caminata: { inicio: '', fin: '', tiempo: 0 },
            natacion: { inicio: '', fin: '', tiempo: 0 },
            ciclismo: { inicio: '', fin: '', tiempo: 0 },
            descalificado: false
        };

        participantes.push(participante);
    });

    // Mostrar participantes en pantalla
    mostrarParticipantesEnPantalla();
}

function mostrarParticipantesEnPantalla() {
    const participantesList = participantes.map((participante, index) => `
        <div>
            <h3>Participante ${index + 1}</h3>
            <p><strong>Cédula:</strong> ${participante.cedula}</p>
            <p><strong>Nombre:</strong> ${participante.nombre}</p>
            <p><strong>Municipio:</strong> ${participante.municipio}</p>
            <p><strong>Edad:</strong> ${participante.edad}</p>
        </div>
    `).join('');

    document.getElementById('participantsContainer').innerHTML = participantesList;
}

function empezarTriatlon() {
    // Redirigir a la página de seguimiento
    window.location.href = "../pages/seguimiento.html";

    // Pasar la lista de participantes a la página de seguimiento
    localStorage.setItem("participantes", JSON.stringify(participantes));
}
