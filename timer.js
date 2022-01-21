const timer = document.getElementById("timer");
const modeButtons = document.querySelector("[class=timerMode]");
const pomodoroButton = document.getElementById("pomodoro");
const buttonShort = document.getElementById("buttonShort");
const buttonLong = document.getElementById("buttonLong");
const toggle = document.getElementById("toggle");
let seconds = 0;

const TIMER = {
    POMODORO: 25,
    SHORT_BREAK: 5,
    LONG_BREAK: 15,
};

function changeMode(e) {
    // to pause the timer
    // to toggle from the pause button to the play button
    toggle.classList.replace("fa-pause-circle", "fa-play-circle");
    toggle.dataset.paused = "true";
    
    // The i is indicating to the 3 modes available for this timer
    // after the 3 are done it will exit the loop
    for (let i = 0; i < 3; i++) {
        // classList.remove --> removes the class or button that is active 
        e.path[1].children[i].classList.remove("active");
    }

    // After removing the mode that is active, the code below will help
    // to go to the next mode that the user is selecting and make that active
    e.target.classList.add("active");

    // Now, to change the actual work of buttons the code below is written
    // which is to have different timers for different mode.
    let mode = e.target.dataset.mode;

    // timer.dataset.mode, looks at the modes present on the mode list and 
    // matches with the mode that is being selected by user in real time.
    timer.dataset.mode = mode;

    // Timer refering to the timer array
    // Then dataset is referring to the set of data thats within the Tiemr array
    if(timer.dataset.mode === "pomodoro"){
        timer.innerHTML = `${TIMER.POMODORO}:00`;
    } else if(timer.dataset.mode ==="short"){
        timer.innerHTML = `0${TIMER.SHORT_BREAK}:00`;
    } else{
        timer.innerHTML = `${TIMER.LONG_BREAK}:00`;
    }
}

function pomodoro_timer() {

    function resetTimer() {
        if (timer.dataset.mode === "pomodoro") {
             seconds = TIMER.POMODORO * 60;
        } else if (timer.dataset.mode === "short") {
            seconds = TIMER.SHORT_BREAK * 60;
        } else {
            seconds = TIMER.LONG_BREAK * 60;
        }
    }

    // classList is being used here to toggle css class which was the play button
    if (toggle.classList.contains('fa-play-circle')) {
        toggle.classList.replace("fa-play-circle", "fa-pause-circle");
        toggle.dataset.paused = "false";

        // if the timer is not paused then the timer needs to be counting down
        // so the resetTimer() function is called 
        // which will give the correct timer according to the mode the time is at 
        // such as pomodoro, short break or long break
        resetTimer();

        // Here setInterval function is being used so that this function 
        // can be used to repeat every given time interval

        // Then afterwards the math.floor function is being sued to round whatever seconds divided by 60 is
        // slice(-2) means that it will be taking 2 values from the right to the left
        interval = setInterval(() => {
            let timeRemaining =
                // The line below will be showing the minute value
                ("0" + Math.floor(seconds / 60)).slice(-2) +
                // Then a colon is concatenated to the timer
                ":" +
                // This part will be showing the seconds part of the timer
                ("0" + (seconds % 60)).slice(-2);

            timer.innerHTML = timeRemaining;

            // This line below will show the status of the timer on the window tab portion of the screen
            // If the user is supposed to be working then the tab will show 'Work' or else in break it will show 'Break'
            document.title = `${timeRemaining} - ${timer.dataset.mode === "pomodoro" ? "Work" : "Break"}`;

            // An exit statement so that the tiemr doesnt run infinitely
            // This function will enable the timer to stop if the timer is paused
            // or the seconds reach zero
            if (toggle.dataset.paused === "true" || seconds === 0) {
                clearInterval(interval);
            }
            seconds--;
        }, 1000);

    } else {
        toggle.classList.replace("fa-pause-circle", "fa-play-circle");
        toggle.dataset.paused = "true";
    }
}

// This code is so that when the play button is clicked on, so that the pause button appears 
// or vise versa with the help of the above function, pomodoro_timer.
toggle.addEventListener("click", pomodoro_timer);
modeButtons.addEventListener("click", changeMode);