import { Router } from 'express';
import {
  handleCreateTodo,
  handleGetTodos,
  handleGetTodoById,
  handleUpdateTodo,
  handleDeleteTodo,
  handleCompleteTodo,
} from '../../controllers/todo.controller';

export default (router: Router) => {
  /**
   * @openapi
   * components:
   *   schemas:
   *     Todo:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *         description:
   *           type: string
   * /todos:
   *   post:
   *     summary: Create a new todo
   *     tags:
   *       - todos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Todo'
   *     responses:
   *       '201':
   *         description: Todo created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   */
  router.post('/todos', handleCreateTodo);

  /**
   * @openapi
   * /todos:
   *   get:
   *     summary: Get all todos
   *     tags:
   *       - todos
   *     responses:
   *       '200':
   *         description: Todos retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Todo'
   */
  router.get('/todos', handleGetTodos);

  /**
   * @openapi
   * /todos/{id}:
   *   get:
   *     summary: Get a todo by ID
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the todo to retrieve
   *     responses:
   *       '200':
   *         description: Todo retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   *       '404':
   *         description: Todo not found
   */
  router.get('/todos/:id', handleGetTodoById);

  /**
   * @openapi
   * /todos/{id}:
   *   put:
   *     summary: Update a todo by ID
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the todo to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Todo'
   *     responses:
   *       '200':
   *         description: Todo updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   *       '404':
   *         description: Todo not found
   */
  router.put('/todos/:id', handleUpdateTodo);

  /**
   * @openapi
   * /todos/{id}:
   *   delete:
   *     summary: Delete a todo by ID
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the todo to delete
   *     responses:
   *       '204':
   *         description: Todo deleted successfully
   *       '404':
   *         description: Todo not found
   */
  router.delete('/todos/:id', handleDeleteTodo);

  /**
   * @openapi
   * /todos/{id}/complete:
   *   put:
   *     summary: Complete a todo by ID
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the todo to complete
   *     responses:
   *       '204':
   *         description: Todo completed successfully
   *       '404':
   *         description: Todo not found
   */
  router.put('/todos/:id/complete', handleCompleteTodo);
};
