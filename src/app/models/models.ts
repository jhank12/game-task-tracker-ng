export interface Task {
  id: string;
  taskName: string;
  priority: string;
}

export interface Column {
  id: string;
  colName: string;
  tasks?: Task[];

  PLACEHOLDERCOUNT?: number;
}

export interface ProjectBoard {
  id: string;
  name: string;
  columnsArr?: Column[];
}
