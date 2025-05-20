import { randomUUID } from 'node:crypto';

import { Request, Response } from 'express';
import {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from '../services/todo.service';
import { BackendError } from '../utils/errors';
import { createHandler } from '../utils/handler';
import { todoCreateSchema, todoUpdateSchema } from '../utils/validator';

import { logger } from '../utils/logger';

export const handleCreateTodo = createHandler(
  todoCreateSchema,
  async (req: Request, res: Response) => {
    try {
      const { title, description, priority } = todoCreateSchema.parse(req.body);
      const todo = await createTodo({
        id: randomUUID(),
        title,
        description: description || '',
        priority,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      logger.info(`Todo created: ${todo.id}`);
      res.status(201).json({
        message: 'Todo created successfully',
        todo,
      });
    } catch (error) {
      throw new BackendError('BAD_REQUEST', error as Error);
    }
  },
);

export const handleGetTodos = createHandler(
  async (req: Request, res: Response) => {
    const todos = await getTodos();
    res.status(200).json(todos);
  },
);

export const handleGetTodoById = createHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await getTodoById(id);
    if (!todo) {
      throw new BackendError('NOT_FOUND', { message: 'Todo not found' });
    }
    res.status(200).json({
      message: 'Todo found successfully',
      todo,
    });
  },
);

export const handleUpdateTodo = createHandler(
  todoUpdateSchema,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingTodo = await getTodoById(id);

      if (!existingTodo) {
        throw new BackendError('NOT_FOUND', { message: 'Todo not found' });
      }
      
      const updateData = todoUpdateSchema.parse(req.body);
      const todo = await updateTodo(id, updateData);
      
      res.status(200).json({
        message: 'Todo updated successfully',
        todo,
      });
    } catch (error) {
      throw new BackendError('BAD_REQUEST', error as Error);
    }
  },
);

export const handleDeleteTodo = createHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await getTodoById(id);

      if (!todo) {
        throw new BackendError('NOT_FOUND', { message: 'Todo not found' });
      }

      await deleteTodo(id);
      res.status(204).json({
        message: 'Todo deleted successfully',
      });
    } catch (error) {
      throw new BackendError('BAD_REQUEST', error as Error);
    }
  },
);

export const handleCompleteTodo = createHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await getTodoById(id);
      if (!todo) {
        throw new BackendError('NOT_FOUND', { message: 'Todo not found' });
      }
      await completeTodo(id);
      res.status(204).json({
        message: 'Todo completed successfully',
      });
    } catch (error) {
      throw new BackendError('BAD_REQUEST', error as Error);
    }
  },
);
