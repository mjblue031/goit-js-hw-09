// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//DOMS
let dateTimePickerEl = document.querySelector('#datetime-picker');
let startbutton = document.querySelector('button[data-start]');
let daysEl = document.querySelector('span[data-days]');
let hoursEl = document.querySelector('span[data-hours]');
let minutesEl = document.querySelector('span[data-minutes]');
let secondsEl = document.querySelector('span[data-seconds]');

//disable button at the beginning
startbutton.disabled = true;

//create datetime picker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const datetime = Date.now();

    if (selectedDate < datetime) {
      Notify.failure('Please choose a date in the future');
      startbutton.disabled = true;
      return;
    }

    //if date is in the future, the button will be enabled
    startbutton.disabled = false;

    //to begin timer
    let timerID = null;

    //funtion to handle time
    function handleCountdown() {
      startbutton.disabled = true;
      dateTimePickerEl.disabled = true;

      timerID = setInterval(() => {
        const currentTime = Date.now();

        //timer end logic
        if (selectedDate < currentTime) {
          clearInterval(timerID);
          dateTimePickerEl.disabled = false;
          return;
        }
        const timeDIfference = selectedDate - currentTime;

        const { days, hours, minutes, seconds } = convertMs(timeDIfference);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);
      }, 1000);
    }
    startbutton.addEventListener('click', handleCountdown);
  },
};

flatpickr(dateTimePickerEl, options);

//countdown texts
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2,'0');
}
