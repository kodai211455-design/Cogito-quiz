/*
====================================
Cogito Study v0.1
app.js
画面管理
====================================
*/

let notebooks = [];

/*
====================================
ホーム画面表示
====================================
*/
function showHome() {

    document.getElementById("home").style.display = "block";
    document.getElementById("editor").style.display = "none";

    renderNotebookList();

}

/*
====================================
編集画面表示
====================================
*/
function showEditor(notebook) {

    document.getElementById("home").style.display = "none";
    document.getElementById("editor").style.display = "block";

    initializeEditor(notebook);

}

/*
====================================
単語帳一覧表示
====================================
*/
function renderNotebookList() {

    notebooks = loadData();

    const list = document.getElementById("notebookList");

    list.innerHTML = "";

    if (notebooks.length === 0) {

        list.innerHTML = "<p>まだ範囲がありません。</p>";

        return;

    }

    notebooks.forEach(notebook => {

        const card = document.createElement("div");

        card.className = "notebook";

        card.innerHTML = `
            <h3>${notebook.title}</h3>
            <p>単語：${notebook.words.length}問</p>
            <p>文章：${notebook.sentences.length}問</p>
        `;

        card.addEventListener("click", () => {

            showEditor(notebook);

        });

        list.appendChild(card);

    });

}

/*
====================================
新しい範囲作成
====================================
*/
function createNotebook() {

    const title = prompt("範囲名を入力してください");

    if (!title) return;

    const notebook = addNotebook(title);

    notebooks = loadData();

    showEditor(notebook);

}

/*
====================================
保存
====================================
*/
function saveNotebook() {

    saveCurrentNotebook();

    notebooks = loadData();

    showHome();

}

/*
====================================
削除
====================================
*/
function removeNotebook() {

    if (!currentNotebook) return;

    if (!confirm("この範囲を削除しますか？")) {

        return;

    }

    deleteNotebook(currentNotebook.id);

    notebooks = loadData();

    showHome();

}

/*
====================================
イベント登録
====================================
*/

window.addEventListener("DOMContentLoaded", () => {

    notebooks = loadData();

    showHome();

    document
        .getElementById("newNotebookBtn")
        .addEventListener(
            "click",
            createNotebook
        );

    document
        .getElementById("backButton")
        .addEventListener(
            "click",
            showHome
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

    document
        .getElementById("importWordsBtn")
        .addEventListener(
            "click",
            importWords
        );

    document
        .getElementById("importSentencesBtn")
        .addEventListener(
            "click",
            importSentences
        );

});
