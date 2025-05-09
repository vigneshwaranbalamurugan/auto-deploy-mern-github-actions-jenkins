import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, Check, Circle, Sparkles } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const api = "http://localhost:5000";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/api/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${api}/api/todos`, { title });
      setTodos([...todos, res.data]);
      setTitle('');
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${api}/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${api}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const buttonBg = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}  transition-colors duration-300 py-8`}>
      <div className="max-w-lg mx-auto mt-20 px-4">
        <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-indigo-400" size={24} />
              <h1 className="text-2xl font-bold">Quantum Tasks</h1>
            </div>
            <button 
              onClick={toggleTheme} 
              className="rounded-full p-2 bg-opacity-20 bg-gray-600 hover:bg-opacity-30 transition-all"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="p-6">
            <div className="flex mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className={`flex-grow py-3 px-4 rounded-l-lg focus:outline-none ${inputBg} text-${theme === 'dark' ? 'white' : 'gray-800'}`}
              />
              <button 
                onClick={addTodo}
                disabled={!title.trim() || loading}
                className={`${buttonBg} text-white py-3 px-4 rounded-r-lg transition-colors duration-200 flex items-center justify-center`}
              >
                <PlusCircle size={20} />
              </button>
            </div>

            {loading && todos.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-indigo-400">Loading tasks...</div>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li 
                    key={todo._id} 
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${cardBg === 'bg-gray-800' ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md`}
                  >
                    <div className="flex items-center space-x-3 flex-grow">
                      <button 
                        onClick={() => toggleComplete(todo._id, todo.completed)}
                        className={`rounded-full transition-colors ${todo.completed ? 'text-green-500' : 'text-gray-400'} hover:text-indigo-400`}
                      >
                        {todo.completed ? <Check size={20} /> : <Circle size={20} />}
                      </button>
                      <span 
                        className={`${todo.completed ? 'line-through text-gray-500' : ''} transition-all`}
                      >
                        {todo.title}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteTodo(todo._id)}
                      className="p-1 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 bg-opacity-30 bg-gray-700 text-center text-sm text-gray-400">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} • {todos.filter(t => t.completed).length} completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;