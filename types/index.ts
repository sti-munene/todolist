export type Todo = {
  id: string;
  title: string;
  notes?: string | null;
  createdAt: number;
  dueDate?: number | null;
  complete: boolean;
};

export type TodoClient = {
  id: string;
  title: string;
  notes?: string | null;
  dueDate?: Date | number | null;
  createdAt: Date | number;
  complete: boolean;
};

export type User = {
  id?: string;
  name: string;
  email: number;
};
