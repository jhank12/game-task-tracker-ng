import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppService } from './app.service';

import { ProjectBoard } from './models/models';
import { AddColumnDialogComponent } from './components/add-column-dialog/add-column-dialog.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { TaskComponent } from './components/task/task.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AddColumnDialogComponent,
    SidebarComponent,
    ColumnsComponent,
    TaskComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('createColumnDialog')
  createColumnDialog!: ElementRef<HTMLDialogElement>;

  appService = inject(AppService);

  get board() {
    return this.appService.selectedProjectBoard;
  }

  constructor(private _matDialog: MatDialog) {}

  openModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  closeModal() {
    this.createColumnDialog.nativeElement.close();
    this._matDialog.closeAll();
  }
}
