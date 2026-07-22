/*
====================================
Cogito Study v0.1
storage.js
データ保存専用
====================================
*/

// 保存キー
const STORAGE_KEY = "cogitoStudyData";

/*
====================================
データ取得
====================================
*/
function loadData() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (e) {

        console.error("データの読み込みに失敗しました。");

        return [];

    }

}

/*
====================================
データ保存
====================================
*/
function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

/*
====================================
新しい範囲を追加
====================================
*/
function addNotebook(title) {

    const notebooks = loadData();

    const notebook = {

        id: Date.now(),

        title: title,

        words: [],

        sentences: [],

        created: new Date().toLocaleString()

    };

    notebooks.push(notebook);

    saveData(notebooks);

    return notebook;

}

/*
====================================
範囲を取得
====================================
*/
function getNotebook(id) {

    const notebooks = loadData();

    return notebooks.find(n => n.id == id);

}

/*
====================================
範囲を更新
====================================
*/
function updateNotebook(updatedNotebook) {

    const notebooks = loadData();

    const index = notebooks.findIndex(
        n => n.id == updatedNotebook.id
    );

    if (index !== -1) {

        notebooks[index] = updatedNotebook;

        saveData(notebooks);

    }

}

/*
====================================
範囲削除
====================================
*/
function deleteNotebook(id) {

    const notebooks = loadData();

    const newList = notebooks.filter(
        n => n.id != id
    );

    saveData(newList);

}

/*
====================================
全削除
====================================
*/
function deleteAllData() {

    localStorage.removeItem(STORAGE_KEY);

}

/*
====================================
データ有無確認
====================================
*/
function hasData() {

    return loadData().length > 0;

}
