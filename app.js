const setting = document.querySelector('.setting img');
const minutesInput = document.querySelector('#minutes');
const secondsInput = document.querySelector('#seconds');
const startBtn = document.querySelector('.start');
const ring = document.querySelector('.ring');

setting.addEventListener('click', () => {
    console.log('click');
    if (minutesInput.hasAttribute('disabled') && secondsInput.hasAttribute('disabled')) {
        setting.src = './img/check.svg';
        minutesInput.removeAttribute('disabled');
        secondsInput.removeAttribute('disabled');
        startBtn.style.display = 'none';
        ring.classList.remove('change');
    } else {
        setting.src = './img/gear.svg';
        minutesInput.setAttribute('disabled', 'true');
        secondsInput.setAttribute('disabled', 'true');
        startBtn.style.display = 'block';
        ring.classList.add('change');
    }
})

let timer;
let isRunning = false; //відстеження стану таймера

const progressRing = document.querySelector('.progress-ring');
let totalDuration; // Загальна тривалість у секундах
let remainingTime; // Залишковий час у секундах

// Ініціалізація початкового стану
function initializeTimer() {
    totalDuration = parseInt(minutesInput.value, 10) * 60 + parseInt(secondsInput.value, 10); // Загальна тривалість у секундах
    remainingTime = totalDuration;
    updateRingProgress(); // Встановлюємо початковий прогрес кільця
}


function startTimer() {

    let minutesTime = parseInt(minutesInput.value, 10);
    let secondsTime = parseInt(secondsInput.value, 10);

    timer = setInterval(() => {
        if (secondsTime === 0) {
            if (minutesTime === 0) {
                clearInterval(timer);  // Зупиняємо таймер, коли час закінчується
                isRunning = false;
                return;
            }

            minutesTime--;
            secondsTime = 59;

        } else {
            secondsTime--;
        }

        minutesInput.value = String(minutesTime).padStart(2, '0');
        secondsInput.value = String(secondsTime).padStart(2, '0');
    }, 1000)
}

function updateRingProgress() {
    const circumference = 2 * Math.PI * 254; // Обчислення довжини кола (r = 254)
    const offset = circumference * (1 - remainingTime / totalDuration); // Обчислення зсуву

    progressRing.style.strokeDasharray = circumference; // Встановлюємо загальну довжину обводу
    progressRing.style.strokeDashoffset = offset; // Встановлюємо зсув
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'start';
    } else {
        startTimer();
        startBtn.textContent = 'pause';
    }

    isRunning = !isRunning;
})


