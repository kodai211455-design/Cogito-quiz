/*
====================================
Cogito Study v0.2.1
quiz.js
単語・熟語テスト
====================================
*/

let quizData = [];

let currentQuestionIndex = 0;

let score = 0;

/*
====================================
テスト設定
====================================
*/

let quizSettings = {

    direction: "jpToEn",

    hintMode: "none",

    questionCount: "all",

    shuffle: true

};

/*
====================================
設定読み込み
====================================
*/

function loadQuizSettings() {

    quizSettings.direction =
        document.querySelector(
            'input[name="quizDirection"]:checked'
        ).value;

    quizSettings.hintMode =
        document.querySelector(
            'input[name="hintMode"]:checked'
        ).value;

    quizSettings.questionCount =
        document.querySelector(
            'input[name="questionCount"]:checked'
        ).value;

    quizSettings.shuffle =
        document.getElementById(
            "shuffleQuestions"
        ).checked;

}

/*
====================================
テスト開始
====================================
*/

function initializeQuiz(notebook) {

    loadQuizSettings();

    quizData = [...notebook.words];

    /*
    ----------------------------
    シャッフル
    ----------------------------
    */

    if (quizSettings.shuffle) {

        shuffleArray(quizData);

    }

    /*
    ----------------------------
    問題数
    ----------------------------
    */

    if (quizSettings.questionCount !== "all") {

        const count =
            Number(
                quizSettings.questionCount
            );

        quizData =
            quizData.slice(0, count);

    }

    currentQuestionIndex = 0;

    score = 0;

    /*
    ----------------------------
    出題方向表示
    ----------------------------
    */

    if (
        quizSettings.direction
        ===
        "jpToEn"
    ) {

        document
            .getElementById("quizMode")
            .textContent =
            "日本語 → 英語";

    }

    else {

        document
            .getElementById("quizMode")
            .textContent =
            "英語 → 日本語";

    }

    /*
    ----------------------------
    最初の問題
    ----------------------------
    */

    showQuestion();

}
/*
====================================
問題表示
====================================
*/

function showQuestion() {

    const question =
        quizData[currentQuestionIndex];

    document.getElementById("quizProgress").textContent =
        `問題 ${currentQuestionIndex + 1} / ${quizData.length}`;

    /*
    ----------------------------
    出題方向
    ----------------------------
    */

    if (quizSettings.direction === "jpToEn") {

        document.getElementById("quizQuestion").textContent =
            question.answer;

    }

    else {

        document.getElementById("quizQuestion").textContent =
            question.question;

    }

    /*
    ----------------------------
    ヒント
    ----------------------------
    */

    if (quizSettings.direction === "jpToEn") {

        document.getElementById("quizHint").textContent =
            createHint(
                question.question,
                quizSettings.hintMode
            );

    }

    else {

        document.getElementById("quizHint").textContent =
            "（ヒントなし）";

    }

    document.getElementById("quizAnswer").value = "";

    document.getElementById("quizResult").innerHTML = "";

    document.getElementById("checkAnswerBtn").style.display =
        "inline-block";

    document.getElementById("nextQuestionBtn").style.display =
        "none";

}

/*
====================================
ヒント生成
====================================
*/

function createHint(text, mode) {

    if (mode === "none") {

        return "（ヒントなし）";

    }

    const words = text.split(" ");

    return words.map(word => {

        if (word.length === 0) {

            return "";

        }

        /*
        ----------------------------
        頭文字
        ----------------------------
        */

        if (mode === "first") {

            return word[0] + "_".repeat(word.length - 1);

        }

        /*
        ----------------------------
        最初2文字
        ----------------------------
        */

        if (mode === "first2") {

            if (word.length <= 2) {

                return word;

            }

            return word.substring(0,2)
                + "_".repeat(word.length - 2);

        }

        return word;

    }).join(" ");

}

/*
====================================
答え合わせ
====================================
*/

function checkAnswer() {

    const input =
        document.getElementById("quizAnswer")
        .value
        .trim();

    const question =
        quizData[currentQuestionIndex];

    let correctAnswer;

    if (quizSettings.direction === "jpToEn") {

        correctAnswer = question.question;

    }

    else {

        correctAnswer = question.answer;

    }

    if (
        input.toLowerCase()
        ===
        correctAnswer.toLowerCase()
    ) {

        score++;

        document.getElementById("quizResult").innerHTML =

        `
        <p style="color:green;font-weight:bold;">
        ⭕ 正解！
        </p>
        `;

    }

    else {

        document.getElementById("quizResult").innerHTML =

        `
        <p style="color:red;font-weight:bold;">
        ❌ 不正解
        </p>

        <p>

        正解：

        ${correctAnswer}

        </p>
        `;

    }

    document.getElementById("checkAnswerBtn").style.display =
        "none";

    document.getElementById("nextQuestionBtn").style.display =
        "inline-block";

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
結果表示
====================================
*/

function showResult() {

    document.getElementById("quizTitle").textContent =
        "🎉 テスト終了";

    document.getElementById("quizMode").textContent =
        "";

    document.getElementById("quizProgress").textContent =
        "";

    document.getElementById("quizQuestion").innerHTML =
        "お疲れさまでした！";

    document.getElementById("quizHint").textContent =
        "";

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

        <button id="finishQuizBtn">
            編集画面へ戻る
        </button>
        `;

    document
        .getElementById("finishQuizBtn")
        .addEventListener(
            "click",
            () => showEditor(currentNotebook)
        );

}

/*
====================================
シャッフル
====================================
*/

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];

    }

}

/*
====================================
Enterキー対応
====================================
*/

function handleQuizEnter(event) {

    if (event.key !== "Enter") {

        return;

    }

    event.preventDefault();

    if (
        document.getElementById("checkAnswerBtn").style.display
        !==
        "none"
    ) {

        checkAnswer();

    }

    else {

        nextQuestion();

    }

}

/*
====================================
イベント登録
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

    document
        .getElementById("quizAnswer")
        .addEventListener(
            "keydown",
            handleQuizEnter
        );

});
