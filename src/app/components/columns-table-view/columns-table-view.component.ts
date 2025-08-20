import { Component, Input, signal, inject } from '@angular/core';

import { Column } from '../../models/models';

import { ColumnTableComponent } from '../reusable/column-table/column-table.component';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-columns-table-view',
  imports: [ColumnTableComponent],
  templateUrl: './columns-table-view.component.html',
  styleUrl: './columns-table-view.component.scss',
})
export class ColumnsTableViewComponent {
  @Input({ required: true }) columns!: Column[];

  appService = inject(AppService);

  deleteTask(colId: string, taskId: string) {
    this.appService.deleteTask(colId, taskId);
  }
}
