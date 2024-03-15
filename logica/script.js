let currentQuestionIndex = 0;

const questions = [
    {
        "pregunta": "¿En qué película Bruce Willis interpreta a John McClane, un policía que se enfrenta a terroristas en un rascacielos?",
        "opciones": {
            "La era del hielo": false,
            "Duro de Matar": true,
            "Difícil de Matar": false,
            "Riesgo Total": false
        },
        "respuesta": "Duro de Matar"
    },
    {
        "pregunta": "¿Quién dirigió la película 'Titanic'?",
        "opciones": {
            "Martin Scorsese": false,
            "Steven Spielberg": false,
            "James Cameron": true,
            "Quentin Tarantino": false
        },
        "respuesta": "James Cameron"
    },
    {
        "pregunta": "¿En qué película aparece el personaje 'Forrest Gump'?",
        "opciones": {
            "Pulp Fiction": false,
            "Salvar al Soldado Ryan": false,
            "Forrest Gump": true,
            "Sueño de Fuga": false
        },
        "respuesta": "Forrest Gump"
    }
];

function renderQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = `
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5"><b>${question.pregunta}</b></div>
            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                ${renderOptions(question.opciones, index)}
            </div>
        </div>
    `;
    const containers = document.getElementById('respuestaJson');
    containers.textContent = question.respuesta;


    const selectedAnswer = localStorage.getItem(`question_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

function renderOptions(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`question_${index}`);
    for (const option in options) {
        const checked = option === selectedAnswer ? 'checked' : '';
        html += `
            <label class="options">${option}
                <input type="radio" name="radio" value="${option}" ${checked} onchange="saveSelectedAnswer(${index}, '${option}')">
                <span class="checkmark"></span>
            </label>
        `;
    }
    return html;
}

function saveSelectedAnswer(index, option) {
    localStorage.setItem(`question_${index}`, option);
}

function showNext() {
    saveSelectedAnswer();
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    renderQuestion(currentQuestionIndex);
}

function showPrevious() {
    saveSelectedAnswer();
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestion(currentQuestionIndex);
}

function saveSelectedAnswer() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked');
    if (selectedAnswer) {
        localStorage.setItem(`question_${currentQuestionIndex}`, selectedAnswer.value);
    }
}


// muestra la primera pregunta al cargar la pagina
renderQuestion(currentQuestionIndex);



// * RESULTADO NIVELES
function mostrarRespuestasIncorrectas() {
    let respuestasIncorrectas = [];
    questions.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas.');
    } else {
        alert('Todas las respuestas son correctas.');
    }
}

document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    mostrarRespuestasIncorrectas();
})
