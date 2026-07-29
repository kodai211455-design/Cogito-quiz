/*
====================================
Cogito Study Ver.3
quiz.js
テスト機能
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
    ====================================
    テスト状態をリセット
    ====================================
    */

    currentQuestion = 0;

    score = 0;

    mistakes = [];

    /*
====================================
問題データ作成
====================================
*/

switch (settings.questionType) {

    /*
    ----------------------------
    単語のみ
    ----------------------------
    */

    case "words":

        quizData = [...notebook.words];

        break;

    /*
    ----------------------------
    文章のみ
    ----------------------------
    */

    case "sentences":

        quizData = [...notebook.sentences];

        break;

    /*
    ----------------------------
    両方
    ----------------------------
    */

    case "both":

        quizData = [

            ...notebook.words,

            ...notebook.sentences

        ];

        break;

    /*
    ----------------------------
    保険
    ----------------------------
    */

    default:

        quizData = [...notebook.words];

}
    /*
====================================
問題がない場合
====================================
*/

if (quizData.length === 0) {

    alert("この条件で出題できる問題がありません。");

    showQuizSettings();

    return;

}

    /*
    ====================================
    シャッフル
    ====================================
    */

    if (settings.shuffle) {

        quizData.sort(

            () => Math.random() - 0.5

        );

    }

    /*
    ====================================
    問題数を調整
    ====================================
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
    ====================================
    出題方向を表示
    ====================================
    */

    document.getElementById(
        "quizMode"
    ).textContent =

        settings.direction === "jpToEn"

            ? "日本語 → 英語"

            : "英語 → 日本語";

    /*
    ====================================
    最初の問題を表示
    ====================================
    */

    showQuestion();

}
/*
====================================
問題表示
====================================
*/

function showQuestion() {

    /*
    ====================================
    現在の問題を取得
    ====================================
    */

    const question =
        quizData[currentQuestion];

    /*
    ====================================
    設定を取得
    ====================================
    */

    const settings =
        getQuizSettings();

    /*
    ====================================
    問題番号
    ====================================
    */

    document.getElementById(
        "quizProgress"
    ).textContent =

        "問題 " +

        (currentQuestion + 1) +

        " / " +

        quizData.length;

    /*
    ====================================
    問題文と正解を決定
    ====================================
    */

    let questionText = "";

    let answerText = "";

    /*
    ====================================
    日本語 → 英語
    ====================================
    */

    if (

        settings.direction === "jpToEn"

    ) {

        questionText =
            question.answer;

        answerText =
            question.question;

    }

    /*
    ====================================
    英語 → 日本語
    ====================================
    */

    else {

        questionText =
            question.question;

        answerText =
            question.answer;

    }

    /*
    ====================================
    問題を表示
    ====================================
    */

    document.getElementById(
        "quizQuestion"
    ).textContent =

        questionText;

    /*
    ====================================
    ヒント
    ====================================
    */

    const hintElement =
        document.getElementById(
            "quizHint"
        );

    /*
    日本語 → 英語の場合
    英語の答えに対してヒントを表示
    */

    if (

        settings.direction === "jpToEn"

    ) {

        const hint =
            createHint(
                answerText,
                settings.hintMode
            );

        hintElement.textContent =

            hint || "（ヒントなし）";

    }

    /*
    英語 → 日本語の場合
    */

    else {

        hintElement.textContent =
            "（ヒントなし）";

    }

    /*
    ====================================
    入力欄をリセット
    ====================================
    */

    const answerBox =
        document.getElementById(
            "quizAnswer"
        );

    answerBox.value = "";

    answerBox.focus();

    /*
    ====================================
    結果表示をリセット
    ====================================
    */

    document.getElementById(
        "quizResult"
    ).textContent = "";

    /*
    ====================================
    ボタン表示をリセット
    ====================================
    */

    document.getElementById(
        "checkAnswerBtn"
    ).style.display =
        "inline-block";

    document.getElementById(
        "nextQuestionBtn"
    ).style.display =
        "none";

}
/*
====================================
答え合わせ
====================================
*/

