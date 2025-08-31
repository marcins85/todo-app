"use client"
import { useState } from "react";

type Props = {
    onAddTodo: (text: string) => void;
}

export default function TodoForm ({onAddTodo}: Props) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            onAddTodo(input.trim());
            setInput('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Wpisz zadanie"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit"className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
                Dodaj
            </button>
        </form>
    );
}