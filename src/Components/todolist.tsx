import React, { memo } from "react";
export const TodoList = memo(
    ({
        todos,
        handleComplete,
        handleEditChange,
        deleteItem,
        editItem,
    }: any) => {
        console.log("Todolist");
        return (
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
                                        checked={item.completed}
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
        );
    }
);
