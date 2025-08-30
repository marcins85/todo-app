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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit"className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Dodaj
            </button>
        </form>
    );
}