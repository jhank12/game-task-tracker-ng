import { Injectable, signal, computed } from '@angular/core';

import { v4 as uuid } from 'uuid';

// interfaces

import { ProjectBoard, Column, Task } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  projectBoards = signal<ProjectBoard[]>([
    {
      id: '1',
      name: 'board1',
      columnsArr: [
        {
          id: uuid(),
          colName: 'Art',
          PLACEHOLDERCOUNT: 5,
          tasks: [
            { id: uuid(), taskName: 'Health Bar UI', priority: 'High' },
            { id: uuid(), taskName: 'Enemy UI', priority: 'Medium' },
            { id: uuid(), taskName: 'Health Bar UI', priority: 'Low' },
          ],
        },
        { id: uuid(), colName: 'Programming', PLACEHOLDERCOUNT: 3, tasks: [] },
      ],
    },
    {
      id: '2',
      name: 'board2',
      columnsArr: [
        {
          id: uuid(),
          colName: 'UI',
          PLACEHOLDERCOUNT: 5,
          tasks: [{ id: uuid(), taskName: 'Player UI', priority: 'High' }],
        },
        { id: uuid(), colName: 'Design', PLACEHOLDERCOUNT: 3, tasks: [] },
      ],
    },
  ]);

  selectedId = signal<string>(this.projectBoards()[0]?.id);

  addBoard(newBoard: ProjectBoard) {
    if (this.projectBoards().length > 0) {
      this.projectBoards.update((boards) => {
        return [...boards, newBoard];
      });
    } else {
      this.projectBoards.set([newBoard]);

      this.selectedId.set(newBoard.id);
    }
  }

  editBoard(updatedBoard: ProjectBoard) {
    // get idx of current board
    // update at that index

    const boardIdx: number = this.projectBoards().findIndex(
      (board) => board.id == updatedBoard.id
    );

    const boardsCopy: ProjectBoard[] = [...this.projectBoards()];

    boardsCopy[boardIdx] = updatedBoard;

    this.projectBoards.set([...boardsCopy]);
  }

  addColumn(newColumn: Column) {
    const prevCols: Column[] | undefined =
      this.selectedProjectBoard().columnsArr;

    if (prevCols !== undefined && prevCols.length > 0) {
      this.selectedProjectBoard().columnsArr = [...prevCols, newColumn];
    } else {
      this.selectedProjectBoard().columnsArr = [newColumn];
    }
  }

  addTask(newTask: Task, colId: string) {
    const column: Column = this.selectedProjectBoard().columnsArr?.filter(
      (col: Column) => {
        return colId === col.id;
      }
    )[0]!;

    if (column.tasks !== undefined) {
      column.tasks = [...column.tasks, newTask];
    }
  }

  editTask(updatedTask: Task, colId: string, taskIdx: number) {
    const column: Column = this.selectedProjectBoard().columnsArr?.filter(
      (col: Column) => {
        return colId === col.id;
      }
    )[0]!;

    if (column.tasks !== undefined) {
      column.tasks[taskIdx] = updatedTask;
    }
  }

  deleteTask(colId: string, taskId: string) {
    const column: Column = this.selectedProjectBoard().columnsArr?.filter(
      (col: Column) => {
        return colId === col.id;
      }
    )[0]!;

    const filteredTasks: Task[] =
      column.tasks?.filter((task) => {
        return taskId !== task.id;
      }) || [];

    column.tasks = filteredTasks;
  }

  setSelectedId(boardId: string) {
    console.log(boardId);
    this.selectedId.set(boardId);
  }

  selectedProjectBoard = computed(() => {
    return this.projectBoards()?.filter((board) => {
      return board.id == String(this.selectedId());
    })[0];
  });
}
