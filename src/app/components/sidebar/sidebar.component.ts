import { Component, inject } from '@angular/core';

import { AppService } from '../../app.service';

import { NgClass } from '@angular/common';

import { Column, ProjectBoard } from '../../models/models';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  appService = inject(AppService);

  get projectBoards() {
    return this.appService.projectBoards;
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
