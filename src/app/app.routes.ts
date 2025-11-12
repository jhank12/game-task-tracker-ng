import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnPageComponent } from './components/column-page/column-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { boardGuard } from './board.guard';

import { inject } from '@angular/core';
import { AppService } from './app.service';

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
    'canActivate': [boardGuard]
    // 'canActivate': [() => inject(AppService).selectedProjectBoard()]
  },
  {
    path: 'boards/:boardId/column/:columnId',
    component: ColumnPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
