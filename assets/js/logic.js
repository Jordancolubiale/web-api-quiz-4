// variables to keep track of quiz state
// currentQuestion
var currentQuestion = 0
// time
var timeCounter = questions.length * 10
// timerId
var timerId;
var score = 0
// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var endScreen = document.getElementById("end-screen")
var startButton = document.querySelector(".start");
var questionTitle = document.getElementById("question-title")
var answerA = document.getElementById("answer-a")
var answerB = document.getElementById("answer-b")
var answerC = document.getElementById("answer-c")
var feedback = document.getElementById("choicefeedback")
var timerEl = document.querySelector(".timenum")
var submitButton = document.getElementById("submit")
var highscore = document.getElementById("feedback")
questionsEl.style.display = "none"
endScreen.style.display = "none"
highscore.style.display = "none"
/// FUNCTION TO START THE QUIZ
function startQuiz() {
  // hide start screen 
  questionsEl.style.display = "block"
  startButton.style.display = "none"
  // un-hide questions section

  // start timer

  // show starting time
  clockTick()
  getQuestion();
}

/// FUNCTION TO GET/SHOW EACH QUESTION ///
function getQuestion() {
  // get current question object from array
  questionTitle.textContent = questions[currentQuestion].question
  answerA.textContent = questions[currentQuestion].answers.a
  answerB.textContent = questions[currentQuestion].answers.b
  answerC.textContent = questions[currentQuestion].answers.c
  // update title with current question

  // clear out any old question choices

  // loop over choices
  // FOR {
  // create new button for each choice

  // display on the page

  // } 
}

/// FUNCTION FOR CLICKING A QUESTION ///
function questionClick(event) {
  var userChoice = event.target.getAttribute("id").split("-")[1]
  console.log(userChoice)
  // if the clicked element is not a choice button, do nothing.
  if (userChoice === questions[currentQuestion].correctAnswer) {
    console.log('correct')
    score += 5
    feedback.textContent = "Question:" + (currentQuestion + 1) + " is correct. Score :" + score
  } else {
    console.log('wrong')
    timeCounter -= 5
    feedback.textContent = "Question:" + (currentQuestion + 1) + " is wrong. Score :" + score
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++
    getQuestion()
    // check if user guessed wrong
    // penalize time

    // display new time on page

    // give them feedback, letting them know it's wrong
  } else {
    // give them feedback, letting them know it's right
    quizEnd()
  }

  // flash right/wrong feedback on page for a short period of time

  // move to next question

  // check if we've run out of questions
  // if so, end the quiz
  // else, get the next question
}

/// FUNCTION TO END THE QUIZ ///
function quizEnd() {
  questionsEl.style.display = "none"
  endScreen.style.display = "block"
  timerEl.textContent = timeCounter;
  clearInterval(timerId)
  document.getElementById("final-score").textContent = (score + timeCounter)
  // stop timer

  // show end screen

  // show final score

  // hide questions section
}

/// FUNCTION FOR UPDATING THE TIME ///
function clockTick() {
  // update time
  timerId = setInterval(function () {
    timerEl.textContent = timeCounter;
    if (timeCounter > 0) {
      timeCounter--;
    } else {
      quizEnd()
    }
  }, 1000)
  // check if user ran out of time
}

function saveHighscore() {
  // get value of input box - for initials
  var userName = document.getElementById("initials")
  var previousScore = JSON.parse(localStorage.getItem("codequiz")) || []
  previousScore.push({
    user: userName,
    score: (score + timeCounter)
  })
  localStorage.setItem("codequiz", JSON.stringify(previousScore))
  endScreen.style.display = "none"
  highscore.style.display = "block"
  // make sure value wasn't empty
  // get saved scores from localstorage, or if not any, set to empty array

  // format new score object for current user

  // save to localstorage

  // redirect to next page
}

/// CLICK EVENTS ///
// user clicks button to submit initials

// user clicks button to start quiz

startButton.addEventListener("click", startQuiz)
answerA.addEventListener("click", questionClick)
answerB.addEventListener("click", questionClick)
answerC.addEventListener("click", questionClick)
submitButton.addEventListener("click", saveHighscore)
  // user clicks on element containing choices