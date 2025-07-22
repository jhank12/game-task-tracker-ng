import { Component, inject } from '@angular/core';

import { AppService } from '../../app.service';

import { NgClass } from '@angular/common';

import { AddBoardDialogComponent } from '../add-board-dialog/add-board-dialog.component';

import { MatDialog } from '@angular/material/dialog';

import { Column, ProjectBoard } from '../../models/models';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, AddBoardDialogComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) {}

  get projectBoards() {
    return this.appService.projectBoards;
  }

  openAddBoardModal() {
    this._matDialog.open(AddBoardDialogComponent, {
      panelClass: 'dialogContainer',
      width: '1000px',
    });
  }

  closeAddBoardModal() {
    this._matDialog.closeAll();
  }

  tasksCount(boardId: string): number {
    const board: ProjectBoard = this.projectBoards().filter((board) => {
      return boardId == board.id;
    })[0];

    const columnsArr: Column[] = board.columnsArr!;

    let sum = 0;

    columnsArr.forEach((col) => {
      if (col.tasks !== undefined) {
        sum += col.tasks.length;
      }
    });

    return sum;
  }
}
