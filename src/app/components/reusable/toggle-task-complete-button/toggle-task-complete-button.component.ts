import { Component, Input, inject } from '@angular/core';

import { Task } from '../../../models/models';

import { AppService } from '../../../app.service';

@Component({
  selector: 'app-toggle-task-complete-button',
  imports: [],
  templateUrl: './toggle-task-complete-button.component.html',
  styleUrl: './toggle-task-complete-button.component.scss',
})
export class ToggleTaskCompleteButtonComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) colId!: string;
  @Input({ required: true }) taskIdx!: number;

  appService = inject(AppService);

  taskToggleComplete(e: MouseEvent) {
    e.stopPropagation();

    const updatedTask: Task = {
      ...this.task,
      isComplete: !this.task.isComplete,
    };

    this.appService.editTask(updatedTask, this.colId, this.taskIdx);
  }
}
