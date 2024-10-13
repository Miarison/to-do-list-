export interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    priority: 'haute' | 'moyenne' | 'basse';
  }