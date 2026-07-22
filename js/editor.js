/*
====================================
Cogito Study v0.1
editor.js
編集画面専用
====================================
*/

let currentNotebook = null;

/*
====================================
単語読み込み
====================================
*/

function importWords() {

    if (!currentNotebook) return;

    const text =
        document
        .getElementById("wordInput")
        .value
        .trim();

    currentNotebook.words = [];

    if (text !== "") {

        const lines = text.split("\n");

        lines.forEach(line => {

            const parts = line.split(",");

            if (parts.length >= 2) {

                currentNotebook.words.push({

                    question: parts[0].trim(),

                    answer: parts[1].trim()

                });

            }

        });

    }

    updateWordPreview();

}

/*
====================================
文章読み込み
====================================
*/

function importSentences() {

    if (!currentNotebook) return;

    const text =
        document
        .getElementById("sentenceInput")
        .value
        .trim();

    currentNotebook.sentences = [];

    if (text !== "") {

        const lines = text.split("\n");

        lines.forEach(line => {

            const parts = line.split(",");

            if (parts.length >= 2) {

                currentNotebook.sentences.push({

                    question: parts[0].trim(),

                    answer: parts[1].trim()

                });

            }

        });

    }

    updateSentencePreview();

}

/*
====================================
単語プレビュー
====================================
*/

function updateWordPreview() {

    const preview =
        document.getElementById("wordPreview");

    preview.innerHTML = "";

    currentNotebook.words.forEach(word => {

        preview.innerHTML +=
        `<p>${word.question}　→　${word.answer}</p>`;

    });

}

/*
====================================
文章プレビュー
====================================
*/

function updateSentencePreview() {

    const preview =
        document.getElementById("sentencePreview");

    preview.innerHTML = "";

    currentNotebook.sentences.forEach(sentence => {

        preview.innerHTML +=
        `<p>${sentence.question}<br>↓<br>${sentence.answer}</p><hr>`;

    });

}

/*
====================================
保存
====================================
*/

function saveCurrentNotebook() {

    if (!currentNotebook) return;

    currentNotebook.title =
        document
        .getElementById("notebookTitle")
        .value;

    updateNotebook(currentNotebook);

    alert("保存しました！");

}

/*
====================================
イベント
====================================
*/

window.addEventListener("DOMContentLoaded", () => {

    const emptyNotebook = addNotebook("新しい範囲");

    currentNotebook = emptyNotebook;

    document
        .getElementById("notebookTitle")
        .value = currentNotebook.title;

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

    document
        .getElementById("saveNotebookBtn")
        .addEventListener(
            "click",
            saveCurrentNotebook
        );

});
