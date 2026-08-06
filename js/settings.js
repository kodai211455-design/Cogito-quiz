/*
====================================
Cogito Study Ver.3
settings.js
テスト設定
====================================
*/

/*
====================================
現在の設定
====================================
*/

let quizSettings = {

    direction: "jpToEn",

    hintMode: "none",

    questionType: "words",

    questionCount: 10,

    shuffle: true

};

/*
====================================
設定画面初期化
====================================
*/

function initializeSettings(notebook) {

    currentNotebook = notebook;

    updateQuestionCountLimit();

}

/*
====================================
問題数更新
====================================
*/

function updateQuestionCountLimit() {

    if (!currentNotebook) {

        return;

    }
let maxQuestions = 0;

switch (quizSettings.questionType) {

    case "words":

        maxQuestions =
            currentNotebook.words.length;

        break;

    case "sentences":

        maxQuestions =
            currentNotebook.sentences.length;

        break;

    case "both":

        maxQuestions =
            currentNotebook.words.length +
            currentNotebook.sentences.length;

        break;

}
    const questionCount =

        document.getElementById("questionCount");

    questionCount.max = maxQuestions;

    /*
    現在値が範囲外なら補正
    */

    if (

        Number(questionCount.value) > maxQuestions ||

        Number(questionCount.value) < 1

    ) {

        questionCount.value = maxQuestions;

    }

}

/*
====================================
画面から設定を取得
====================================
*/

function readSettings() {

    /*
    出題方向
    */

    quizSettings.direction =

        document.querySelector(

            "input[name='quizDirection']:checked"

        ).value;

    /*
    ヒント
    */

    quizSettings.hintMode =

        document.querySelector(

            "input[name='hintMode']:checked"

        ).value;
    /*
====================================
出題内容
====================================
*/

quizSettings.questionType =

    document.querySelector(

        "input[name='questionType']:checked"

    ).value;

    /*
    問題数
    */

    quizSettings.questionCount =

        parseInt(

            document
                .getElementById("questionCount")
                .value

        );

    /*
    シャッフル
    */

    quizSettings.shuffle =

        document
            .getElementById("shuffleQuestions")
            .checked;

}
/*
====================================
設定保存
====================================
*/

function saveSettings() {

    readSettings();

    /*
    問題数チェック
    */

    const maxQuestions =

        currentNotebook.words.length;

    if (

        isNaN(quizSettings.questionCount)

    ) {

        quizSettings.questionCount =

            maxQuestions;

    }

    if (

        quizSettings.questionCount < 1

    ) {

        quizSettings.questionCount = 1;

    }

    if (

        quizSettings.questionCount >

        maxQuestions

    ) {

        quizSettings.questionCount =

            maxQuestions;

    }

}

/*
====================================
テスト開始
====================================
*/

function beginQuiz() {

    if (!currentNotebook) {

        return;

    }

    saveSettings();

    showQuiz();

    initializeQuiz(

        currentNotebook,

        quizSettings

    );

}

/*
====================================
現在の設定取得
====================================
*/

function getQuizSettings() {

    return quizSettings;

}

/*
====================================
イベント登録
====================================
*/

window.addEventListener(

    "DOMContentLoaded",

    () => {

        const beginBtn =

            document.getElementById(

                "beginQuizBtn"

            );

        if (beginBtn) {

            beginBtn.addEventListener(

                "click",

                beginQuiz

            );

        }

        /*
        出題内容変更
        */

        document

            .querySelectorAll(

                "input[name='questionType']"

            )

            .forEach(radio => {

                radio.addEventListener(

                    "change",

                    updateQuestionCountLimit

                );

            });

    }

);
