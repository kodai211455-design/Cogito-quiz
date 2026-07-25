/*
====================================
Cogito Study Ver.3
storage.js
データ保存
====================================
*/

const STORAGE_KEY = "cogitoStudyData";

/*
====================================
データ読み込み
====================================
*/

function loadData() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        return [];

    }

    try {

        return JSON.parse(data);

    }

    catch (error) {

        console.error("データの読み込みに失敗しました。");

        return [];

    }

}

/*
====================================
データ保存
====================================
*/

function saveData(notebooks) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(notebooks)

    );

}

/*
====================================
新しい範囲作成
====================================
*/

function addNotebook(title) {

    const notebooks = loadData();

    const now = new Date().toLocaleString();

    const notebook = {

        id: Date.now(),

        title: title,

        words: [],

        sentences: [],

        isCurrent: false,

        created: now,

        updated: now

    };

    notebooks.push(notebook);

    saveData(notebooks);

    return notebook;

}
/*
====================================
範囲取得
====================================
*/

function getNotebook(id) {

    const notebooks = loadData();

    return notebooks.find(

        notebook => notebook.id == id

    );

}

/*
====================================
範囲更新
====================================
*/

function updateNotebook(updatedNotebook) {

    const notebooks = loadData();

    const index = notebooks.findIndex(

        notebook => notebook.id == updatedNotebook.id

    );

    if (index === -1) {

        return;

    }

    updatedNotebook.updated =

        new Date().toLocaleString();

    notebooks[index] = updatedNotebook;

    saveData(notebooks);

}

/*
====================================
範囲削除
====================================
*/

function deleteNotebook(id) {

    const notebooks = loadData();

    const newList = notebooks.filter(

        notebook => notebook.id != id

    );

    saveData(newList);

}

/*
====================================
今週の範囲に設定
====================================
*/

function setCurrentNotebook(id) {

    const notebooks = loadData();

    notebooks.forEach(notebook => {

        notebook.isCurrent =

            notebook.id == id;

    });

    saveData(notebooks);

}

/*
====================================
今週の範囲を取得
====================================
*/

function getCurrentNotebook() {

    const notebooks = loadData();

    return notebooks.find(

        notebook => notebook.isCurrent

    ) || null;

}
/*
====================================
今週の範囲解除
====================================
*/

function clearCurrentNotebook() {

    const notebooks = loadData();

    notebooks.forEach(notebook => {

        notebook.isCurrent = false;

    });

    saveData(notebooks);

}

/*
====================================
全データ削除
====================================
*/

function deleteAllData() {

    localStorage.removeItem(

        STORAGE_KEY

    );

}

/*
====================================
データ有無確認
====================================
*/

function hasData() {

    return loadData().length > 0;

}

/*
====================================
Ver.3 データ移行
====================================
*/

function migrateData() {

    const notebooks = loadData();

    let changed = false;

    notebooks.forEach(notebook => {

        if (notebook.isCurrent === undefined) {

            notebook.isCurrent = false;

            changed = true;

        }

        if (!notebook.created) {

            notebook.created =

                new Date().toLocaleString();

            changed = true;

        }

        if (!notebook.updated) {

            notebook.updated =

                notebook.created;

            changed = true;

        }

    });

    if (changed) {

        saveData(notebooks);

    }

}

/*
====================================
初期化
====================================
*/

migrateData();
