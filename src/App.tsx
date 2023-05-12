import React, { useState, useCallback } from "react";
import "./App.css";
import { Footer } from "./Components/footer";
import { TextField } from "./Components/textField";
import { TodoList } from "./Components/todolist";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<any>([]);
    const [count, setCount] = useState(1);

    console.log("App");

    // テキストフィールドの入力
    const handleChange = useCallback(
        (e: any) => {
            setText(e.target.value);
        },
        [text]
    );

    // Todoの投稿
    const onSubmit = useCallback(
        (e: any) => {
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
        },
        [text]
    );

    // Todoの削除
    const deleteItem = useCallback(
        (id: number) => {
            const question = window.confirm("本当に削除してもよろしいですか？");
            if (!question) {
                return;
            }
            let newItems = todos.filter((item: any) => item.id !== id);
            setTodos(newItems);
        },
        [todos]
    );

    // Todoの編集
    const editItem = useCallback(
        (id: any) => {
            const newTodos = todos.map((item: any) => {
                const newItem = { ...item };
                if (newItem.id == id) {
                    newItem.editMode = !newItem.editMode;
                }
                return newItem;
            });
            setTodos(newTodos);
        },
        [todos]
    );

    // Todoの完了チェック
    const handleComplete = useCallback(
        (e: any) => {
            const newTodos = todos.map((item: any) => {
                const newItem = { ...item };
                // todo: 型を合わせたら===にする
                if (newItem.id == e.target.value) {
                    newItem.completed = !newItem.completed;
                }
                return newItem;
            });
            setTodos(newTodos);
        },
        [todos]
    );

    // Todoのタイトルを編集モードへ
    const handleEditChange = useCallback(
        (e: any) => {
            const newTodos = todos.map((item: any) => {
                const newItem = { ...item };
                if (newItem.id == e.target.id) {
                    newItem.title = e.target.value;
                }
                return newItem;
            });
            setTodos(newTodos);
        },
        [todos]
    );

    // 完了フラグの数
    const getCheckedCount = useCallback(() => {
        let count = 0;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                count++;
            }
        }
        return count;
    }, [todos]);

    return (
        <div className="App">
            <div className="todoapp">
                <TextField
                    onSubmit={onSubmit}
                    text={text}
                    handleChange={handleChange}
                />
                <TodoList
                    todos={todos}
                    handleComplete={handleComplete}
                    handleEditChange={handleEditChange}
                    deleteItem={deleteItem}
                    editItem={editItem}
                />
                <Footer todos={todos} getCheckedCount={getCheckedCount} />
            </div>
        </div>
    );
}

export default App;
