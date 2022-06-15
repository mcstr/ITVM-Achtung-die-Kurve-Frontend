const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
window.addEventListener('keydown', keyEvents);  
let punktX = 500;
let punktY = 500;


async function init() {
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = "5";
    context.moveTo(punktX, punktY);

    const socket = new Socket('here');
    socket.updatePosition(1,2)

    while (true) {
            await new Promise(r => setTimeout(r, 100));
            context.lineTo(punktX, punktY);
            context.stroke(); // Draw it
            context.moveTo(punktX, punktY); 
            punktX += 1; 
    }
}

function keyEvents(e) {
    // links
    if(e.keyCode === 37) {
        punktY += 1;
        
    }
    // rechst
    if(e.keyCode === 39) {
        punktY -= 1;
    }
}


class Socket {
 
        constructor (url) {
            this.socket = new WebSocket('ws://10.62.142.87:8080/event-emitter');
           
        }    

        init() {
            this.socket.addEventListener('open', (e) =>{
                this.socket.send('Hello Server');
            }) 
            this.socket.addEventListener('message', function (e){
                console.log(e.data);
            })
        }

        updatePosition(x, y) {
            this.socket.send(x + '\n' + y);
        }
}