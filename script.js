document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Example
    const correctAnswers = {
        q1: 'Example Answer for Q1',
        q2: ['Fakultāte A', 'Fakultāte C'], // Multiple correct answers
        q3: 'Example Answer for Q3',
        q4: 'dekāns1',
        q5: ['fakultāte1', 'fakultāte2'], // All answers are correct
        q6: 'Example Answer for Q6',
        q7: 'Example Answer for Q7',
        q8: 'Example Answer for Q8',
        q9: 'Example Answer for Q9',
        q10: 'Example Answer for Q10',
        q11: 'Example Answer for Q11',
        q12: 'Example Answer for Q12'
    };

    Object.keys(correctAnswers).forEach(qId => {
        const question = document.getElementById(qId);
        let feedback = document.getElementById('feedback' + qId.substring(1));
        let isCorrect = false;

        if (Array.isArray(correctAnswers[qId])) {
            let userAnswers = Array.from(question.querySelectorAll('input:checked')).map(input => input.value);
            isCorrect = correctAnswers[qId].every(val => userAnswers.includes(val)) && userAnswers.every(val => correctAnswers[qId].includes(val));
        } else {
            let userAnswer = question.querySelector('input[type="text"], input[type="radio"]:checked')?.value || '';
            isCorrect = userAnswer.toLowerCase() === correctAnswers[qId].toLowerCase();
        }

        if (isCorrect) {
            feedback.innerHTML = "<span style='color: green;'>Atbilde pareiza!</span>";
        } else {
            let correctDisplay = Array.isArray(correctAnswers[qId]) ? correctAnswers[qId].join(", ") : correctAnswers[qId];
            feedback.innerHTML = "<span style='color: red;'>Atbilde nepareiza! Pareizā atbilde: " + correctDisplay + "</span>";
        }
    });
});



function startTimer(duration, display) {
    var timer = duration, hours, minutes, seconds;
    var interval = setInterval(function () {
        hours = parseInt((timer / 3600) % 24, 10);
        minutes = parseInt((timer / 60) % 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            document.getElementById('quizForm').submit(); // Submit the form automatically
        }
    }, 1000);
}

window.onload = function () {
    var eighteenMinutes = 60 * 15;
    var display = document.getElementById('timer');
    startTimer(eighteenMinutes, display);
};