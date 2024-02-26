let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
console.log(participantes)
let num = 0;


function agregarParticipante() {
    const participantNumber = num + 1;

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
            id: index + 1,
            cedula,
            nombre,
            municipio,
            edad,
            startTime: '',
            caminata: { inicio: '', fin: '', tiempo: 0 },
            natacion: { inicio: '', fin: '', tiempo: 0 },
            ciclismo: { inicio: '', fin: '', tiempo: 0 },
            walkDistance: 0,
            swimDistance: 0,
            cycleDistance: 0,
            reference: '',
            disqualified: false
        };

        participantes.push(participante);
    });

    // Mostrar participantes en pantalla
    mostrarParticipantesEnPantalla();
}

function mostrarParticipantesEnPantalla() {
    const participantesList = participantes.map((participante, index) => `
            <article>
                <div class="article-wrapper">
                <figure>
                    <img src="https://picsum.photos/id/1011/800/450" alt="" />
                </figure>
                <div class="article-body">
                    <h3>Participante ${index + 1}</h3>
                    <p><strong>Cédula:</strong> ${participante.cedula}</p>
                    <p><strong>Nombre:</strong> ${participante.nombre}</p>
                    <p><strong>Municipio:</strong> ${participante.municipio}</p>
                    <p><strong>Edad:</strong> ${participante.edad}</p>
                    <button onclick="deleteParticipant(${index + 1})">Eliminar</button>

                </div>
            </article>
            
    `).join('');

    document.getElementById('participantsContainer').innerHTML = participantesList;
}

function deleteParticipant(index) {
    // Eliminar el participante del array utilizando el índice
    participantes.splice(index - 1, 1);

    // Volver a mostrar la lista actualizada
    mostrarParticipantesEnPantalla();
}

function empezarTriatlon() {
    // Redirigir a la página de seguimiento
    window.location.href = "../index.html";

    // Pasar la lista de participantes a la página de seguimiento
    localStorage.setItem("participantes", JSON.stringify(participantes));
}
window.onload = mostrarParticipantesEnPantalla;