import Rx from 'rxjs/Rx';


const digitFormat = document.getElementById('digital-format');
const canvas = document.getElementById('canvas');
const Splits = document.getElementById('splits');

const src = Rx.Observable
    .interval(100 )
    .timeInterval();


let setTime = 0;
let start = false;
const subscription = src.subscribe(
    x => {
    if(!start) return;
setTime++;
Render(setTime);
digitFormat.innerHTML = Math.floor(setTime / 600) + ":" + Math.floor((setTime / 10) % 60) + ":" + (setTime % 10) + "0";
});

Rx.Observable.fromEvent(document.getElementById('start'), 'click')
    .subscribe(x => {
    start = true;
});


Rx.Observable.fromEvent(document.getElementById('split'), 'click')
    .subscribe(x => {
        Splits.innerHTML += digitFormat.innerHTML + "<br/>";
    });

Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
    .subscribe(x => {
    start = false;
});



Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
    .subscribe(x => {
    start = false;
setTime = 0;
Render(setTime);
digitFormat.innerHTML = "0:0:00";
Splits.innerHTML = "";
});

const Render = (time) => {
    if (canvas.getContext) {
        const Context = canvas.getContext('2d');

        Context.clearRect(0, 0, canvas.width, canvas.height);

        const watchSize = 96;
        const cntSize = 0.92;




        Context.strokeStyle = "black";
        Context.beginPath();



        Context.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
        Context.arc(watchSize, watchSize, watchSize - 2, 0, Math.PI * 2, true);



        Context.fillStyle = "#d3d3d3";
        Context.beginPath();
        Context.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
        Context.fill();







        for (let i = 0; i < 12; i++) {
            let angle = i * (Math.PI * 2 / 12);
            const armLength = watchSize * 0.15;
            Context.moveTo(watchSize + watchSize * Math.cos(angle) * cntSize, watchSize + watchSize * Math.sin(angle) * cntSize);
            Context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * cntSize, watchSize + (watchSize - armLength) * Math.sin(angle) * cntSize);
        }


        for (let i = 0; i < 60; i++) {
            let angle = i * (Math.PI * 2 / 60);
            const armLength = watchSize * 0.05;
            Context.moveTo(watchSize + watchSize * Math.cos(angle) * cntSize, watchSize + watchSize * Math.sin(angle) * cntSize);
            Context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * cntSize, watchSize + (watchSize - armLength) * Math.sin(angle) * cntSize);
        }




        let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
        let armLength = watchSize * 0.5;
        Context.moveTo(watchSize, watchSize);
        Context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));


        angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
        armLength = watchSize * 0.8;
        Context.moveTo(watchSize, watchSize);
        Context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

        Context.stroke();
    }
}

Render();
