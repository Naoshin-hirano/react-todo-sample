import React, { useState } from "react";
import "./App.css";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<any>([]);
    const [count, setCount] = useState(1);

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const increment = count + 1;
        setCount(increment);
        const newTodos = [
            ...todos,
            { id: count, title: text, completed: false, editMode: false },
        ];
        setTodos(newTodos);
    };

    const deleteItem = (id: number) => {
        const question = window.confirm("本当に削除してもよろしいですか？");
        if (!question) {
            return;
        }
        let newItems = todos.filter((item: any) => item.id !== id);
        setTodos(newItems);
    };

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
                                        <span className="title">
                                            {item.completed ? (
                                                <s>{item.title}</s>
                                            ) : (
                                                item.title
                                            )}
                                        </span>
                                        <button
                                            className="delete"
                                            onClick={() => {
                                                deleteItem(item.id);
                                            }}
                                        >
                                            x
                                        </button>
                                        <span className="editBtnZone"></span>
                                        <button className="edit">編集</button>
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
                    <span id="non-complete">未完了: 0</span>
                    <br />
                    <span id="completed">完了済み: 0</span>
                </footer>
            </div>
            ;
        </div>
    );
}

export default App;
