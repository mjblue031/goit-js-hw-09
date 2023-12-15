//import notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//DOM links
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    //async operation
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

//submit handling
function handleSubmit(event) {
  event.preventDefault();
  let delayValue = Number(delayEl.value);

  for (let i = 1; i <= amountEl.value; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        //console.log();
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delayValue += Number(stepEl.value);
  }
}
formEl.addEventListener('submit', handleSubmit);
