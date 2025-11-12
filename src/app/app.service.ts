import { Injectable, signal, computed } from '@angular/core';

import { Immer, produce, WritableDraft } from 'immer';

import { BehaviorSubject, pipe, first, Observable } from 'rxjs';

import { v4 as uuid } from 'uuid';

// interfaces

import { ProjectBoard, Column, Task } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _isLoaded = new BehaviorSubject<boolean | null>(null);

  get isLoaded$(): Observable<boolean | null> {
    return this._isLoaded.asObservable()
  }

  constructor() {
    this.loadBoards();
  }

  projectBoards = signal<ProjectBoard[]>([]);

  loadBoards() {
    const data = localStorage.getItem('projects');

    if (data) {
      this.projectBoards.set(JSON.parse(data));

      this._isLoaded.next(true);
    }
  }

  checkDataLoaded(): Observable<boolean | null> {
    return this.isLoaded$.pipe(
      first(value => value !== null)
    )
  }

  clearStorage() {
    localStorage.clear();
  }

  selectedId = signal<string>('');

  selectedProjectBoard = computed(() => {
    return this.projectBoards()?.filter((board) => {
      return board.id == String(this.selectedId());
    })[0];
  });

  deleteColumn(colId: string) {
    const updatedBoards = produce(this.projectBoards(), (draft) => {
      const board = this.immerGetBoard(draft, this.selectedId());

      const filteredColumns: Column[] = board.columnsArr?.filter((col) => {
        return col.id !== colId;
      })!;

      board.columnsArr = filteredColumns;
    });

    localStorage.setItem('projects', JSON.stringify(updatedBoards));
    this.projectBoards.set(updatedBoards);
  }

  immerGetBoard(draft: WritableDraft<ProjectBoard>[], boardId: string) {
    const boardIdx: number = draft.findIndex(
      (board) => board.id === boardId
    );

    const currentBoard: ProjectBoard = draft[boardIdx];

    return currentBoard;
  }

  clearColumns() {
    const updated = produce(this.projectBoards(), (draft) => {
      const board = this.immerGetBoard(draft, this.selectedId());

      board.columnsArr = [];
    });

    localStorage.setItem('projects', JSON.stringify(updated));

    this.projectBoards.set(updated);
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
    const boardIdx: number = this.projectBoards().findIndex(
      (board) => board.id == updatedBoard.id
    );

    const boardsCopy: ProjectBoard[] = [...this.projectBoards()];

    boardsCopy[boardIdx] = updatedBoard;

    localStorage.setItem('projects', JSON.stringify([...boardsCopy]));
    this.projectBoards.set([...boardsCopy]);
  }

  deleteBoard(boardId: string) {
    const filteredBoards = this.projectBoards().filter(
      (board) => board.id !== boardId
    );

    localStorage.setItem('projects', JSON.stringify(filteredBoards));
    this.projectBoards.set(filteredBoards);
    this.loadBoards()
  }

  // returns copy of board
  getBoard(): ProjectBoard {
    const boardsCopy = [...this.projectBoards()];

    return boardsCopy.filter((board) => board.id == this.selectedId())[0];
  }

  addColumn(newColumn: Column) {
    const updated = produce(this.projectBoards(), (draft) => {
      const boardIdx: number = draft.findIndex(
        (board) => board.id == this.selectedId()
      );
      const board = draft[boardIdx];

      board.columnsArr?.push(newColumn);

    });

    localStorage.setItem('projects', JSON.stringify(updated));
    this.projectBoards.set(updated);

  }

  editColumn(updatedColumn: Column) {
    const updatedBoards = produce(this.projectBoards(), (draft) => {
      const boardIdx: number = draft.findIndex(
        (board) => board.id == this.selectedId()
      );
      const boardColumns: Column[] = draft[boardIdx].columnsArr!;

      if (!boardColumns) return;
      const colIdx: number = boardColumns?.findIndex(
        (col) => col.id == updatedColumn.id
      );
      boardColumns[colIdx] = updatedColumn;
    });

    localStorage.setItem('projects', JSON.stringify(updatedBoards));
    this.projectBoards.set(updatedBoards);
  }

  addTask(newTask: Task, colId: string) {
    const updated = produce(this.projectBoards(), (draft) => {
      const board = this.immerGetBoard(draft, this.selectedId());

      const column: Column = board.columnsArr?.filter(
        (col: Column) => {
          return colId === col.id;
        }
      )[0]!;

      if (!column.tasks) return;
      column.tasks.push(newTask);
    });

    localStorage.setItem('projects', JSON.stringify(updated));
    this.projectBoards.set(updated);
  }

  editTask(updatedTask: Task, colId: string, taskIdx: number) {
    const updated = produce(this.projectBoards(), (draft) => {
      const boardIdx: number = draft.findIndex(
        (board) => board.id == this.selectedId()
      );

      const board = this.immerGetBoard(draft, this.selectedId());

      const column: Column = board.columnsArr?.filter(
        (col: Column) => {
          return colId === col.id;
        }
      )[0]!;

      if (!column.tasks) return;

      if (updatedTask.colId !== colId) {
        column.tasks[taskIdx] = updatedTask;

        this.moveTask(colId, updatedTask.colId, updatedTask)
      } else {

        column.tasks[taskIdx] = updatedTask;
      }

    });

    localStorage.setItem('projects', JSON.stringify(updated));
    this.projectBoards.set(updated);
  }

  deleteTask(colId: string, taskId: string) {
    const updated = produce(this.projectBoards(), (draft) => {

      const board = this.immerGetBoard(draft, this.selectedId());

      const column: Column = board.columnsArr?.filter((col: Column) => {
        return colId === col.id;
      })[0]!;

      const filteredTasks: Task[] = column.tasks?.filter((task) => {
        return taskId !== task.id;
      })!;

      column.tasks = filteredTasks;
    });

    localStorage.setItem('projects', JSON.stringify(updated));
    this.projectBoards.set(updated);
  }


  moveTask(colId: string, newColId: string, task: Task) {

    const updated = produce(this.projectBoards(), (draft) => {

      const board = this.immerGetBoard(draft, this.selectedId());

      const currentColumn: Column = board.columnsArr?.filter((col: Column) => {
        return colId === col.id;
      })[0]!;

      const filteredTasks: Task[] = currentColumn.tasks?.filter((task) => {
        return task.id !== task.id;
      })!;

      currentColumn.tasks = filteredTasks;

      const newColumn: Column = board.columnsArr?.filter((col: Column) => {
        return newColId === col.id;
      })[0]!;

      // const updatedTask: Task = { ...task, colId: newColId }

      // task in param is already updated task
      newColumn.tasks?.push(task)


    });

    localStorage.setItem('projects', JSON.stringify(updated));
    this.projectBoards.set(updated);


  }

  setSelectedId(boardId: string) {
    this.selectedId.set(boardId);
  }
}
