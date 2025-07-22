import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-board',
    component: CreateBoardComponent,
  },
  {
    path: 'boards/:boardId',
    component: BoardComponent,
  },
];
