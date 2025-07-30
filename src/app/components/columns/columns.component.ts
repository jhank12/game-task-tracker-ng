import { Component, inject, signal, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AppService } from '../../app.service';

import { Column } from '../../models/models';

import { MatDialog, MatDialogActions } from '@angular/material/dialog';

// components
import { TaskComponent } from '../task/task.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { ColumnComponent } from '../reusable/column/column.component';

@Component({
  selector: 'app-columns',
  imports: [
    NgClass,
    TaskComponent,
    AddTaskModalComponent,
    ColumnComponent,
    MatDialogActions,
  ],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss',
})
export class ColumnsComponent {
  appService = inject(AppService);

  @Input({ required: true }) columns!: Column[];
}
