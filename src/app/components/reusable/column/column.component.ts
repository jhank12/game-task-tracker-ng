import { Component, Input, signal, inject, input } from '@angular/core';
import { Column } from '../../../models/models';

import { TaskComponent } from '../../task/task.component';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';

import { RouterLink } from '@angular/router';

import { AppService } from '../../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { EditColumnComponent } from '../../edit-column/edit-column.component';

// icon button components

import { OpenTaskIconButtonComponent } from '../open-task-icon-button/open-task-icon-button.component';
import { ColumnOptionsIconButtonComponent } from '../column-options-icon-button/column-options-icon-button.component';
import { ColumnExpandIconButtonComponent } from '../column-expand-icon-button/column-expand-icon-button.component';

@Component({
  selector: 'app-column',
  imports: [
    TaskComponent,
    RouterLink,
    OpenTaskIconButtonComponent,
    ColumnOptionsIconButtonComponent,
    ColumnExpandIconButtonComponent,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;

  constructor(private _matDialog: MatDialog) {}

  appService = inject(AppService);

  columnExpanded = signal<boolean>(true);

  columnOptionsOpen = signal<boolean>(false);

  deleteTask(colId: string, taskId: string) {
    this.appService.deleteTask(colId, taskId);
  }

  toggleColumnOptionsOpen() {
    this.columnOptionsOpen.update((optionsOpen) => !optionsOpen);
  }

  openEditColumn() {
    this.toggleColumnOptionsOpen();

    this._matDialog.open(EditColumnComponent, {
      data: this.column,
      panelClass: 'dialogContainer',
      width: '450px',
    });
  }

  toggleColumnExpanded() {
    this.columnExpanded.update((columnExpanded) => !columnExpanded);
  }

  deleteColumn(colId: string) {
    this.toggleColumnOptionsOpen();
    this.appService.deleteColumn(colId);
  }
}
