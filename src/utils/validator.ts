import { z } from 'zod';
import { Priority } from '../types';

export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  priority: z.number().min(1).max(3).optional().default(Priority.MEDIUM),
  completed: z.boolean().optional().default(false),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export const todoCreateSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const todoUpdateSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
