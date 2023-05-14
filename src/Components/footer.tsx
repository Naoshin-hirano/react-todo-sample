import React, { memo } from "react";
import { Todo } from "../App";

interface FooterModel {
    todos: Todo[];
    getCheckedCount: () => number;
}

export const Footer = memo(({ todos, getCheckedCount }: FooterModel) => {
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
