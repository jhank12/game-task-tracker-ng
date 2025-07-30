import { Injectable, signal, computed } from '@angular/core';

import { v4 as uuid } from 'uuid';

// interfaces

import { ProjectBoard, Column, Task } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {
    this.loadBoards();
  }

  projectBoards = signal<ProjectBoard[]>([]);

  loadBoards() {
    const data = localStorage.getItem('projects');

    if (data) {
      this.projectBoards.set(JSON.parse(data));
    }
  }

  clearStorage() {
    localStorage.clear();
  }

  selectedId = signal<string>(this.projectBoards()[0]?.id);

  selectedProjectBoard = computed(() => {
    return this.projectBoards()?.filter((board) => {
      return board.id == String(this.selectedId());
    })[0];
  });

  deleteColumn(colId: string) {
    const projectBoardsCopy: ProjectBoard[] = [...this.projectBoards()];

    const boardIdx: number = projectBoardsCopy.findIndex(
      (board) => board.id === this.selectedId()
    );

    const currentBoard: ProjectBoard = projectBoardsCopy[boardIdx];

    const filteredColumns: Column[] = currentBoard.columnsArr?.filter((col) => {
      return col.id !== colId;
    })!;

    currentBoard.columnsArr = filteredColumns;

    localStorage.setItem('projects', JSON.stringify(projectBoardsCopy));
    this.projectBoards.set(projectBoardsCopy);
  }

  addBoard(newBoard: ProjectBoard) {
    if (this.projectBoards().length > 0) {
      localStorage.setItem(
        'projects',
        JSON.stringify([newBoard, ...this.projectBoards()])
      );
      this.projectBoards.update((boards) => {
        return [newBoard, ...boards];
      });
    } else {
      localStorage.setItem('projects', JSON.stringify([newBoard]));
      this.projectBoards.set([newBoard]);
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

    localStorage.setItem('projects', JSON.stringify([...boardsCopy]));
    this.projectBoards.set([...boardsCopy]);
  }

  addColumn(newColumn: Column) {
    const prevCols: Column[] | undefined =
      this.selectedProjectBoard().columnsArr;

    if (prevCols !== undefined && prevCols.length > 0) {
      this.selectedProjectBoard().columnsArr = [...prevCols, newColumn];

      localStorage.setItem(
        'projects',
        JSON.stringify([...this.projectBoards()])
      );
    } else {
      this.selectedProjectBoard().columnsArr = [newColumn];
      localStorage.setItem(
        'projects',
        JSON.stringify([...this.projectBoards()])
      );
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

      localStorage.setItem(
        'projects',
        JSON.stringify([...this.projectBoards()])
      );
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

      localStorage.setItem(
        'projects',
        JSON.stringify([...this.projectBoards()])
      );
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

    localStorage.setItem('projects', JSON.stringify([...this.projectBoards()]));
  }

  setSelectedId(boardId: string) {
    console.log(boardId);
    this.selectedId.set(boardId);
  }
}
