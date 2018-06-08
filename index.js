

function getParam(s) {
    let split = s.split('=')
    if (!split || split.length < 2) {
        throw new Error('params must be provided using "param1=value1 param2=value2"')
    }

    return split[1].trim();
}
let  startX, startY, map;
process.argv.slice(2).forEach(function (val) {
    if (val.includes('startX')) {
        startX = getParam(val)
    }

    if (val.includes('startY')) {
        startY = getParam(val)
    }

    if (val.includes('map')) {
        map = getParam(val)
    }
});

const Robot = require('./robot');
const cleaner = new Robot({
    map: map,
    startX: startX,
    startY: startY
});

cleaner.cleanHouse();