import { Component, Input, signal, inject } from '@angular/core';
import { Column } from '../../../models/models';

import { EditColumnComponent } from '../../edit-column/edit-column.component';

import { PriorityTagComponent } from '../priority-tag/priority-tag.component';
import { OpenTaskIconButtonComponent } from '../open-task-icon-button/open-task-icon-button.component';
import { ColumnOptionsIconButtonComponent } from '../column-options-icon-button/column-options-icon-button.component';
import { ColumnExpandIconButtonComponent } from '../column-expand-icon-button/column-expand-icon-button.component';

import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../app.service';

import { ToggleTaskCompleteButtonComponent } from '../toggle-task-complete-button/toggle-task-complete-button.component';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-column-table',
  imports: [
    OpenTaskIconButtonComponent,
    ColumnOptionsIconButtonComponent,
    ColumnExpandIconButtonComponent,
    PriorityTagComponent,
    ToggleTaskCompleteButtonComponent,
    NgClass,
  ],
  templateUrl: './column-table.component.html',
  styleUrl: './column-table.component.scss',
})
export class ColumnTableComponent {
  @Input({ required: true }) column!: Column;

  constructor(private _matDialog: MatDialog) {}

  appService = inject(AppService);

  columnExpanded = signal<boolean>(true);

  columnOptionsOpen = signal<boolean>(false);

  toggleColumnOptionsOpen() {
    this.columnOptionsOpen.update((optionsOpen) => !optionsOpen);
  }

  toggleColumnExpanded() {
    this.columnExpanded.update((columnExpanded) => !columnExpanded);
  }

  openEditColumn() {
    this.toggleColumnOptionsOpen();

    this._matDialog.open(EditColumnComponent, {
      data: this.column,
      panelClass: 'dialogContainer',
      width: '450px',
    });
  }

  deleteColumn(colId: string) {
    this.toggleColumnOptionsOpen();
    this.appService.deleteColumn(colId);
  }
}
