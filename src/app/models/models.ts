export interface Task {
  id: string;
  taskName: string;
  priority: string;
  date: Date | null;
  isComplete: boolean;

  colId: string;
}

export interface Column {
  id: string;
  colName: string;
  tasks?: Task[];
}

export interface ProjectBoard {
  id: string;
  name: string;
  columnsArr?: Column[];

  date: Date;
}
