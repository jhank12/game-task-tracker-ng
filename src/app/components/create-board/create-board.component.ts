import { Component } from '@angular/core';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';

@Component({
  selector: 'app-create-board',
  imports: [PageContainerComponent],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {}
