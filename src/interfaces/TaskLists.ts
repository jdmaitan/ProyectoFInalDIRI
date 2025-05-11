import { Task } from './Task';

export interface TaskList {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}