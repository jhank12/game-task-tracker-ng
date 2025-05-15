import { Injectable, signal } from '@angular/core';

import { v4 as uuid } from 'uuid';

// interfaces

import { ProjectBoard } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  projectBoards = signal<ProjectBoard[]>([
    {
      id: uuid(),
      name: 'board1',
      columnsArr: [
        { id: uuid(), colName: 'Art', PLACEHOLDERCOUNT: 5, tasks: [] },
        { id: uuid(), colName: 'Programming', PLACEHOLDERCOUNT: 3, tasks: [] },
      ],
    },
    {
      id: uuid(),
      name: 'board2',
      columnsArr: [
        { id: uuid(), colName: 'UI', PLACEHOLDERCOUNT: 5, tasks: [] },
        { id: uuid(), colName: 'Design', PLACEHOLDERCOUNT: 3, tasks: [] },
      ],
    },
  ]);

  constructor() {}
}
