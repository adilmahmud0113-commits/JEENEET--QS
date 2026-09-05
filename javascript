const questions = [
  {
    exam: "JEE",
    subject: "Physics",
    question:
      "একটি বস্তু স্থির অবস্থা থেকে 2 m/s² ত্বরণে 5 সেকেন্ড চলে। বস্তুটি কত দূরত্ব অতিক্রম করবে?",
    options: ["10 m", "20 m", "25 m", "50 m"],
    answer: 2,
    solution:
      "সূত্র: s = ut + ½at²\n" +
      "u = 0, a = 2, t = 5\n" +
      "s = 0 + ½ × 2 × 5²\n" +
      "সুতরাং s = 25 m।"
  },

  {
    exam: "JEE",
    subject: "Chemistry",
    question: "পানির রাসায়নিক সংকেত কোনটি?",
    options: ["CO₂", "H₂O", "O₂", "NaCl"],
    answer: 1,
    solution:
      "পানির একটি অণুতে 2টি Hydrogen এবং 1টি Oxygen থাকে। তাই সংকেত H₂O।"
  },

  {
    exam: "JEE",
    subject: "Mathematics",
    question: "যদি x + 5 = 12 হয়, তবে x-এর মান কত?",
    options: ["5", "6", "7", "8"],
    answer: 2,
    solution:
      "x + 5 = 12\n" +
      "x = 12 − 5\n" +
      "সুতরাং x = 7।"
  },

  {
    exam: "NEET",
    subject: "Biology",
    question: "মানবদেহে রক্ত পাম্প করে কোন অঙ্গ?",
    options: ["ফুসফুস", "হৃদপিণ্ড", "কিডনি", "যকৃত"],
    answer: 1,
    solution:
      "হৃদপিণ্ড একটি পেশিবহুল অঙ্গ। এটি সারা শরীরে রক্ত সঞ্চালন করে।"
  },

  {
    exam: "NEET",
    subject: "Physics",
    question: "বেগের SI একক কী?",
    options: ["মিটার", "সেকেন্ড", "মিটার/সেকেন্ড", "নিউটন"],
    answer: 2,
    solution:
      "বেগ = সরণ ÷ সময়। তাই বেগের SI একক m/s।"
  }
];

let current = 0;
let score = 0;
let selectedQuestions = [];
let answered = false;

const exam = document.getElementById("exam");
const subject = document.getElementById("subject");
const quizCard = document.getElementById("quizCard");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");

document.getElementById("startBtn").onclick = startPractice;
document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("solutionBtn").onclick = showSolution;
document.getElementById("solveBtn").onclick = solveCustom;

function startPractice() {
  selectedQuestions = questions.filter(q =>
    q.exam === exam.value &&
    q.subject === subject.value
  );

  if (selectedQuestions.length === 0) {
    alert("এই বিষয়ের প্রশ্ন এখনো যোগ করা হয়নি।");
    return;
  }

  current = 0;
  score = 0;
  quizCard.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = selectedQuestions[current];

  answered = false;

  progress.textContent =
    "প্রশ্ন " + (current + 1) + " / " + selectedQuestions.length;

  scoreText.textContent = "Score: " + score;

  questionText.textContent = q.question;

  optionsBox.innerHTML = "";
  feedback.classList.add("hidden");

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.className = "option";
    btn.textContent =
      String.fromCharCode(65 + index) + ". " + option;

    btn.onclick = () => checkAnswer(index, btn);

    optionsBox.appendChild(btn);
  });
}

function checkAnswer(index, clickedButton) {
  if (answered) return;

  answered = true;

  const q = selectedQuestions[current];
  const buttons = optionsBox.querySelectorAll("button");

  buttons.forEach(btn => btn.disabled = true);

  if (index === q.answer) {
    score++;
    clickedButton.classList.add("correct");
    feedback.textContent = "✅ সঠিক উত্তর!";
  } else {
    clickedButton.classList.add("wrong");
    buttons[q.answer].classList.add("correct");

    feedback.textContent =
      "❌ ভুল উত্তর। সঠিক উত্তর: " + q.options[q.answer];
  }

  feedback.classList.remove("hidden");
  scoreText.textContent = "Score: " + score;
}

function showSolution() {
  const q = selectedQuestions[current];

  feedback.textContent =
    "সঠিক উত্তর: " + q.options[q.answer] +
    "\n\n" + q.solution;

  feedback.classList.remove("hidden");
}

function nextQuestion() {
  if (!answered) {
    alert("আগে একটি উত্তর নির্বাচন করুন।");
    return;
  }

  if (current < selectedQuestions.length - 1) {
    current++;
    loadQuestion();
  } else {
    alert("🎉 Practice শেষ!\nScore: " + score);
  }
}

function solveCustom() {
  const text = document.getElementById("customQuestion").value.trim();
  const result = document.getElementById("customResult");

  if (!text) {
    alert("আগে একটি প্রশ্ন লিখুন।");
    return;
  }

  result.textContent =
    "আপনার প্রশ্ন:\n" + text +
    "\n\n" +
    "AI Solver এখনো সংযুক্ত করা হয়নি। " +
    "পরের ধাপে Backend + AI API যোগ করলে " +
    "প্রশ্ন লিখে ধাপে ধাপে সমাধান পাওয়া যাবে।";

  result.classList.remove("hidden");
  }
