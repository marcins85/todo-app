"use client"

type Props = {
    text: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TodoItem(props: Props) {
    return (
        <li className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200">
            <span className={`flex-1 ${props.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {props.text}
            </span>
            <div className="flex gap-2">
                <button
                onClick={props.onToggle}
                className="text-sm px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                Zmień
                </button>
                <button
                onClick={props.onDelete}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                Usuń
                </button>
            </div>
        </li>
    );
}