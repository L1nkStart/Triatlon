
let participants = JSON.parse(localStorage.getItem("participantes"));
let endRace = false 

function calculateFinishTime(startTime) {
    const currentTime = new Date()
    const elapsedTime = (currentTime.getTime() - startTime.getTime() - 100) / 1000; // Tiempo transcurrido en segundos.
    return elapsedTime
}

function startTriathlon() {
    // Inicia el triatlón para cada participante.
    
    participants.forEach(participant => {

        // Inicia la primera disciplina (caminata) y establece la distancia máxima y la velocidad.
        participant.maxWalkDistance = 10000; // 10 km
        participant.walkVelocity = 7 / 3.600; // 7 km/h convertido a m/s

        // Inicia la segunda disciplina (natación) con los mismos principios.
        participant.maxSwimDistance = 10000; // 10 km
        participant.swimVelocity = 1.72; // 1.72 m/s

        // Inicia la tercera disciplina (ciclismo) con los mismos principios.
        participant.maxCycleDistance = 30000; // 30 km
        participant.cycleVelocity = 45 / 3.600; // 45 km/h convertido a m/s

        participant.currentVelocity = 0

        participant.reference = new Date()

        participant.startTime = new Date(participant.caminata.inicio)

        participant.caminata.inicio = new Date(participant.caminata.inicio).toLocaleTimeString()


    });


    // Inicia un intervalo que simula el progreso de cada disciplina cada segundo.
    setInterval(() => {
        if (!endRace) { // Verifica si la carrera aún no ha terminado
            console.log(participants)

            participants.forEach(participant => {
                simulateDiscipline(participant);
            });
            displayTable();

            // Verifica si la carrera ha terminado para todos los participantes
            endRace = participants.every(participant => participant.ciclismo.fin);
        }
    }, 1000);
}

function simulateDiscipline(participant) {

    // Si la caminata no ha terminado, continúa simulando.
    if (!participant.caminata.fin && !participant.disqualified) {
        if (participant.walkDistance < participant.maxWalkDistance) {
            participant.currentVelocity = calculateRandomDistance(participant.walkVelocity);
            if( participant.currentVelocity > 1){
                participant.walkDistance += participant.currentVelocity;
            }else{
                participant.disqualified = true
            }
        } else {
            participant.caminata.tiempo = calculateFinishTime(participant.reference);
            participant.caminata.fin = new Date(participant.startTime.getTime() + participant.caminata.tiempo*1000).toLocaleTimeString("en-US", { hour12: true });
            participant.natacion.inicio = participant.caminata.fin;
        }
    }

    // Si la natación no ha terminado, continúa simulando.
    if (participant.caminata.fin && !participant.disqualified) {
        if (participant.swimDistance < participant.maxSwimDistance && participant.natacion.inicio) {
            participant.currentVelocity = calculateRandomDistance(participant.swimVelocity);
            if( participant.currentVelocity > 1){
                participant.swimDistance += participant.currentVelocity;
            }else{
                participant.disqualified = true
            }
        } else {
            if(!participant.ciclismo.inicio){
                // Ha terminado la natación, registra la hora de finalización y pasa al ciclismo.
                participant.natacion.tiempo = calculateFinishTime(participant.reference);
                participant.natacion.fin = new Date(participant.startTime.getTime() + participant.natacion.tiempo * 1000).toLocaleTimeString("en-US", { hour12: true });
                participant.ciclismo.inicio = participant.natacion.fin;
            }
            
        }
    }

    // Si el ciclismo no ha terminado, continúa simulando.
    if (participant.natacion.fin && !participant.disqualified) {
        if (participant.cycleDistance < participant.maxCycleDistance && participant.ciclismo.inicio) {
            participant.cycleDistance += calculateRandomDistance(participant.cycleVelocity);
        } else {
            if(!participant.ciclismo.fin){
                // Ha terminado el ciclismo, registra la hora de finalización.
                participant.ciclismo.tiempo = calculateFinishTime(participant.reference);
                participant.ciclismo.fin = new Date(participant.startTime.getTime() + participant.ciclismo.tiempo * 1000).toLocaleTimeString("en-US", { hour12: true });
            }
        }
    }
}



function calculateRandomDistance(velocity) {
    // var random = Math.random()
    // console.log(random, random * velocity)
    // return random * velocity; 
    return 1000
}

function displayTable() {
    const participantsContainer = document.getElementById('participantsContainer');

    // Limpiar el contenido anterior para actualizar la tabla.
    participantsContainer.innerHTML = '';

    participants.forEach(participant => {
        const participantDetails = document.createElement('div');
        participantDetails.className = 'participant-details';

        // Crear una fila para cada participante.
        const row = document.createElement('div');
        row.className = 'participant-row';

        // Añadir información del participante a la fila.
        row.innerHTML = `
            <div class="participant-cell">id ${participant.id}</div>
            <div class="participant-cell">cedula ${participant.cedula}</div>
            <div class="participant-cell">nombre ${participant.nombre}</div>
            <div class="participant-cell">municipio ${participant.municipio}</div>
            <div class="participant-cell">edad ${participant.edad}</div>
            <div class="participant-cell">caminata start ${participant.caminata.inicio || '-'}</div>
            <div class="participant-cell">caminata ${participant.walkDistance.toFixed(2)} m</div>
            <div class="participant-cell">swin start${participant.natacion.inicio || '-'}</div>
            <div class="participant-cell">swin ${participant.swimDistance.toFixed(2)} m</div>
            <div class="participant-cell">cycle start${participant.ciclismo.inicio || '-'}</div>
            <div class="participant-cell">cycle${participant.cycleDistance.toFixed(2)} m</div>
            <div class="participant-cell">final ${participant.ciclismo.fin || '-'}</div>
        `;

        // Añadir la fila al contenedor de participantes.
        participantDetails.appendChild(row);
        participantsContainer.appendChild(participantDetails);
    });
}

// Llama a la función startTriathlon cuando se carga la página.
window.onload = startTriathlon;

