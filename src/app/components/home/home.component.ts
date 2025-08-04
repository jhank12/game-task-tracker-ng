import { Component, input, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';

import { AppService } from '../../app.service';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';
import { PageContainerComponent } from '../reusable/page-container/page-container.component';
import { Column, Task } from '../../models/models';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    DatePipe,
    HeaderJustifyBetweenComponent,
    PageContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  appService = inject(AppService);

  get boards() {
    return this.appService.projectBoards();
  }

  tasksCount(columnsArr: Column[]): number {
    let sum = 0;

    columnsArr.forEach((col) => {
      if (col.tasks == null) return;

      sum += col.tasks.length;
    });

    return sum;
  }
}
