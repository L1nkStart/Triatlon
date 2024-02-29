//obtener data del local storage
let participants = JSON.parse(localStorage.getItem("participantes"));
let multiplier = localStorage.getItem("multiplier")

//flags
let endRace = false 
let endWalk = false
let endSwin = false

function startTriathlon() {
    participants.forEach(participant => {
        //parametros basicos
        participant.maxWalkDistance = 10000; // 10 km
        participant.walkVelocity = 7 / 3.600; // 7 km/h convertido a m/s
        participant.maxSwimDistance = 10000; // 10 km
        participant.swimVelocity = 1.72; // 1.72 m/s
        participant.maxCycleDistance = 30000; // 30 km
        participant.cycleVelocity = 45 / 3.600; // 45 km/h convertido a m/s
        participant.currentVelocity = 0
        participant.reference = new Date()
        participant.startTime = new Date(participant['caminata.inicio'])
        participant['caminata.inicio'] = new Date(participant['caminata.inicio']).toLocaleTimeString()

        //Descalificados
        if(participant.disqualified){
            participant['caminata.inicio'] = 'DESCALIFICADO'
            participant['natacion.inicio'] = 'DESCALIFICADO'
            participant['ciclismo.inicio'] = 'DESCALIFICADO'
            participant['ciclismo.fin'] = 'DESCALIFICADO'
        }
    });
    //Este intervalo es Dios aqui.
    setInterval(() => {
        if (!endRace) {
            console.log(participants)
            if(!endWalk){
                participants.sort(((a, b) => b.walkDistance - a.walkDistance));
            }else if(!endSwin){
                participants.sort(((a, b) => b.swimDistance - a.swimDistance));
            }else{
                participants.sort(((a, b) => b.cycleDistance - a.cycleDistance));
            }
            participants.forEach(participant => {
                simulateDiscipline(participant);
            });
            displayTable();
            // Verifica el estado de la carrera
            endWalk = participants.find(participant => participant['caminata.fin']);
            endSwin = participants.find(participant => participant['natacion.fin']);
            endRace = participants.every(participant => participant['ciclismo.fin']);
        }
    }, 1000);
}

//La tierra
function simulateDiscipline(participant) {
    const disqualified = participant.disqualified;
    if (!disqualified && !participant['caminata.fin']) {
        simulateDistance(participant, 'walk', participant.maxWalkDistance, participant.walkVelocity);
        if (participant.walkDistance >= participant.maxWalkDistance) {
            finishDiscipline(participant, 'caminata', 'natacion');
            return;
        }
    }

    if (!disqualified && participant['caminata.fin'] && !participant['natacion.fin']) {
        simulateDistance(participant, 'swim', participant.maxSwimDistance, participant.swimVelocity);
        if (participant.swimDistance >= participant.maxSwimDistance) {
            finishDiscipline(participant, 'natacion', 'ciclismo');
            return;
        }
    }

    if (!disqualified && participant['natacion.fin'] && !participant['ciclismo.fin']) {
        simulateDistance(participant, 'cycle', participant.maxCycleDistance, participant.cycleVelocity);
        if (participant.cycleDistance >= participant.maxCycleDistance) {
            finishDiscipline(participant, 'ciclismo');
        }
    }

}

//Adam
function simulateDistance(participant, discipline, maxDistance, velocity) {
    if (participant[`${discipline}Distance`] < maxDistance) {
        participant.currentVelocity = calculateRandomDistance(velocity);
        if (participant.currentVelocity !== 'F') {

            participant[`${discipline}Distance`] += Math.min(participant.currentVelocity, maxDistance - participant[`${discipline}Distance`]);
        } else {
            participant.disqualified = true;
        }
    }
}

