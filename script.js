document.getElementById('quizForm').addEventListener('submit', submitQuiz);

function inputChange(element){
    var storedTime, answerText;
    if ((storedTime = sessionStorage.getItem("time")) && storedTime){
        if (parseInt(storedTime) == 0) {
            answerText = sessionStorage.getItem(element.target.parentNode.id);
            if (element.target.type == "checkbox"){
                if (sessionStorage.getItem(element.target.parentNode.parentNode.id + element.target.value)) {
                    element.target.checked = true
                } else {
                    element.target.checked = false;
                }
            } else if (element.target.type == "radio"){
                answerText = sessionStorage.getItem(element.target.parentNode.parentNode.id);
                if (answerText == element.target.value) {
                    element.target.checked = true;
                } else {
                    element.target.checked = false;
                    // jaatrod pareizas vertibas un jaieliek
                    var radios = element.target.parentNode.parentNode.querySelectorAll('input[type="radio"]');
                    for (var i = 0; i < radios.length; i++) {
                        if (radios[i].value === answerText) {
                            radios[i].checked = true;
                            break;
                        }
                    }
                }
            } else {
                if (answerText) {
                    element.target.value = answerText;
                } else {
                    element.target.value = "";
                }
            }
        } else {
            if (element.target.type == "checkbox"){
                if (element.target.checked){
                    sessionStorage.setItem(element.target.parentNode.parentNode.id + element.target.value, "1");
                } else if (sessionStorage.getItem(element.target.parentNode.parentNode.id + element.target.value)) {
                    sessionStorage.removeItem(element.target.parentNode.parentNode.id + element.target.value);
                }
            } else if (element.target.type == "radio"){
                if (element.target.checked){
                    sessionStorage.setItem(element.target.parentNode.parentNode.id, element.target.value);
                }
            } else {
                sessionStorage.setItem(element.target.parentNode.id, element.target.value);
            }
        }
    } else {
        // ja laiks nav definets - bet lietotajs ievada atbildi, tad kaut kas nav pareizi
        if (element.target.type == "checkbox"){
            element.target.checked = false;
        } else {
            element.target.value = "";
        }
    }
}

function setDefaultValue(element) {
    if (element.querySelectorAll("input")[0].type == "checkbox"){
        var elementId = element.id;
        //ja checkbox , tad jaskrien cauri visiem
        element.querySelectorAll("input").forEach(function(element) {
            if (sessionStorage.getItem(elementId + element.value)) {
                element.checked = true;
            }
        });
    } else if ((answerText = sessionStorage.getItem(element.id)) && answerText) {
        var selectedElement = element.querySelectorAll("input")[0];
        if (selectedElement.type == "radio"){
            var radios = selectedElement.parentNode.parentNode.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].value === answerText) {
                    radios[i].checked = true;
                    break;
                }
            }
        } else{
            // var nemt pirmo , jo teksta ievade ir tik viena
            selectedElement.value = answerText;
        }
    }
}

function clearStoredValues(element){
    if (element.querySelectorAll("input")[0].type == "checkbox"){
        var elementId = element.id;
        element.querySelectorAll("input").forEach(function(element) {
            if (sessionStorage.getItem(elementId + element.value)) {
                sessionStorage.removeItem(elementId + element.value)
            }
        });
    } else if ((answerText = sessionStorage.getItem(element.id)) && answerText){
        sessionStorage.removeItem(element.id)
    }
}

function submitQuiz (event) {
    if (event) {
        event.preventDefault();
    }
    clearInterval(interval);
    // Example
    const correctAnswers = {
        q1: 'Datorzinātnes un informācijas tehnoloģijas fakultāte',
        q2: ['DITF', 'Enerģētikas un elektrotehnikas fakultāte'], // Multiple correct answers
        q3: 'DITEF',
        q4: 'Agris Ņikitenko',
        q5: ['BMF', 'DTF', 'IEVF', 'DITEF', 'LJA', 'ADI'], // All answers are correct
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

    var retryBlock = document.getElementById("retry-block");
    retryBlock.style.display = "block";
    sessionStorage.setItem("time", 0);
}

var interval;

function startTimer(duration, display) {
    var timer = duration, hours, minutes, seconds;
    interval = setInterval(function () {
        hours = parseInt((timer / 3600) % 24, 10);
        minutes = parseInt((timer / 60) % 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;
       
        if (--timer < 0) {
            clearInterval(interval);
            submitQuiz();// Submit the form automatically
        }
        if (timer > -1){
            sessionStorage.setItem("time", timer)
        }
        
    }, 1000);
}

window.onload = function () {

    var storedTime = sessionStorage.getItem("time");
    var elems=document.querySelectorAll(".question");
    for(var i=0;i<elems.length;i++){
        // ja ir laiks , ta nav pirma ielade
        if (storedTime){
            setDefaultValue(elems[i]);   
        } else {
            clearStoredValues(elems[i]);
        }
        
        elems[i].addEventListener("change", inputChange);
    }

    var time = 60 * 2;

    if (storedTime){
        time = parseInt(storedTime);
    }


    var display = document.getElementById('timer');
    startTimer(time, display);
};
