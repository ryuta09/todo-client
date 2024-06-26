import React, { useState } from "react";
import { TodoType } from "../types";

import { Input } from "postcss";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";
type TodoProps = {
  todo: TodoType;
};
const Todo = ({ todo }: TodoProps) => {
  const [isEdting, setIsEdting] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, isLoading, error, mutate } = useTodos();
  const handleEdit = async () => {
    setIsEdting(!isEdting);
    if (isEdting) {
      const response = await fetch(
        `${API_URL}/editTodo/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
          }),
        }
      );

      if (response.ok) {
        const editedTodo = await response.json();
        const updatedeTodos = todos.map((todo: TodoType) => todo.id === editedTodo.id ? editedTodo : todo)
        mutate(updatedeTodos);
      }
    }
  };
  const handleDelete = async (id: number) => {
    const response = await fetch(
      `${API_URL}/deleteTodo/${todo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const deletedTodo = await response.json();
      const updatedTodos = todos.filter((todo: TodoType) => todo.id !== id )
      mutate(updatedTodos);
    }
  };

  const toggleTodoCompoletion = async(id: number, isCompleted: boolean) => {
    const response = await fetch(
      `${API_URL}/editTodo/${todo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: !isCompleted,
        }),
      }
    );

    if (response.ok) {
      const editedTodo = await response.json();
      const updatedeTodos = todos.map((todo: TodoType) => todo.id === editedTodo.id ? editedTodo : todo)
      mutate(updatedeTodos);
    }
  }
  return (
    <>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
                  border-gray-300 rounded"
              onChange={() => toggleTodoCompoletion(todo.id, todo.isCompleted)}
            />
            <label className="ml-3 block text-gray-900">
              {isEdting ? (
                <input
                  type="text"
                  className="border rounded py-1 px-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span className={`text-lg font-medium mr-2 ${todo.isCompleted ? "line-through" : "" }`}> {todo.title} </span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            >
              {isEdting ? "save" : "✒"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            >
              ✖
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Todo;
