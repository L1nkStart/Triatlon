let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
let flag = 0;

function agregarParticipante() {
    if(flag == 0){
        const participantNumber = participantes.length + 1;
        const participants = `
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
        document.getElementById('participantsContainer').insertAdjacentHTML('beforeend', participants);
        flag = 1
    }else{
        alert('Solo puede ingresar un participante a la vez.')
    }
}

function registrarParticipantes() {
    const participantElements = document.querySelectorAll('.participant');
    var index = participantes.length;
    
    participantElements.forEach((participantElement) => {
        const cedula = document.getElementById(`cedula${index + 1}`).value;
        const nombre = document.getElementById(`nombre${index + 1}`).value;
        const municipio = document.getElementById(`municipio${index + 1}`).value;
        const edad = document.getElementById(`edad${index + 1}`).value;
        const participante = {
            id: index + 1,
            cedula,nombre,municipio,edad,
            startTime: '',
            walkDistance: 0,
            swimDistance: 0,
            cycleDistance: 0,
            reference: '',
            disqualified: false
        };
        participantes.push(participante);
    });
    flag = 0
    // Mostrar participantes en pantalla
    mostrarParticipantesEnPantalla();
}

function mostrarParticipantesEnPantalla() {
    const participantesList = participantes.map((participante, index) => `
            <article class="grid">
                <div class="article-wrapper">
                <figure>
                    <img src="../assets/gobernacion.jpg" alt="" />
                </figure>
                <div class="article-body">
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
  
// Eliminar el participante del array utilizando el índice
function deleteParticipant(index) {
    participantes.splice(index - 1, 1);
    num = participantes.length;
    flag = 0
    mostrarParticipantesEnPantalla();
}

// Redirigir a la página de seguimiento
function empezarTriatlon() {
    // Pasar la lista de participantes a la página de seguimiento
    localStorage.setItem("participantes", JSON.stringify(participantes));
    window.location.href = "../index.html";
}
window.onload = mostrarParticipantesEnPantalla;