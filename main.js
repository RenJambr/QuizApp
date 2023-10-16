let mainContainer = document.querySelector('.container');
let question = document.querySelector('#question');
let answers_div = document.querySelectorAll('.answer-div');
let x = 0
let y = 0;
let buttonSubmit = document.querySelector('#submit');
let resultDiv = document.querySelector('.result');
let reloadBtn = document.querySelector('#reload');
const questionsAndAnswers = {
    "What is the purpose of a 'DOCTYPE' declaration in HTML?" : ["To define the version of HTML used in the document", "To link external CSS files", "To declare JavaScript functions", "To specify the character encoding of the document"],
    "Which of the following is an example of a front-end JavaScript framework?" : ["AngularJS", "Django", "Flask", "Ruby on Rails"],
    "What is the purpose of the 'let' keyword in JavaScript?" : ["To declare a block-scoped variable", "To declare a global variable", "To declare a constant variable", "To declare a variable with function scope"],
    "What year was Javascript launched?" : ["1996", "2003", "1994", "none of above"],
}
let answers = [];

buttonSubmit.addEventListener('click', submitAnswer) 
createEl()

//function for creating questions and answers
function createEl(){

    let answersObj = Object.values(questionsAndAnswers)[x];
    question.innerText = Object.keys(questionsAndAnswers)[x];

    for(let i = 0; i < answers_div.length; i++){

        answers_div[i].innerHTML = `
            <input type = "radio">
            <label>${answersObj[y]}</label>
        `;

        y++;
    }

    checkInputs();
}

//function for checking input and calling function for uncheck other inputs
function checkInputs(){
    let inputs = document.querySelectorAll('input[type = "radio"]');

    inputs.forEach(input => {
        input.addEventListener('click', () => {
            unCheckInputs();
            input.checked = true;
            buttonSubmit.style.backgroundColor = "#3276b5";
            buttonSubmit.disabled = false
        })
    })
}

//this function unchecks all inputs 
function unCheckInputs(){
    let inputs = document.querySelectorAll('input[type = "radio"]');

    inputs.forEach(input => {
        input.checked = false;
    })
}

//this is function for submiting answers and push them in an array
function submitAnswer(){
    let inputs = document.querySelectorAll('input[type = "radio"]');

    inputs.forEach(input => {
        if(input.checked == 1){
            let value = input.nextElementSibling.innerText;
            answers.push(value);

            if(x == 3){
                x = 0;
                checkAnswers();
            } else{
                x++;
                y = 0;
                createEl()
            }

        }
    })
    
}

//this function checks all answers and calculate number of correct answers 
function checkAnswers(){
    mainContainer.style.display = "none";
    resultDiv.style.display = "flex";

    let correct = [];
    let sum = 0;

    for(let i = 0; i < 4; i++){

        switch(answers[i]){
            case 'To define the version of HTML used in the document' : 
                correct.push(1);
                break;
            case 'AngularJS' : 
                correct.push(1);
                break;
            case 'To declare a block-scoped variable':
                correct.push(1);
                break;
            case '1996':
                correct.push(1);
                break;
            default : correct.push(0)
        }
    }

    for(let i = 0; i < correct.length; i++){
        sum+= correct[i]
    }
    
    document.querySelector('#correct').innerText = sum;
    document.querySelector('#numOfQuestions').innerText = Object.keys(questionsAndAnswers).length;
}

