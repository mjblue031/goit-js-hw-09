function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let startbutton = document.getElementById('startbutton');
let stopbutton = document.getElementById('stopbutton');
let timerId = "";

startbutton.addEventListener('click', () => {
    startbutton.disabled = true;
    stopbutton.disabled = false;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopbutton.addEventListener('click', () => {
    startbutton.disabled = false;
    stopbutton.disabled = true;
    clearInterval(timerId);
});