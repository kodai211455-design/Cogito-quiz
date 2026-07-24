/*
====================================
Cogito Study v0.2
quiz.js
単語テスト
====================================
*/

let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

/*
====================================
テスト開始
====================================
*/

function initializeQuiz(notebook) {

    quizData = [...notebook.words];

    shuffleArray(quizData);

    currentQuestionIndex = 0;
    score = 0;

    showQuestion();

}

/*
====================================
問題表示
====================================
*/

function showQuestion() {

    document.getElementById("quizResult").innerHTML = "";

    document.getElementById("nextQuestionBtn").style.display = "none";

    document.getElementById("checkAnswerBtn").style.display = "block";

    document.getElementById("quizAnswer").value = "";

    const question = quizData[currentQuestionIndex];

    document.getElementById("quizMode").textContent =
        "単語問題";

    document.getElementById("quizProgress").textContent =
        `問題 ${currentQuestionIndex + 1} / ${quizData.length}`;

    document.getElementById("quizQuestion").textContent =
        question.question;

}

/*
====================================
答え合わせ
====================================
*/

function checkAnswer() {

    const answer =
        document.getElementById("quizAnswer")
        .value
        .trim();

    const correct =
        quizData[currentQuestionIndex].answer;

    if (answer === correct) {

        score++;

        document.getElementById("quizResult").innerHTML =
            `<p style="color:green;font-weight:bold;">
            ⭕ 正解！
            </p>`;

    } else {

        document.getElementById("quizResult").innerHTML =
            `<p style="color:red;font-weight:bold;">
            ❌ 不正解
            </p>

            <p>
            正解：${correct}
            </p>`;

    }

    document.getElementById("checkAnswerBtn").style.display =
        "none";

    document.getElementById("nextQuestionBtn").style.display =
        "block";

}

/*
====================================
次の問題
====================================
*/

function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex >= quizData.length) {

        showResult();

        return;

    }

    showQuestion();

}

/*
====================================
結果
====================================
*/

function showResult() {

    document.getElementById("quizMode").textContent =
        "テスト終了";

    document.getElementById("quizProgress").textContent =
        "";

    document.getElementById("quizQuestion").innerHTML =
        `お疲れさまでした！`;

    document.getElementById("quizAnswer").style.display =
        "none";

    document.getElementById("checkAnswerBtn").style.display =
        "none";

    document.getElementById("nextQuestionBtn").style.display =
        "none";

    document.getElementById("quizResult").innerHTML =
        `
        <h3>${score} / ${quizData.length} 問正解！</h3>

        <p>
        正答率
        ${Math.round(score / quizData.length * 100)}%
        </p>
        `;

}

/*
====================================
シャッフル
====================================
*/

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];

    }

}

/*
====================================
イベント
====================================
*/

window.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("checkAnswerBtn")
        .addEventListener(
            "click",
            checkAnswer
        );

    document
        .getElementById("nextQuestionBtn")
        .addEventListener(
            "click",
            nextQuestion
        );

});
