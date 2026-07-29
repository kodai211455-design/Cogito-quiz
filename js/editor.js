/*
====================================
Cogito Study Ver.3
editor.js
編集画面
====================================
*/


/*
====================================
編集画面初期化
====================================
*/

function initializeEditor(notebook) {

    currentNotebook = notebook;

    document
        .getElementById("notebookTitle")
        .value = notebook.title;

document
    .getElementById("wordInput")
    .value = notebook.words
        .map(item => `${item.question}|||${item.answer}`)
        .join("\n");

document
    .getElementById("sentenceInput")
    .value = notebook.sentences
        .map(item => `${item.question}|||${item.answer}`)
        .join("\n");

    updateWordPreview();

    updateSentencePreview();

}

/*
====================================
テキスト解析
====================================
*/

function parseLines(text) {

    const result = [];

    if (!text.trim()) {

        return result;

    }

    const lines = text.split("\n");

    lines.forEach(line => {

        line = line.trim();

        if (line === "") {

            return;

        }

/*
区切り文字「|||」で分割
*/

const parts = line.split("|||");

if (parts.length !== 2) {

    return;

}

const question = parts[0].trim();

const answer = parts[1].trim();
        
        if (

            question === "" ||

            answer === ""

        ) {

            return;

        }

        result.push({

            question,

            answer

        });

    });

    return result;

}

const SEPARATOR = "|||";
const parts = line.split(SEPARATOR);

/*
====================================
単語読み込み
====================================
*/

function importWords() {

    if (!currentNotebook) {

        return;

    }

    const text =

        document

            .getElementById(

                "wordInput"

            )

            .value;

    currentNotebook.words =

        parseLines(text);

    updateWordPreview();

}

/*
====================================
文章読み込み
====================================
*/

function importSentences() {

    if (!currentNotebook) {

        return;

    }

    const text =

        document

            .getElementById(

                "sentenceInput"

            )

            .value;

    currentNotebook.sentences =

        parseLines(text);

    updateSentencePreview();

}

/*
====================================
読み込みボタン
====================================
*/

function importAll() {

    importWords();

    importSentences();

}
/*
====================================
単語プレビュー更新
====================================
*/

function updateWordPreview() {

    const preview =

        document.getElementById(

            "wordPreview"

        );

    preview.innerHTML = "";

    if (

        !currentNotebook ||

        currentNotebook.words.length === 0

    ) {

        preview.innerHTML =

            "<p>まだ単語・熟語はありません。</p>";

        return;

    }

    currentNotebook.words.forEach((item, index) => {

        const div =

            document.createElement("div");

        div.className = "previewCard";

        div.innerHTML =

            `
            <b>${index + 1}.</b>

            ${item.question}

            <br>

            ↓

            <br>

            ${item.answer}
            `;

        preview.appendChild(div);

    });

}

/*
====================================
文章プレビュー更新
====================================
*/

function updateSentencePreview() {

    const preview =

        document.getElementById(

            "sentencePreview"

        );

    preview.innerHTML = "";

    if (

        !currentNotebook ||

        currentNotebook.sentences.length === 0

    ) {

        preview.innerHTML =

            "<p>まだ文章はありません。</p>";

        return;

    }

    currentNotebook.sentences.forEach((item, index) => {

        const div =

            document.createElement("div");

        div.className = "previewCard";

        div.innerHTML =

            `
            <b>${index + 1}.</b>

            <br>

            ${item.question}

            <br>

            ↓

            <br>

            ${item.answer}
            `;

        preview.appendChild(div);

    });

}
/*
====================================
現在の内容を保存
====================================
*/

function saveCurrentNotebook() {

    if (!currentNotebook) {

        return;

    }

    /*
    範囲名
    */

    currentNotebook.title =

        document

            .getElementById(

                "notebookTitle"

            )

            .value

            .trim();

    /*
    念のため再読み込み
    */

    importWords();

    importSentences();

    /*
    保存
    */

    updateNotebook(

        currentNotebook

    );

    alert("保存しました！");

}
