import React from "react";

export const Footer = ({ todos, getCheckedCount }: any) => {
    return (
        <footer className="footer">
            <span id="js-todo-count">Todoアイテム数: {todos.length}</span>
            <br />
            <span id="non-complete">
                未完了: {todos.length - getCheckedCount()}
            </span>
            <br />
            <span id="completed">完了済み: {getCheckedCount()}</span>
        </footer>
    );
};
