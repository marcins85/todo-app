"use client"

import { useState, useEffect } from "react";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import Todo from "@/models/todo";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }, []);

    const handleAddToDo = async (text: string) => {
        const res = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const newTodo: Todo = await res.json();

        setTodos((prev) => [newTodo, ...prev]);
    }

    const handleToggle = async (id: number) => {
        const res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
        });

        const updateTodo: Todo = await res.json();

        setTodos((prev) => 
            prev.map((todo) => 
                todo.id === id ? updateTodo : todo
            )
        );
    }

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
        });

        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return (
        <main className="max-w-xl mx-auto p-6 space-y-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Lista zadań</h1>
            <button 
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
                Przełącz motyw
            </button>

            <TodoForm onAddTodo={handleAddToDo} />
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onToggle={() => handleToggle(todo.id)}
                        onDelete={() => handleDelete(todo.id)}
                    />
                ))}
            </ul>
        </main>
    );
}
