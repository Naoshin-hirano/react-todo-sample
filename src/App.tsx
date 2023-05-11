import React, { useState } from "react";
import "./App.css";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<any>([]);
    const [count, setCount] = useState(1);

    console.log("レンダー");

    // テキストフィールドの入力
    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    // Todoの投稿
    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!text) {
            alert("文字を入力してください");
            return;
        }
        const increment = count + 1;
        setCount(increment);
        const newTodos = [
            ...todos,
            { id: count, title: text, completed: false, editMode: false },
        ];
        setTodos(newTodos);
    };

    // Todoの削除
    const deleteItem = (id: number) => {
        const question = window.confirm("本当に削除してもよろしいですか？");
        if (!question) {
            return;
        }
        let newItems = todos.filter((item: any) => item.id !== id);
        setTodos(newItems);
    };

    // Todoの編集
    const editItem = (id: any) => {
        const newTodos = todos.map((item: any) => {
            const newItem = { ...item };
            if (newItem.id == id) {
                newItem.editMode = !newItem.editMode;
            }
            return newItem;
        });
        setTodos(newTodos);
    };

    // Todoの完了チェック
    const handleComplete = (e: any) => {
        const newTodos = todos.map((item: any) => {
            const newItem = { ...item };
            // todo: 型を合わせたら===にする
            if (newItem.id == e.target.value) {
                newItem.completed = !newItem.completed;
            }
            return newItem;
        });
        setTodos(newTodos);
    };

    // Todoのタイトルを編集モードへ
    const handleEditChange = (e: any) => {
        const newTodos = todos.map((item: any) => {
            const newItem = { ...item };
            if (newItem.id == e.target.id) {
                newItem.title = e.target.value;
            }
            return newItem;
        });
        setTodos(newTodos);
    };

    // 完了フラグの数
    const getCheckedCount = () => {
        let count = 0;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                count++;
            }
        }
        return count;
    };

    return (
        <div className="App">
            <div className="todoapp">
                <form id="js-form" onSubmit={onSubmit}>
                    <input
                        id="js-form-input"
                        className="new-todo"
                        type="text"
                        placeholder="What need to be done?"
                        autoComplete="off"
                        value={text}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </form>
                <div id="keep-btn" onClick={onSubmit}>
                    保存
                </div>
                <div id="js-todo-list" className="todo-list">
                    <ul>
                        {todos &&
                            todos.map((item: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            value={item.id}
                                            onChange={(e) => {
                                                handleComplete(e);
                                            }}
                                        />
                                        <span className="editZone"></span>
                                        {item.editMode ? (
                                            <input
                                                id={item.id}
                                                type="text"
                                                className="editField"
                                                placeholder={item.title}
                                                value={item.title}
                                                onChange={(e) => {
                                                    handleEditChange(e);
                                                }}
                                            />
                                        ) : (
                                            <span className="title">
                                                {item.completed ? (
                                                    <s>{item.title}</s>
                                                ) : (
                                                    item.title
                                                )}
                                            </span>
                                        )}
                                        <button
                                            className="delete"
                                            onClick={() => {
                                                deleteItem(item.id);
                                            }}
                                        >
                                            x
                                        </button>
                                        <span className="editBtnZone"></span>
                                        {item.editMode ? (
                                            <button
                                                className="editSave"
                                                onClick={() => {
                                                    editItem(item.id);
                                                }}
                                            >
                                                保存
                                            </button>
                                        ) : (
                                            <button
                                                className="edit"
                                                onClick={() => {
                                                    editItem(item.id);
                                                }}
                                            >
                                                編集
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <footer className="footer">
                    <span id="js-todo-count">
                        Todoアイテム数: {todos.length}
                    </span>
                    <br />
                    <span id="non-complete">
                        未完了: {todos.length - getCheckedCount()}
                    </span>
                    <br />
                    <span id="completed">完了済み: {getCheckedCount()}</span>
                </footer>
            </div>
            ;
        </div>
    );
}

export default App;
