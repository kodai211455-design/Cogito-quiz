/*
====================================
Cogito Study Ver.3
hint.js
ヒント・文字列処理
====================================
*/

/*
====================================
ヒント作成
====================================
*/

function createHint(answer, hintMode) {

    if (!answer) {

        return "";

    }

    /*
    ヒントなし
    */

    if (hintMode === "none") {

        return "";

    }

    /*
    単語ごとに分割
    */

    const words = answer.trim().split(/\s+/);

    /*
    頭文字
    */

    if (hintMode === "first") {

        return words

            .map(word => word.charAt(0))

            .join(" ");

    }

    /*
    最初2文字
    */

    if (hintMode === "first2") {

        return words

            .map(word => word.substring(0, 2))

            .join(" ");

    }

    /*
    不明な設定
    */

    return "";

}

/*
====================================
答えを比較用に整形
====================================
*/

function normalizeAnswer(text) {

    if (!text) {

        return "";

    }

    return text

        .trim()

        .toLowerCase()

        .replace(/\s+/g, " ");

}

/*
====================================
完全一致判定
====================================
*/

function isCorrectAnswer(input, answer) {

    return (

        normalizeAnswer(input)

        ===

        normalizeAnswer(answer)

    );

}

/*
====================================
デバッグ用
====================================
*/

function previewHint() {

    console.log(

        createHint(

            "look forward to",

            "first"

        )

    );

}
