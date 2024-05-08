const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'The prince abdicated the crown and returned to his castle. Abdicated means?',
        choice1: 'Gave up',
        choice2: 'Sold',
        choice3: 'Reinvested into',
        choice4: 'Auctioned',
        answer: 1,
    },
    {
        question: 'The convicted criminal absconded prior to the sentencing phase of the trial. Absconded means?',
        choice1: 'Touched the jury',
        choice2: 'Reported immediately',
        choice3: 'Left after discussion',
        choice4: "Departed secretly",
        answer: 4,
    },
    {
        question: 'The aural component of balance is critical for postural control during ambulation. Aural means related to the?',
        choice1: 'Eye',
        choice2: 'Ear',
        choice3: 'Nose',
        choice4: 'Mouth',
        answer: 2,
    },
    {
        question: 'The old man was benevolent with his fortune. Benevolent means?',
        choice1: 'Secretive',
        choice2: 'Stingy',
        choice3: 'Kind',
        choice4: 'Careful',
        answer: 3,
    },
    {
        question: 'The extra dirt was a key buttress to the foundation. Buttress means?',
        choice1: 'Limiting factor',
        choice2: 'Support',
        choice3: 'Overwhelming condition',
        choice4: 'Obstacle',
        answer: 2,
    },
    {
        question: 'The cathode of a battery was removed. Cathode means?',
        choice1: 'Positive pole',
        choice2: 'Negative pole',
        choice3: 'Neutral pole',
        choice4: 'Opposite pole',
        answer: 2,
    },
    {
        question: 'The doctor was known as a charlatan over the years of his practice. Charlatan means?',
        choice1: 'Quack',
        choice2: 'Knowledgeable physician',
        choice3: 'Procedural physician',
        choice4: 'Medical examiner',
        answer: 1,
    },
    {
        question: 'The wound exhibited signs of copious drainage requiring medical intervention?',
        choice1: 'Minimal',
        choice2: 'Clear',
        choice3: 'Maximal',
        choice4: 'Foul',
        answer: 3,
    },
    {
        question: 'The attorney accused the witness of defaming the defendant. Defaming means?',
        choice1: 'Killing',
        choice2: 'Badgering',
        choice3: 'Suffocating',
        choice4: 'Slandering',
        answer: 4,
    },
    {
        question: 'The detective was able to derive the facts of the case. Derive means?',
        choice1: 'Desist',
        choice2: 'Deter',
        choice3: 'Devise',
        choice4: 'Deduce',
        answer: 4,
    },
    {
        question: 'The scientist was able to evoke powerful emotions from her audience. Evoke means?',
        choice1: 'Sell',
        choice2: 'Calm',
        choice3: 'Call forth',
        choice4: 'Exaggerate',
        answer: 3,
    },
    {
        question: 'The judge was fallible during deliberation. Fallible means?',
        choice1: 'Careful not to err',
        choice2: 'Falsely accused',
        choice3: 'Loyal to his supporters',
        choice4: "Capable of mistakes",
        answer: 1,
    },
    {
        question: 'The chemist collected the germane data during the experiment. Germane means?',
        choice1: 'Relevant',
        choice2: 'Obscure',
        choice3: 'Limited',
        choice4: 'Usual',
        answer: 1,
    },
    {
        question: 'The desperados held up in a grotto in New Mexico during the escape. Grotto mean?',
        choice1: 'Large cave',
        choice2: 'Small cavern',
        choice3: 'Hotel',
        choice4: 'Motel',
        answer: 2,
    },
    {
        question: 'The official exhibited a heedless attitude when dealing with the dignitaries. Heedless means?',
        choice1: 'Thoughtless',
        choice2: 'Pleasant',
        choice3: 'Friendly',
        choice4: 'Bitter',
        answer: 1,
    },
    {
        question: 'The Sherman tank commander noted innumerable troops moving forward against his position. Innumerable means?',
        choice1: 'Limited',
        choice2: 'Weary',
        choice3: 'Countless',
        choice4: 'Harmless',
        answer: 3,
    },
    {
        question: 'The general tried to instill in his troops the hope of victory. Instill means?',
        choice1: 'Infuse',
        choice2: 'Delay',
        choice3: 'Inscribe',
        choice4: 'Indict',
        answer: 1,
    },
    {
        question: 'The winning team of the World Series often has a jovial attitude. Jovial means?',
        choice1: 'Merry',
        choice2: 'Sad',
        choice3: 'Somber',
        choice4: 'Laborious',
        answer: 1,
    },
    {
        question: 'The plant entered the latent phase of development in the fall. Latent means?',
        choice1: 'First',
        choice2: 'Growth',
        choice3: 'Last',
        choice4: 'Dormant',
        answer: 4,
    },
    {
        question: 'The yacht club members were excited about conditions on the loch. Loch means?',
        choice1: 'Water',
        choice2: 'Lake',
        choice3: 'Gulf',
        choice4: 'Ocean',
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()