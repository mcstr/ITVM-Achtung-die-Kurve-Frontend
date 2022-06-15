import { Socket } from './socket.js';

const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
window.addEventListener('keydown', keyEvents);  
let punktX = 500;
let punktY = 500;

//links 37
// rechst 39


 async function init() {
    // let punktX, punktY;
    // punktX = Math.random() * 1000;
    // punktY = Math.random() * 1000;   

  
    const socket = new Socket('here');
    socket.test;
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = "5";
    context.moveTo(punktX, punktY);

    while (true) {
            await new Promise(r => setTimeout(r, 10));
            context.lineTo(punktX, punktY);
            context.stroke(); // Draw it
            context.moveTo(punktX, punktY); 
            punktX += 1; 
    }
}

 function keyEvents(e) {
    if(e.keyCode === 37) {
        this.init()
        punktY += 1;
    }

    if(e.keyCode === 39) {
        console.log('right')
        punktY -= 1;
    }
}