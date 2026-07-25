/*
====================================
Cogito Study Ver.3
app.js
画面管理
====================================
*/

let notebooks = [];

let currentNotebook = null;

/*
====================================
全画面を非表示
====================================
*/

function hideAllScreens() {

    const screens = [

        "homeScreen",

        "editorScreen",

        "settingsScreen",

        "quizScreen",

        "resultScreen"

    ];

    screens.forEach(id => {

        document
            .getElementById(id)
            .style.display = "none";

    });

}

/*
====================================
ホーム画面
====================================
*/

function showHome() {

    hideAllScreens();

    document
        .getElementById("homeScreen")
        .style.display = "block";

    renderNotebookList();

}

/*
====================================
編集画面
====================================
*/

function showEditor(notebook) {

    currentNotebook = notebook;

    hideAllScreens();

    document
        .getElementById("editorScreen")
        .style.display = "block";

    initializeEditor(

        currentNotebook

    );

}

/*
====================================
テスト設定画面
====================================
*/

function showQuizSettings() {

    if (!currentNotebook) {

        return;

    }

    hideAllScreens();

    document
        .getElementById("settingsScreen")
        .style.display = "block";

    initializeSettings(

        currentNotebook

    );

}

/*
====================================
テスト画面
====================================
*/

function showQuiz() {

    hideAllScreens();

    document
        .getElementById("quizScreen")
        .style.display = "block";

}

/*
====================================
結果画面
====================================
*/

function showResultScreen() {

    hideAllScreens();

    document
        .getElementById("resultScreen")
        .style.display = "block";

}
/*
====================================
ホーム画面更新
====================================
*/

function renderNotebookList() {

    notebooks = loadData();

    const currentArea =
        document.getElementById("currentNotebook");

    const list =
        document.getElementById("notebookList");

    currentArea.innerHTML = "";

    list.innerHTML = "";

    /*
    ================================
    今週の範囲
    ================================
    */

    const current = getCurrentNotebook();

    if (current) {

        const card = createNotebookCard(

            current,

            true

        );

        currentArea.appendChild(card);

    }

    /*
    ================================
    一覧
    ================================
    */

    notebooks.forEach(notebook => {

        const card = createNotebookCard(

            notebook,

            false

        );

        list.appendChild(card);

    });

}

/*
====================================
カード作成
====================================
*/

function createNotebookCard(

    notebook,

    isCurrent

) {

    const card =
        document.createElement("div");

    card.className =

        isCurrent

        ? "card current-card"

        : "card";

    card.innerHTML = `

        <h3>

            ${notebook.title}

        </h3>

        <p>

            単語 ${notebook.words.length}問

        </p>

        <p>

            文章 ${notebook.sentences.length}問

        </p>

        <div class="card-buttons">

            <button class="editBtn">

                ✏ 編集

            </button>

            <button class="quizBtn">

                ▶ テスト

            </button>

        </div>

    `;

    /*
    編集
    */

    card.querySelector(".editBtn")

        .addEventListener(

            "click",

            event => {

                event.stopPropagation();

                showEditor(notebook);

            }

        );

    /*
    テスト
    */

    card.querySelector(".quizBtn")

        .addEventListener(

            "click",

            event => {

                event.stopPropagation();

                currentNotebook = notebook;

                showQuizSettings();

            }

        );

    /*
    カード本体
    */

    card.addEventListener(

        "click",

        () => showEditor(notebook)

    );

    return card;

}

/*
====================================
新しい範囲
====================================
*/

function createNotebook() {

    const title = prompt(

        "範囲名を入力してください"

    );

    if (!title) {

        return;

    }

    addNotebook(title);

    renderNotebookList();

}
/*
====================================
保存
====================================
*/

function saveNotebook() {

    saveCurrentNotebook();

    notebooks = loadData();

    renderNotebookList();

    showHome();

}

/*
====================================
削除
====================================
*/

function removeNotebook() {

    if (!currentNotebook) {

        return;

    }

    if (!confirm("この範囲を削除しますか？")) {

        return;

    }

    if (currentNotebook.isCurrent) {

        clearCurrentNotebook();

    }

    deleteNotebook(

        currentNotebook.id

    );

    currentNotebook = null;

    renderNotebookList();

    showHome();

}

/*
====================================
今週の範囲に設定
====================================
*/

function setCurrentArea() {

    if (!currentNotebook) {

        return;

    }

    setCurrentNotebook(

        currentNotebook.id

    );

    renderNotebookList();

    alert("今週の範囲に設定しました。");

}

/*
====================================
テスト設定へ
====================================
*/

function startQuiz() {

    if (!currentNotebook) {

        return;

    }

    if (

        currentNotebook.words.length === 0 &&

        currentNotebook.sentences.length === 0

    ) {

        alert(

            "問題が登録されていません。"

        );

        return;

    }

    showQuizSettings();

}

/*
====================================
テスト開始
====================================
*/

function beginQuiz() {

    showQuiz();

    initializeQuiz(

        currentNotebook

    );

}

/*
====================================
ホームへ戻る
====================================
*/

function backToHome() {

    renderNotebookList();

    showHome();

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
        ================================
        データ読み込み
        ================================
        */

        notebooks = loadData();

        /*
        ================================
        ホーム表示
        ================================
        */

        showHome();

        /*
        ================================
        ホーム画面
        ================================
        */

        document

            .getElementById("newNotebookBtn")

            .addEventListener(

                "click",

                createNotebook

            );

        /*
        ================================
        編集画面
        ================================
        */

        document

            .getElementById("backButton")

            .addEventListener(

                "click",

                backToHome

            );

        document

            .getElementById("saveNotebookBtn")

            .addEventListener(

                "click",

                saveNotebook

            );

        document

            .getElementById("deleteNotebookBtn")

            .addEventListener(

                "click",

                removeNotebook

            );

        /*
        今週の範囲
        */

        const setCurrentBtn =

            document.getElementById(

                "setCurrentBtn"

            );

        if (setCurrentBtn) {

            setCurrentBtn.addEventListener(

                "click",

                setCurrentArea

            );

        }

        /*
        テスト開始
        */

        document

            .getElementById("startQuizBtn")

            .addEventListener(

                "click",

                startQuiz

            );

        /*
        ================================
        テスト設定画面
        ================================
        */


        const backToEditorFromSettingsBtn =

            document.getElementById(

                "backToEditorFromSettingsBtn"

            );

        if (

            backToEditorFromSettingsBtn

        ) {

            backToEditorFromSettingsBtn

                .addEventListener(

                    "click",

                    () =>

                        showEditor(

                            currentNotebook

                        )

                );

        }

        /*
        ================================
        テスト画面
        ================================
        */

        document

            .getElementById(

                "backToSettingsBtn"

            )

            .addEventListener(

                "click",

                showQuizSettings

            );

        document

            .getElementById(

                "backToEditorBtn"

            )

            .addEventListener(

                "click",

                () =>

                    showEditor(

                        currentNotebook

                    )

            );

        /*
        ================================
        編集機能
        ================================
        */

        document

            .getElementById(

                "importWordsBtn"

            )

            .addEventListener(

                "click",

                importWords

            );

        document

            .getElementById(

                "importSentencesBtn"

            )

            .addEventListener(

                "click",

                importSentences

            );

    }

);
