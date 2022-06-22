class Socket {

    constructor (url) {
        this.socket = new WebSocket('ws://10.62.143.9:8080/test');
    }    

    init() {
        this.socket.addEventListener('open', (e) =>{
            this.socket.send('Hello Server');
        }) 
        this.socket.addEventListener('message', function (e){
    this.id = e.data.split("/")[0];
        })
    }

    updatePosition(x, y) {
        console.log(x + ', ' + y + '\n');
        this.socket.send(x + '/' + y);
    }
}





const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
window.addEventListener('keydown', keyEvents);  
let positionX = Math.random() * ((canvas.width - 100) - 100) + 100;
let positionY = Math.random() *  ((canvas.height - 100) - 100) + 100;
let direction  = 0;
let distance = 0.5; //steplength
let turnSpeed = 2;
const socket = new Socket('adklfjaöd');
let id = NaN;

async function init() {
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = "5";
    context.moveTo(positionX, positionY);
    direction = Math.random() *360;

    while (true) {
            await new Promise(r => setTimeout(r, 16));
            positionX = calculateNextPosition(positionX, positionY, direction, distance).x1;
            positionY = calculateNextPosition(positionX, positionY, direction, distance).y1;

            socket.updatePosition(positionX, positionY);

            context.lineTo(positionX, positionY);
            context.stroke(); // Draw it
            context.moveTo(positionX, positionY); // Start from the new position
            //console.log(direction);
    }
}

function keyEvents(e) {
    // links
    if(e.keyCode === 37 || e.keyCode === 65) {
        direction -= turnSpeed;        
    }
    // rechst
    if(e.keyCode === 39 || e.keyCode === 68) {
        direction += turnSpeed;
    }
}

//caculate the next position of the point with the current position and direction in degrees from 0 to 360 with a distance of n pixels
function calculateNextPosition(positionX, positionY, direction, distance) {
    let x1 = positionX + distance * Math.cos(direction * Math.PI / 180);
    let y1 = positionY + distance * Math.sin(direction * Math.PI / 180);
    return { x1, y1};
}

init();