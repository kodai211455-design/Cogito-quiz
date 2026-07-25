/*
====================================
Cogito Study Ver.3
quiz.js
====================================
*/

/*
====================================
テスト状態
====================================
*/

let quizData = [];

let currentQuestion = 0;

let score = 0;

let mistakes = [];

/*
====================================
テスト初期化
====================================
*/

function initializeQuiz(notebook, settings) {

    /*
    状態初期化
    */

    currentQuestion = 0;

    score = 0;

    mistakes = [];

    quizData = [...notebook.words];

    /*
    ランダム出題
    */

    if (settings.shuffle) {

        quizData.sort(() => Math.random() - 0.5);

    }

    /*
    問題数調整
    */

    if (

        settings.questionCount < quizData.length

    ) {

        quizData = quizData.slice(

            0,

            settings.questionCount

        );

    }

    /*
    モード表示
    */

    document.getElementById(

        "quizMode"

    ).textContent =

        settings.direction === "jpToEn"

        ?

        "日本語 → 英語"

        :

        "英語 → 日本語";

    /*
    最初の問題
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

        quizData[currentQuestion];

    const settings =

        getQuizSettings();

    /*
    問題番号
    */

    document.getElementById(

        "quizProgress"

    ).textContent =

        "問題 "

        +

        (currentQuestion + 1)

        +

        " / "

        +

        quizData.length;

    /*
    出題方向
    */

    let questionText = "";

    let answerText = "";

    if (

        settings.direction === "jpToEn"

    ) {

        questionText =

            question.japanese;

        answerText =

            question.english;

    }

    else {

        questionText =

            question.english;

        answerText =

            question.japanese;

    }

    /*
    問題表示
    */

    document.getElementById(

        "quizQuestion"

    ).textContent =

        questionText;

    /*
    ヒント
    */

    if (

        settings.direction === "jpToEn"

    ) {

        const hint =

            createHint(

                answerText,

                settings.hintMode

            );

        document.getElementById(

            "quizHint"

        ).textContent =

            hint || "（ヒントなし）";

    }

    else {

        document.getElementById(

            "quizHint"

        ).textContent =

            "（ヒントなし）";

    }

    /*
    入力欄初期化
    */

    const answerBox =

        document.getElementById(

            "quizAnswer"

        );

    answerBox.value = "";

    answerBox.focus();

    /*
    結果表示クリア
    */

    document.getElementById(

        "quizResult"

    ).textContent = "";

    /*
    ボタン切替
    */

    document.getElementById(

        "checkAnswerBtn"

    ).style.display = "inline-block";

    document.getElementById(

        "nextQuestionBtn"

    ).style.display = "none";

}
/*
====================================
答え合わせ
====================================
*/

function checkAnswer() {

    const settings =

        getQuizSettings();

    const question =

        quizData[currentQuestion];

    /*
    正解取得
    */

    const correctAnswer =

        settings.direction === "jpToEn"

        ?

        question.english

        :

        question.japanese;

    /*
    入力取得
    */

    const userAnswer =

        document
            .getElementById("quizAnswer")
            .value;

    /*
    判定
    */

    if (

        isCorrectAnswer(

            userAnswer,

            correctAnswer

        )

    ) {

        score++;

        document
            .getElementById("quizResult")
            .innerHTML =

            "⭕ 正解！";

    }

    else {

        mistakes.push({

            question:

                settings.direction === "jpToEn"

                ?

                question.japanese

                :

                question.english,

            correct: correctAnswer,

            answer: userAnswer

        });

        document
            .getElementById("quizResult")
            .innerHTML =

            `
            ❌ 不正解<br>
            正解：<b>${correctAnswer}</b>
            `;

    }

    /*
    ボタン切替
    */

    document
        .getElementById("checkAnswerBtn")
        .style.display = "none";

    document
        .getElementById("nextQuestionBtn")
        .style.display = "inline-block";

}

/*
====================================
次の問題
====================================
*/

function nextQuestion() {

    currentQuestion++;

    if (

        currentQuestion >=

        quizData.length

    ) {

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

    document.getElementById("quizScreen").style.display = "none";

    document.getElementById("resultScreen").style.display = "block";

    /*
    得点
    */

    document.getElementById(

        "resultScore"

    ).textContent =

        score + " / " + quizData.length;

    /*
    正答率
    */

    const rate =

        Math.round(

            score / quizData.length * 100

        );

    document.getElementById(

        "resultRate"

    ).textContent =

        "正答率 " + rate + "%";

    /*
    間違えた問題
    */

    const list =

        document.getElementById(

            "mistakeList"

        );

    list.innerHTML = "";

    if (mistakes.length === 0) {

        list.innerHTML =

            "<p>🎉 全問正解です！</p>";

    }

    else {

        mistakes.forEach(item => {

            const div =

                document.createElement("div");

            div.className = "mistakeCard";

            div.innerHTML =

                `
                <p><b>問題</b><br>${item.question}</p>

                <p><b>あなたの答え</b><br>${item.answer || "（未入力）"}</p>

                <p><b>正解</b><br>${item.correct}</p>

                <hr>
                `;

            list.appendChild(div);

        });

    }

}

/*
====================================
もう一度挑戦
====================================
*/

function retryQuiz() {

    document.getElementById(

        "resultScreen"

    ).style.display = "none";

    showQuiz();

    initializeQuiz(

        currentNotebook,

        getQuizSettings()

    );

}

/*
====================================
イベント登録
====================================
*/

window.addEventListener(

    "DOMContentLoaded",

    () => {

        /*
        答え合わせ
        */

        document

            .getElementById(

                "checkAnswerBtn"

            )

            .addEventListener(

                "click",

                checkAnswer

            );

        /*
        次へ
        */

        document

            .getElementById(

                "nextQuestionBtn"

            )

            .addEventListener(

                "click",

                nextQuestion

            );

        /*
        Enterキー対応
        */

        document

            .getElementById(

                "quizAnswer"

            )

            .addEventListener(

                "keydown",

                function(event) {

                    if (

                        event.key !== "Enter"

                    ) {

                        return;

                    }

                    event.preventDefault();

                    const nextVisible =

                        document

                            .getElementById(

                                "nextQuestionBtn"

                            )

                            .style.display

                            !== "none";

                    if (nextVisible) {

                        nextQuestion();

                    }

                    else {

                        checkAnswer();

                    }

                }

            );

        /*
        リトライ
        */

        document

            .getElementById(

                "retryQuizBtn"

            )

            .addEventListener(

                "click",

                retryQuiz

            );

        /*
        編集へ戻る
        */

        document

            .getElementById(

                "returnEditorBtn"

            )

            .addEventListener(

                "click",

                () => showEditor(currentNotebook)

            );

        /*
        ホームへ戻る
        */

        document

            .getElementById(

                "returnHomeBtn"

            )

            .addEventListener(

                "click",

                showHome

            );

    }

);
