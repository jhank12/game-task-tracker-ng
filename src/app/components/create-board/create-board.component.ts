import { v4 as uuid } from 'uuid';

import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../app.service';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';

import { PageBackButtonComponent } from '../reusable/page-back-button/page-back-button.component';

import { ProjectBoard } from '../../models/models';

@Component({
  selector: 'app-create-board',
  imports: [
    FormsModule,
    PageContainerComponent,
    PageBackButtonComponent,
    RouterLink,
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  appService = inject(AppService);

  projectName: string = '';
  date: Date = new Date();

  onSubmit() {
    const newBoard: ProjectBoard = {
      id: uuid(),
      name: this.projectName,
      columnsArr: [],
      date: new Date(),
    };

    this.appService.addBoard(newBoard);
  }
}
