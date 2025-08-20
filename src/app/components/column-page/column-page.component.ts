import { Component, input, inject } from '@angular/core';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-column-page',
  imports: [PageContainerComponent],
  templateUrl: './column-page.component.html',
  styleUrl: './column-page.component.scss',
})
export class ColumnPageComponent {
  boardId = input.required<string>();
  columnId = input.required<string>();

  appService = inject(AppService);

  get column() {
    return this.appService
      .selectedProjectBoard()
      .columnsArr?.filter((col) => col.id == this.columnId())[0];
  }

  get tasks() {
    return this.column?.tasks;
  }

  ngOnInit() {
    this.appService.setSelectedId(this.boardId());
  }
}
