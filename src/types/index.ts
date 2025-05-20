export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoCreate = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type TodoUpdate = Partial<TodoCreate>;
