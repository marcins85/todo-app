"use client"

type Props = {
    text: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TodoItem(props: Props) {
    return (
        <li className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <span className={`flex-1 ${props.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                {props.text}
            </span>
            <div className="flex gap-2">
                <button
                onClick={props.onToggle}
                className="text-sm px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 transition"
                >
                Zmień
                </button>
                <button
                onClick={props.onDelete}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300 transition"
                >
                Usuń
                </button>
            </div>
        </li>
    );
}