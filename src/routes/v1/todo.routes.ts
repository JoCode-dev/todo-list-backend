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
   *       required:
   *         - id
   *         - title
   *       properties:
   *         id:
   *           type: string
   *           format: uuid
   *           description: Identifiant unique du todo
   *         title:
   *           type: string
   *           description: Titre de la tâche
   *         description:
   *           type: string
   *           description: Description détaillée de la tâche
   *         priority:
   *           type: integer
   *           enum: [1, 2, 3]
   *           description: Priorité de la tâche (1=basse, 2=moyenne, 3=haute)
   *           default: 2
   *         completed:
   *           type: boolean
   *           description: Indique si la tâche est terminée
   *           default: false
   *         createdAt:
   *           type: string
   *           format: date-time
   *           description: Date de création de la tâche
   *         updatedAt:
   *           type: string
   *           format: date-time
   *           description: Date de dernière modification de la tâche
   *     TodoCreate:
   *       type: object
   *       required:
   *         - title
   *       properties:
   *         title:
   *           type: string
   *           description: Titre de la tâche
   *         description:
   *           type: string
   *           description: Description détaillée de la tâche
   *         priority:
   *           type: integer
   *           enum: [1, 2, 3]
   *           description: Priorité de la tâche (1=basse, 2=moyenne, 3=haute)
   *           default: 2
   *     TodoUpdate:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *           description: Titre de la tâche
   *         description:
   *           type: string
   *           description: Description détaillée de la tâche
   *         priority:
   *           type: integer
   *           enum: [1, 2, 3]
   *           description: Priorité de la tâche (1=basse, 2=moyenne, 3=haute)
   *         completed:
   *           type: boolean
   *           description: Indique si la tâche est terminée
   *     ErrorResponse:
   *       type: object
   *       properties:
   *         code:
   *           type: string
   *           description: Code d'erreur
   *         message:
   *           type: string
   *           description: Message d'erreur
   *         details:
   *           type: object
   *           description: Détails supplémentaires sur l'erreur
   * /todos:
   *   post:
   *     summary: Créer une nouvelle tâche
   *     tags:
   *       - todos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TodoCreate'
   *           example:
   *             title: "Acheter du lait"
   *             description: "Acheter du lait au supermarché"
   *             priority: 2
   *     responses:
   *       '201':
   *         description: Tâche créée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Todo created successfully
   *                 todo:
   *                   $ref: '#/components/schemas/Todo'
   *       '400':
   *         description: Données invalides
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.post('/todos', handleCreateTodo);

  /**
   * @openapi
   * /todos:
   *   get:
   *     summary: Récupérer toutes les tâches
   *     tags:
   *       - todos
   *     responses:
   *       '200':
   *         description: Liste des tâches récupérée avec succès
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
   *     summary: Récupérer une tâche par son ID
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID de la tâche à récupérer
   *     responses:
   *       '200':
   *         description: Tâche récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Todo found successfully
   *                 todo:
   *                   $ref: '#/components/schemas/Todo'
   *       '404':
   *         description: Tâche non trouvée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/todos/:id', handleGetTodoById);

  /**
   * @openapi
   * /todos/{id}:
   *   put:
   *     summary: Mettre à jour une tâche
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID de la tâche à mettre à jour
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TodoUpdate'
   *           example:
   *             title: "Acheter du lait et des œufs"
   *             description: "Ne pas oublier les œufs bio"
   *             priority: 3
   *             completed: false
   *     responses:
   *       '200':
   *         description: Tâche mise à jour avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Todo updated successfully
   *                 todo:
   *                   $ref: '#/components/schemas/Todo'
   *       '404':
   *         description: Tâche non trouvée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       '400':
   *         description: Données invalides
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.put('/todos/:id', handleUpdateTodo);

  /**
   * @openapi
   * /todos/{id}:
   *   delete:
   *     summary: Supprimer une tâche
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID de la tâche à supprimer
   *     responses:
   *       '204':
   *         description: Tâche supprimée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Todo deleted successfully
   *       '404':
   *         description: Tâche non trouvée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.delete('/todos/:id', handleDeleteTodo);

  /**
   * @openapi
   * /todos/{id}/complete:
   *   put:
   *     summary: Marquer une tâche comme terminée
   *     tags:
   *       - todos
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID de la tâche à marquer comme terminée
   *     responses:
   *       '204':
   *         description: Tâche terminée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Todo completed successfully
   *       '404':
   *         description: Tâche non trouvée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.put('/todos/:id/complete', handleCompleteTodo);
};
