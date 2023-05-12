import React, { memo } from "react";
export const Footer = memo(({ todos, getCheckedCount }: any) => {
    console.log("Footer");
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
});
