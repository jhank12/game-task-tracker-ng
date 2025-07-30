import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppService } from './app.service';

import { AddColumnDialogComponent } from './components/add-column-dialog/add-column-dialog.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditBoardModalComponent } from './components/edit-board-modal/edit-board-modal.component';

import { HomeComponent } from './components/home/home.component';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    ColumnsComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    HomeComponent,
    RouterOutlet,
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

  get boards() {
    return this.appService.projectBoards();
  }

  constructor(private _matDialog: MatDialog) {}

  openModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      panelClass: 'dialogContainer',
      width: '500px',
    });
  }

  closeModal() {
    this.createColumnDialog.nativeElement.close();
    this._matDialog.closeAll();
  }

  openEditBoardModal() {
    this._matDialog.open(EditBoardModalComponent, {
      data: this.board(),
      panelClass: 'dialogContainer',
    });
  }
}