function checkAnswer() {

    /*
    ====================================
    現在の問題を取得
    ====================================
    */

    const question =
        quizData[currentQuestion];

    /*
    ====================================
    設定を取得
    ====================================
    */

    const settings =
        getQuizSettings();

    /*
    ====================================
    正解を決定
    ====================================
    */

    let correctAnswer = "";

    if (

        settings.direction === "jpToEn"

    ) {

        correctAnswer =
            question.question;

    }

    else {

        correctAnswer =
            question.answer;

    }

    /*
    ====================================
    ユーザーの回答を取得
    ====================================
    */

    const answerBox =
        document.getElementById(
            "quizAnswer"
        );

    const userAnswer =
        answerBox.value;

    /*
    ====================================
    正誤判定
    ====================================
    */

    if (

        isCorrectAnswer(
            userAnswer,
            correctAnswer
        )

    ) {

        /*
        正解
        */

        score++;

        document.getElementById(
            "quizResult"
        ).innerHTML =

            "⭕ 正解！";

    }

    else {

        /*
        不正解
        */

        mistakes.push({

            question:

                settings.direction === "jpToEn"

                    ? question.answer
                    : question.question,

            correct:
                correctAnswer,

            answer:
                userAnswer

        });

        document.getElementById(
            "quizResult"
        ).innerHTML =

            `
            ❌ 不正解<br>
            正解：<b>${correctAnswer}</b>
            `;

    }

    /*
    ====================================
    ボタン切り替え
    ====================================
    */

    document.getElementById(
        "checkAnswerBtn"
    ).style.display =
        "none";

    document.getElementById(
        "nextQuestionBtn"
    ).style.display =
        "inline-block";

}

/*
====================================
次の問題
====================================
*/

function nextQuestion() {

    /*
    次の問題へ
    */

    currentQuestion++;

    /*
    ====================================
    最後まで終わった場合
    ====================================
    */

    if (

        currentQuestion >=
        quizData.length

    ) {

        showResult();

        return;

    }

    /*
    ====================================
    次の問題を表示
    ====================================
    */

    showQuestion();

}
/*
====================================
結果表示
====================================
*/

function showResult() {

    /*
    ====================================
    テスト画面を非表示
    ====================================
    */

    document.getElementById(
        "quizScreen"
    ).style.display = "none";

    /*
    ====================================
    結果画面を表示
    ====================================
    */

    document.getElementById(
        "resultScreen"
    ).style.display = "block";

    /*
    ====================================
    得点
    ====================================
    */

    document.getElementById(
        "resultScore"
    ).textContent =

        score +
        " / " +
        quizData.length;

    /*
    ====================================
    正答率
    ====================================
    */

    const rate =

        quizData.length > 0

            ? Math.round(
                score /
                quizData.length *
                100
            )

            : 0;

    document.getElementById(
        "resultRate"
    ).textContent =

        "正答率 " +
        rate +
        "%";

    /*
    ====================================
    間違えた問題
    ====================================
    */

    const list =
        document.getElementById(
            "mistakeList"
        );

    list.innerHTML = "";

    /*
    全問正解
    */

    if (mistakes.length === 0) {

        list.innerHTML =
            "<p>🎉 全問正解です！</p>";

        return;

    }

    /*
    間違えた問題を表示
    */

    mistakes.forEach(item => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "mistakeCard";

        div.innerHTML =

            `
            <p>
                <b>問題</b><br>
                ${item.question}
            </p>

            <p>
                <b>あなたの答え</b><br>
                ${item.answer || "（未入力）"}
            </p>

            <p>
                <b>正解</b><br>
                ${item.correct}
            </p>

            <hr>
            `;

        list.appendChild(div);

    });

}

/*
====================================
もう一度挑戦
====================================
*/

function retryQuiz() {

    /*
    結果画面を非表示
    */

    document.getElementById(
        "resultScreen"
    ).style.display = "none";

    /*
    テスト画面を表示
    */

    showQuiz();

    /*
    テストを初期化
    */

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
        ====================================
        答え合わせ
        ====================================
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
        ====================================
        次の問題
        ====================================
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
        ====================================
        Enterキー対応
        ====================================
        */

        document

            .getElementById(
                "quizAnswer"
            )

            .addEventListener(

                "keydown",

                function(event) {

                    /*
                    Enter以外は何もしない
                    */

                    if (

                        event.key !== "Enter"

                    ) {

                        return;

                    }

                    event.preventDefault();

                    /*
                    次の問題ボタンが表示中なら
                    次の問題へ
                    */

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
        ====================================
        もう一度挑戦
        ====================================
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
        ====================================
        編集画面へ戻る
        ====================================
        */

        document

            .getElementById(
                "returnEditorBtn"
            )

            .addEventListener(

                "click",

                () => {

                    showEditor(
                        currentNotebook
                    );

                }

            );

        /*
        ====================================
        ホームへ戻る
        ====================================
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