//Eva
function finishDiscipline(participant, currentDiscipline, nextDiscipline) {
    const discipline = currentDiscipline || 'caminata';
    const nextDisciplineStart = nextDiscipline || (currentDiscipline === 'caminata' ? 'natacion' : 'ciclismo');

    if (!participant[`${discipline}.fin`]) {
        participant[`${discipline}.tiempo`] = calculateFinishTime(participant.reference);
        participant[`${discipline}.fin`] = new Date(participant.startTime.getTime() + participant[`${discipline}.tiempo`] * 1000)
            .toLocaleTimeString("en-US", { hour12: true });
    }

    if (nextDisciplineStart) {
        participant[`${nextDisciplineStart}.inicio`] = participant[`${discipline}.fin`];
    }
}

//La serpiente
function calculateFinishTime(startTime) {
    const currentTime = new Date()
    const elapsedTime = (currentTime.getTime() - startTime.getTime() - 100) / 1000; // Tiempo transcurrido en segundos.
    return elapsedTime
}

//La manzana
function calculateRandomDistance(velocity) {
    var random = Math.random() + 1.0000000001
    if(random == 1){
        return 'F'
} else return random * velocity * multiplier; 
}

function displayTable() {
    const participantsContainer = document.getElementById('participantsContainer');
    // Limpiar el contenido anterior para actualizar la tabla.
    participantsContainer.innerHTML = `
        <div class='participant-row'>
            <div class="participant-small-cell">N</div>
            <div class="participant-large-cell">CEDULA</div>
            <div class="participant-large-cell">NOMBRE</div>
            <div class="participant-large-cell">MUNICIPIO</div>
            <div class="participant-small-cell">EDAD</div>
            <div class="participant-large-cell">INICIO</div>
            <div class="participant-large-cell">NATACION</div>
            <div class="participant-large-cell">CICLISMO</div>
            <div class="participant-large-cell">FINAL</div>
            <div class="participant-large-cell">TIEMPO</div>
            <div class="participant-large-cell">RECORRIDO</div>

        </div>
    `;
    let index = 0;
    participants.forEach((participant, index) => {
        const participantDetails = document.createElement('div');
        participantDetails.className = 'participant-details';
        var totalDistance = parseInt(participant.walkDistance) + parseInt(participant.swimDistance) + parseInt(participant.cycleDistance);
        var totalTiempo = parseInt(participant['caminata.tiempo']) + parseInt(participant['natacion.tiempo']) + parseInt(participant['ciclismo.tiempo']) || '0';
    
        var cantidad = totalDistance / 500;
    
        const row = document.createElement('div');
        row.className = 'participant-row';
    
        // Establecer el color según la posición.
        let color = 'blue';
        if (index === 0) {
            color = 'gold';   // Primer lugar (dorado)
        } else if (index === 1) {
            color = 'silver'; // Segundo lugar (plata)
        } else if (index === 2) {
            color = 'brown';  // Tercer lugar (bronce)
        }
    
        row.innerHTML += `
            <div id="n${index + 1}" style=" color: ${color};" class="participant-small-cell">${index + 1}</div>
            <div class="participant-large-cell">${participant.cedula}</div>
            <div class="participant-large-cell">${participant.nombre}</div>
            <div class="participant-large-cell">${participant.municipio}</div>
            <div class="participant-small-cell">${participant.edad}</div>
            <div class="participant-large-cell">${participant['caminata.inicio'] || '00:00:00'}</div>
            <div class="participant-large-cell">${participant['natacion.inicio'] || '00:00:00'}</div>
            <div class="participant-large-cell">${participant['ciclismo.inicio'] || '00:00:00'}</div>
            <div class="participant-large-cell">${participant['ciclismo.fin'] || '00:00:00'}</div>
            <div class="participant-large-cell">${totalTiempo}s</div>
            <div style="width: ${cantidad}px; background-color: ${color};" class="bar participant-large-cell">${totalDistance}m</div>
        `;
        participantDetails.appendChild(row);
        participantsContainer.appendChild(participantDetails);
    });    
}

// Llama a la función startTriathlon cuando se carga la página.
window.onload = startTriathlon;

