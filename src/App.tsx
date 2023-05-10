import React from "react";
import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="todoapp">
                <form id="js-form">
                    <input
                        id="js-form-input"
                        className="new-todo"
                        type="text"
                        placeholder="What need to be done?"
                        autoComplete="off"
                    />
                </form>
                <div id="keep-btn">保存</div>
                <div id="js-todo-list" className="todo-list"></div>
                <footer className="footer">
                    <span id="js-todo-count">Todoアイテム数: 0</span>
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
