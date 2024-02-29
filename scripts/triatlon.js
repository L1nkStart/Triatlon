document.getElementById('initTime').value = new Date().toLocaleTimeString("en-US", { hour12: false })
const participantes = JSON.parse(localStorage.getItem("participantes"));
const bt1 = document.getElementById('bt1');
const bt2 = document.getElementById('bt2');
let multiplier = 1

//el nombre lo dice
function mostrarDetallesDeParticipantes(participantes) {
    const participantsContainer = document.getElementById('participantsContainer');
    //Muestra un card por cada participante
    participantes.forEach((participante, index) => {
        const participantDetails = document.createElement('div');
        participantDetails.innerHTML = `
        <article>
            <div class="article-wrapper">
            <figure>
                <img src="../assets/gobernacion.jpg" alt="" />
            </figure>
            <div class="article-body">
                <p><strong>Cédula:</strong> ${participante.cedula}</p>
                <p><strong>Nombre:</strong> ${participante.nombre}</p>
                <p><strong>Municipio:</strong> ${participante.municipio}</p>
                <p><strong>Edad:</strong> ${participante.edad}</p>
                <div class="checkbox-wrapper-10">
                    <input class="tgl tgl-flip" id="${participante.id}" type="checkbox" checked />
                    <label class="tgl-btn" data-tg-off="F" data-tg-on="Va!" for="${participante.id}"></label>
                </div>
            </div>
        </article>
`;
        participantsContainer.appendChild(participantDetails);
    });
}

function descalificarInasistentes() {
    participantes.forEach(participante => {
        let checkBox = document.getElementById(`${participante.id}`)
        if(checkBox.checked == false){
            participante.disqualified = true
        }else{
            participante.disqualified = false
        }
    });
}

//define la velocidad de los participantes
function setMultiplier(value) {
    bt1.addEventListener('click', () => {
        bt1.style.display = 'none';
        bt2.style.display = 'initial';

    });
    bt2.addEventListener('click', () => {
        bt2.style.display = 'none';
        bt1.style.display = 'initial';
    });
    multiplier = value;
}

function empezarTriatlon() {
    //descalifica inacistentes
    descalificarInasistentes()

    //define la hora de inicio
    const initTime = document.getElementById('initTime').value;
    const validTimeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // Expresión regular para el formato HH:MM:SS
    if (!validTimeRegex.test(initTime)) {
        alert('Ingrese una hora válida en formato HH:MM:SS.');
        return;
    }
    const currentDate = new Date();
    const [hours, minutes, seconds] = initTime.split(':');
    const fullInitTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        seconds
    );

    // Asignar la hora de inicio clonando la fecha
    participantes.forEach(participant => {
        participant['caminata.inicio']= new Date(fullInitTime);
    });

    // Pasar la lista de participantes a la página de seguimiento
    localStorage.setItem("participantes", JSON.stringify(participantes));
    localStorage.setItem("multiplier", multiplier);

    // Redirigir a la página de seguimiento
    window.location.href = "../pages/seguimiento.html";
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarDetallesDeParticipantes(participantes);
});




