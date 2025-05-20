import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { Todo } from '../types';

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the JSON file
const dbDir = path.resolve(__dirname, '../db');
const todosPath = path.resolve(dbDir, 'todos.json');

// Ensure the directory and file exist
const ensureDbExists = async () => {
  await fs.ensureDir(dbDir);
  if (!(await fs.pathExists(todosPath))) {
    await fs.writeJson(todosPath, []);
  }
};

export const createTodo = async (todo: Todo) => {
  await ensureDbExists();
  const todos = await fs.readJson(todosPath);
  todos.push(todo);
  await fs.writeJson(todosPath, todos, { spaces: 2 });
  return todo;
};

export const getTodos = async () => {
  await ensureDbExists();
  return await fs.readJson(todosPath);
};

export const getTodoById = async (id: string) => {
  await ensureDbExists();
  const todos = await fs.readJson(todosPath);
  return todos.find((todo: Todo) => todo.id === id);
};

export const updateTodo = async (id: string, todoToUpdate: Partial<Todo>) => {
  await ensureDbExists();
  const todos = await fs.readJson(todosPath);
  const index = todos.findIndex((todo: Todo) => todo.id === id);
  if (index === -1) {
    throw new Error(`Todo with id ${id} not found`);
  }
  todos[index] = { ...todos[index], ...todoToUpdate, updatedAt: new Date() };
  await fs.writeJson(todosPath, todos, { spaces: 2 });
  return todos[index];
};

export const deleteTodo = async (id: string) => {
  await ensureDbExists();
  const todos = await fs.readJson(todosPath);
  const index = todos.findIndex((todo: Todo) => todo.id === id);
  if (index === -1) {
    throw new Error(`Todo with id ${id} not found`);
  }
  const deletedTodo = todos[index];
  todos.splice(index, 1);
  await fs.writeJson(todosPath, todos, { spaces: 2 });
  return deletedTodo;
};

export const completeTodo = async (id: string) => {
  await ensureDbExists();
  const todos = await fs.readJson(todosPath);
  const index = todos.findIndex((todo: Todo) => todo.id === id);
  if (index === -1) {
    throw new Error(`Todo with id ${id} not found`);
  }
  todos[index].completed = true;
  todos[index].updatedAt = new Date();
  await fs.writeJson(todosPath, todos, { spaces: 2 });
  return todos[index];
};
