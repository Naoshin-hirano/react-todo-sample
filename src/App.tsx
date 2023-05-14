import React, { useState, useCallback } from "react";
import "./App.css";
import { Footer } from "./Components/footer";
import { TextField } from "./Components/textField";
import { TodoList } from "./Components/todolist";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editMode: boolean;
}
export type HandleTodo = (id: number) => void;
export type HandleChangeModel = (
    e: React.ChangeEvent<HTMLInputElement>
) => void;

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [count, setCount] = useState(1);

    console.log("App");

    // テキストフィールドの入力
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
        },
        []
    );

    // Todoの投稿
    const onSubmit = useCallback(
        (
            e:
                | React.MouseEvent<HTMLDivElement, MouseEvent>
                | React.FormEvent<HTMLFormElement>
        ) => {
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
        // countとtodosを依存配列に入れるとonSubmitをpropsとして受け取るtextFildコンポーネントも再描画走るのでwarning出ないようにする
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [text]
    );

    // Todoの削除
    const deleteItem = useCallback(
        (id: number) => {
            const question = window.confirm("本当に削除してもよろしいですか？");
            if (!question) {
                return;
            }
            let newItems = todos.filter((item: Todo) => item.id !== id);
            setTodos(newItems);
        },
        [todos]
    );

    // Todoの編集
    const editItem = useCallback(
        (id: number) => {
            const newTodos = todos.map((item: Todo) => {
                const newItem = { ...item };
                if (newItem.id === id) {
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
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newTodos = todos.map((item: Todo) => {
                const newItem = { ...item };
                if (newItem.id === Number(e.target.value)) {
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
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newTodos = todos.map((item: Todo) => {
                const newItem = { ...item };
                if (newItem.id === Number(e.target.id)) {
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
