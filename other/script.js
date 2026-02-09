const RANDOM_MAX = 100;

document.addEventListener("DOMContentLoaded",()=>{

    let first_number = document.getElementById("first_number");
    let first_sign = document.getElementById("first_sign");
    let second_number = document.getElementById("second_number");

    let current_answer = document.getElementById("user_answer");
    let expected_answer = 0;

    document.querySelector("#generateCalculBTN").addEventListener("click", generateNewCalcul);
    document.querySelector("#checkAnswerBTN").addEventListener("click", checkAnswer);
    
    generateNewCalcul();
});

function generateNewCalcul(){
    first_number = document.querySelector("#first_number");
    first_sign = document.querySelector("#first_sign");
    second_number = document.querySelector("#second_number");
    first_number.textContent = Math.floor(Math.random()*RANDOM_MAX);
    first_sign.textContent = (Math.random()<=0.5)?'+':'-';
    second_number.textContent = Math.floor(Math.random()*RANDOM_MAX);
}

function checkAnswer(){
    current_answer = document.getElementById("user_answer");
    if (!current_answer){
        alert("please enter a valid answer!");
        return;
    }
    if (first_sign.textContent == '+'){
        expected_answer = parseInt(first_number.textContent) + parseInt(second_number.textContent);
    }else{
        expected_answer = parseInt(first_number.textContent) - parseInt(second_number.textContent);
    }
    if (parseInt(current_answer.value) == expected_answer){
        document.getElementById("revealAnswer").textContent = `Yay, you're rock! The answer is ${expected_answer}`;
    }else{
        document.getElementById("revealAnswer").textContent = `Noo, the answer was ${expected_answer}   `;
    }
}