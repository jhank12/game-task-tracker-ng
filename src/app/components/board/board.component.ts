import { Component, input, inject, signal } from '@angular/core';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';
import { AppService } from '../../app.service';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';
import { ColumnsComponent } from '../columns/columns.component';

import { NavbarComponent } from '../navbar/navbar.component';
import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';
import { EditBoardModalComponent } from '../edit-board-modal/edit-board-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { BoardTabsComponent } from '../board-tabs/board-tabs.component';

import { RouterLink } from '@angular/router';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [
    HeaderJustifyBetweenComponent,
    PageContainerComponent,
    ColumnsComponent,
    NavbarComponent,
    AddColumnDialogComponent,
    EditBoardModalComponent,
    RouterLink,
    NgClass,
    BoardTabsComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  boardId = input.required<string>();

  appService = inject(AppService);

  constructor(private _matDialog: MatDialog) { }

  selectedTab = 'Kanban';

  get board() {
    return this.appService.selectedProjectBoard();
  }

  changeSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  openAddColumnModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      panelClass: 'dialogContainer',
      width: '600px',
      height: 'fit-content',
    });
  }

  openEditBoardModal() {
    this._matDialog.open(EditBoardModalComponent, {
      data: this.board,
      panelClass: 'dialogContainer',
    });
  }

  ngOnInit() {
    this.appService.setSelectedId(this.boardId());

  }
}
