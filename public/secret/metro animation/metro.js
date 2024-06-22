function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function createLineElement(className, position, isVertical = false, startFrom = 0, endAt = 100) {
    const line = document.createElement('div');
    line.className = `line ${className}`;
    if (isVertical) {
        line.style.left = `${position}%`;
        line.style.top = `${startFrom}%`;
        line.style.height = `${endAt - startFrom}%`;
    } else {
        line.style.top = `${position}%`;
        line.style.left = `${startFrom}%`;
        line.style.width = `${endAt - startFrom}%`;
    }
    return line;
}

function addStation(metroMap, verticalPosition, horizontalPosition) {
    const station = document.createElement('div');
    station.className = 'station';
    station.style.left = `calc(${verticalPosition}% )`;
    station.style.top = `calc(${horizontalPosition}% )`;
    metroMap.appendChild(station);
}

function generateMetroLineAndStation(index, intersections) {
    const metroMapContainer = document.querySelector('.metro-map-container');

    const metroMap = document.createElement('div');
    metroMap.className = 'metro-map';

    const horizontalPosition1 = getRandom(10, 45);
    const horizontalPosition2 = getRandom(55, 90);
    const verticalPosition = getRandom(10, 90);

    let verticalExists = intersections.find(inter => inter.type === 'vertical' && inter.position === verticalPosition);

    let horizontalExists1 = intersections.find(inter => inter.type === 'horizontal' && inter.position === horizontalPosition1);
    let horizontalExists2 = intersections.find(inter => inter.type === 'horizontal' && inter.position === horizontalPosition2);

    // Création de la première ligne horizontale si elle n'existe pas
    if (!horizontalExists1) {
        horizontalExists1 = { type: 'horizontal', position: horizontalPosition1, stops: [verticalPosition] };
        intersections.push(horizontalExists1);
        const lineHorizontal = createLineElement('horizontal', horizontalPosition1, false);
        metroMap.appendChild(lineHorizontal);
    } else {
        horizontalExists1.stops.push(verticalPosition);
        horizontalExists1.stops.sort((a, b) => a - b);
    }

    // Création de la deuxième ligne horizontale si elle n'existe pas
    if (!horizontalExists2) {
        horizontalExists2 = { type: 'horizontal', position: horizontalPosition2, stops: [verticalPosition] };
        intersections.push(horizontalExists2);
        const lineHorizontal = createLineElement('horizontal', horizontalPosition2, false);
        metroMap.appendChild(lineHorizontal);
    } else {
        horizontalExists2.stops.push(verticalPosition);
        horizontalExists2.stops.sort((a, b) => a - b);
    }

    // Création de la ligne verticale
    if (!verticalExists) {
        verticalExists = { type: 'vertical', position: verticalPosition, stops: [horizontalPosition1, horizontalPosition2] };
        intersections.push(verticalExists);
        const lineVertical = createLineElement('vertical', verticalPosition, true, Math.min(horizontalPosition1, horizontalPosition2), Math.max(horizontalPosition1, horizontalPosition2));
        metroMap.appendChild(lineVertical);
    } else {
        verticalExists.stops.push(horizontalPosition1, horizontalPosition2);
        verticalExists.stops.sort((a, b) => a - b);
    }

    // Ajouter des stations aux intersections
    addStation(metroMap, verticalPosition, horizontalPosition1);
    addStation(metroMap, verticalPosition, horizontalPosition2);

    metroMapContainer.appendChild(metroMap);
}

const intersections = [];

for (let i = 0; i < 10; i++) {
    generateMetroLineAndStation(i, intersections);
}



























var enVol = false;
function fly_away(){
    if(enVol === false && $(window).scrollTop() != 0){
        enVol = true;
        $('.ciel').removeClass('stay');
        $('.ciel').addClass('away');

        setTimeout(function(){ stay() }, 4000);
    }
}
function stay(){
    if(enVol === true){
        enVol = false;
        $('.ciel').removeClass('away');
        $('.ciel').addClass('stay');
    }
}

$(document).ready(function(){
    fly_away();
    $(window).scroll(function() {
        fly_away();
    });

});
