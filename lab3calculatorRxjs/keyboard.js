import Rx from 'rxjs/Rx';

let rslt;
let operation ;
let display;

const button = document.getElementsByClassName("flex-item");

const calculator$ = Rx.Observable.from(button)
        .map(x => Rx.Observable.fromEvent(x, 'click')
        .mapTo(x.textContent))
        .mergeAll()
        .merge(Rx.Observable.fromEvent(document, 'keypress')
        .pluck('key'));

calculator$.subscribe(getKey => {
    if (/\d/.test(getKey) || getKey === '.') {
    // If the button is a number
    if (display) {
        document.getElementsByTagName('input')[0].value = getKey;
        display = false;
    } else {
        document.getElementsByTagName('input')[0].value += getKey;
    }
} else if (getKey === 'C') {
        rslt = 0;
    operation = '';

    document.getElementsByTagName('input')[0].value = '0';
} else {
    const value = parseFloat(document.getElementsByTagName('input')[0].value);
    if (operation === '+') {
        rslt += value;
    } else if (operation === '-') {
        rslt -= value;
    } else if (operation === 'x' || operation === '*') {
        rslt *= value;
    } else if (operation === '÷' || operation === '/') {
        rslt /= value;
    } else {
        rslt = value;
    }
    document.getElementsByTagName('input')[0].value = rslt;
    operation = getKey;

    display = true;
}
});
