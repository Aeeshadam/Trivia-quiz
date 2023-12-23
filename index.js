const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz-container")
const backEl = document.getElementById("back")
const buttonEl = document.getElementById("button");
const scoreEl = document.querySelector(".score")
const progress = document.querySelector(".progressFiller")
const progressText = document.querySelector(".progress-text")
const endScore = document.querySelector(".endscore")
const mainContainer = document.querySelector('.container')


let rightAns
let currentQuestionIndex = 0 ;
let questionData
let score = 0;
let answer;

async function getQuestions() {
    const response = await fetch(`https://opentdb.com/api.php?amount=15&category=18&type=multiple`);
    const data = await response.json();
    return data.results
    console.log(data.results);
}

async function startQuiz() {
    questionData = await getQuestions()
    showQuestions();
}

function showQuestions() {

        const currentQuestion = questionData[currentQuestionIndex];
        rightAns = currentQuestion.correct_answer;
        let possibleAns = currentQuestion.incorrect_answers.slice();
         possibleAns.splice(Math.floor(Math.random()*3), 0, rightAns);
      
        quiz.innerHTML = "";

        quiz.innerHTML += `<h2 class="question" id="question">${currentQuestion.question}</h2>
        <ul class="options-container" id="options"> ${possibleAns.map(possibleAnswer => `<li class="option"> <div class="label">
        <i class="fa-solid fa-check hide selected"></i> </div>
        <p class="option-text" id="option-d">${possibleAnswer}</p></li>`).join('')}
        </ul>
        `

        progress.style.width = `${((currentQuestionIndex + 1) / questionData.length) *100}%`;
        progressText.innerHTML = `Question ${currentQuestionIndex + 1}/${questionData.length}`


        const options = document.querySelectorAll(".option")
        options.forEach((option) => {
            const optionText = option.querySelector(".option-text").innerHTML;

            option.addEventListener("click", ()=>{
            options.forEach((opt) => {
                //first hide all the checkmarks
                const selected = opt.querySelector(".selected")
                selected.classList.add("hide")
            });
              //then show the ones you are clicking only
            const selected = option.querySelector(".selected");
            selected.classList.remove("hide")
            
            answer = optionText;
        })
    })};

       

        buttonEl.addEventListener("click", ()=>{
            if (answer === rightAns) {
                score++
                scoreEl.innerHTML = score
            }
            currentQuestionIndex++;
            if (!answer) {
                alert("Please select your answer")
                return;
            }
            answer = null;
            if (currentQuestionIndex < questionData.length) {
                showQuestions();
            }
            else{
               mainContainer.innerHTML = `<h2 class="endscore">Your Score is ${score}/${questionData.length}</h2>
               <button style="margin: 20px auto;" class="restart">Play again</button>` 
            }
        })


        mainContainer.addEventListener("click", (e)=>{
            const restart = e.target.closest('.restart');
            if (restart) {
                window.location.reload();
            }
    
        })

startQuiz()





/*setTimeout(() => {
    alert("you selected the right anser")
    answer = null
}, 1000);




       
   /* currentQuestion ++;
      if (!answer) {
        alert('Please select your answer!');
        return;
      }
      if (currentQuestion < questionData.length) {
        startQuiz();
    } else {
       quiz.innerHTML = `<h2> Your score is ${score}/${questionData.length}.
       <button onclick="location.reload()">Restart</button>`;
    }
   
   });

   backEl.addEventListener("click", ()=>{
    currentQuestion--;
    startQuiz(currentQuestion);*/

   

   

//To do: Add back button

   
